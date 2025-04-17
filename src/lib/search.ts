'use server'

import fuzzysort from 'fuzzysort';
import {allPosts, Post} from "content-collections";

export type SearchResult = {
    title: {
        text: string;
        index: [number, number][];
    };
    content: {
        text: string;
        index: [number, number][];
    }[];
    slug: string;
};

const documents = allPosts.map((post: Post) => (
    {
        title: post.title,
        content: post.plainText,
        slug: `/article/${post.slug}`,
    }
))

function transformIndexes(indexes: readonly number[]): [number, number][] {
    if (indexes.length === 0) return [];

    const result: [number, number][] = [];
    let start = indexes[0];
    let count = 1;

    for (let i = 1; i < indexes.length; i++) {
        if (indexes[i] === indexes[i - 1] + 1) {
            count++;
        } else {
            result.push([start, count]);
            start = indexes[i];
            count = 1;
        }
    }

    result.push([start, count]);
    return result;
}

function extractSnippets(content: string, indexes: [number, number][], topCount: number = 3, maxSnippetLength: number = 40): ({
    text: string;
    index: [number, number][]
})[] {
    if (indexes.length === 0) return [];
    const topIndexes = indexes.length > topCount ? indexes.slice(0, topCount) : indexes;

    return topIndexes.map(([index, length]) => {
        const minPrefixLength = 4;
        // 匹配到的文本太长了，不用搜边界了直接返回
        if (length + minPrefixLength >= maxSnippetLength) {
            const startIndex = index < minPrefixLength ? 0 : index - minPrefixLength;
            const endIndex = startIndex + maxSnippetLength > content.length ? content.length : startIndex + maxSnippetLength;
            return {
                text: content.substring(startIndex, endIndex),
                index: [[index - startIndex, startIndex + maxSnippetLength > content.length ? content.length - index : length]]
            }
        }

        const boundaryRegex = /\s|[,.;:!?，。；：！？、]/;
        // 10字符的起始前后空间
        let startIndex = index < 10 ? 0 : index - 10;
        let endIndex = content.length - (index + length) < 10 ? content.length : index + length + 10;

        // 调整到单词边界（开始位置）
        if (startIndex > 0) {
            // 前移到空格或标点后
            while (startIndex > 0 && !boundaryRegex.test(content[startIndex - 1])) {
                startIndex--;
            }
        }

        // 调整到单词边界（结束位置）
        if (endIndex < content.length) {
            // 后移到空格或标点前
            while (endIndex < content.length && !boundaryRegex.test(content[endIndex])) {
                endIndex++;
            }
        }

        // 如果调整边界之后太长了，就截断
        if (endIndex - startIndex > maxSnippetLength) {
            // 先缩前面再缩后面，确保前面有一定的前缀文段
            while (endIndex - startIndex > maxSnippetLength && index - startIndex > minPrefixLength) {
                startIndex++;
            }
            while (endIndex - startIndex > maxSnippetLength) {
                endIndex--;
            }
        }

        return {
            text: content.substring(startIndex, endIndex),
            index: [[index - startIndex, endIndex <= index + length ? endIndex - index : length]]
        };
    })
}

export async function searchArticles(query: string): Promise<SearchResult[]> {
    const result = fuzzysort.go(query, documents, {
        keys: ['title', 'content'],
        all: false,
        limit: 30,
    });

    return result.map(e => {
        const [titleResult, contentResult] = e;
        extractSnippets(contentResult.target, transformIndexes(contentResult.indexes));
        return {
            title: {text: e.obj.title, index: transformIndexes(titleResult.indexes)},
            content: extractSnippets(contentResult.target, transformIndexes(contentResult.indexes)),
            slug: e.obj.slug,
        };
    });
}

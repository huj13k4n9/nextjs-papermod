'use server'

import fuzzysort from 'fuzzysort';
import {allPosts, Post} from "content-collections";

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

export async function searchArticles(query: string) {
    const result = fuzzysort.go(query, documents, {
        keys: ['title', 'content'],
        all: false,
    });

    return result.map(e => {
        const [titleResult, contentResult] = e;
        console.log(titleResult.indexes);
        return {
            title: {content: e.obj.title, indexes: transformIndexes(titleResult.indexes)},
            slug: e.obj.slug,
        };
    });
}

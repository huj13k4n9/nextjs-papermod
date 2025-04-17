import {allPosts, Post} from "content-collections";
import {MDXRemote} from 'next-mdx-remote/rsc'
import {MDXComponents} from "@/components/mdx-components";
import {notFound} from 'next/navigation'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from 'rehype-slug';
import React from "react";
import 'katex/dist/katex.min.css';
// @ts-ignore
import type {SerializeOptions} from "next-mdx-remote/dist/types";
import Breadcrumb from "@/components/ui/breadcrumb";
import ArticleAttributes from "@/components/ui/article-attr";

const options: SerializeOptions = {
    mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
            rehypeKatex,
            [rehypePrettyCode, {
                bypassInlineCode: true,
                defaultLang: "plaintext",
                keepBackground: false,
            }],
            rehypeSlug
        ],
    }
}

async function getBlogsFromParams(slugs: string[]) {
    const slug = slugs?.join("/") || ""
    const blog = allPosts.find((blog: Post) => blog.slug === slug);

    if (!blog) {
        return null
    }

    return blog
}

export default async function BlogArticlePage({params}: {
    params: Promise<{ slug: string[] }>
}) {
    const {slug} = await params
    const blog = await getBlogsFromParams(slug)

    if (!blog) {
        notFound();
    }

    return (
        <div className={`flex flex-col`}>
            <div className={`flex flex-col w-full mt-5 mb-8`}>
                <Breadcrumb
                    items={[{index: 1, text: `Home`, href: `/`}, {index: 2, text: `Article`, href: `/articles`}]}/>
                <h1 className={`text-[42px] font-bold mb-0`}>{blog.title}</h1>
                <ArticleAttributes date={blog.date} wordCount={blog.wordCount} className="text-[15px]"/>
            </div>
            <div className={`article-content`}>
                <MDXRemote source={blog.content} components={MDXComponents} options={options}/>
            </div>
        </div>
    )
}
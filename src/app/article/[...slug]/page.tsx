import {allPosts} from "content-collections";
import {MDXRemote} from 'next-mdx-remote/rsc'
import {MDXComponents} from "@/components/mdx-components";
import Delimiter from "@/components/ui/delimiter";
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from 'rehype-slug';
import React from "react";
import 'katex/dist/katex.min.css';
// @ts-ignore
import type {SerializeOptions} from "next-mdx-remote/dist/types";

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
    const blog = allPosts.find((blog: any) => blog._meta.path === slug)

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
        return <div>404</div>
    }

    return (
        <div className={`flex flex-col`}>
            <div className={`flex flex-col w-full mt-8 mb-12`}>
                <h1 className={`text-4xl font-bold mb-1.5`}>{blog.title}</h1>
                <h2 className="text-sm">
                    {blog.date.getFullYear()} 年 {blog.date.getMonth() + 1} 月 {blog.date.getDate()} 日
                    <Delimiter/>
                    {blog.wordCount} 字
                </h2>
            </div>
            <div className={`article-content`}>
                <MDXRemote source={blog.content} components={MDXComponents} options={options}/>
            </div>
        </div>
    )
}
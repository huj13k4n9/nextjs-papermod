import {allPosts, Post} from "content-collections";
import MDXRenderer from "@/components/mdx";
import {notFound} from 'next/navigation'
import React from "react";
import 'katex/dist/katex.min.css';
import Breadcrumb from "@/components/ui/breadcrumb";
import ArticleAttributes from "@/components/ui/article-attr";
import {cn} from "@/lib/utils";
import {config} from "@/config";
import TOC from "@/components/ui/toc";

async function getBlogsFromParams(slugs: string[]) {
    const slug = slugs?.join("/") || ""
    const blog = allPosts.find((blog: Post) => blog.slug === slug);
    return blog ? blog : null;
}

export default async function BlogArticlePage({params}: {
    params: Promise<{ slug: string[] }>
}) {
    const {slug} = await params
    const blog = await getBlogsFromParams(slug)
    if (!blog) { notFound(); }

    const {headings, content} = await MDXRenderer({mdxContent: blog.content})
    return (
        <main className={cn(
            "max-w-4xl mx-auto py-6 min-h-[calc(95vh-6rem-4rem)] xl:max-w-6xl xl:flex xl:flex-row xl:justify-between xl:gap-18 px-8",
            config.site.nav.float && "md:mt-20 mt-28",
        )}>
            <div className={`flex flex-col w-full xl:w-4/5`}>
                <div className={`flex flex-col mt-5 mb-8`}>
                    <Breadcrumb
                        items={[{index: 1, text: `Home`, href: `/`}, {index: 2, text: `Article`, href: `/articles`}]}/>
                    <h1 className={`text-[42px] font-bold mb-0`}>{blog.title}</h1>
                    <ArticleAttributes date={blog.date} wordCount={blog.wordCount} className="text-[15px]"/>
                </div>

                <div className={`article-content`}>
                    {content}
                </div>
            </div>
            <TOC data={headings} className="w-full xl:w-1/5" />
        </main>
    )
}
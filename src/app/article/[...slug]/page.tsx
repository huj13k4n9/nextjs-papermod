import {allPosts, Post} from "content-collections";
import MDXRenderer from "@/components/mdx";
import {notFound} from 'next/navigation'
import React from "react";
import 'katex/dist/katex.min.css';
import Breadcrumb from "@/components/ui/breadcrumb";
import ArticleAttributes from "@/components/ui/article-attr";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

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
            [rehypeSlug, {
                prefix: "heading-",
            }],
            [rehypeAutolinkHeadings, {
                behavior: "append",
                headingProperties: {
                    className: ["group"],
                },
                properties: {
                    className: ["ms-2 opacity-0 group-hover:opacity-100"],
                    ariaHidden: true,
                },
                content: {
                    type: "text",
                    value: "#",
                }
            }],
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

    const {headings, content} = await MDXRenderer({mdxContent: blog.content})

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
            <div className={`flex flex-col max-w-4xl pr-10`}>
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
    )
}
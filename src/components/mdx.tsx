// @ts-nocheck
import {cn, isInternalLink} from "@/lib/utils";
import React from "react";
import CodeBlock from "@/components/ui/codeblock";
import Link from "next/link";
import {compileMDX} from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import {visit} from "unist-util-visit";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export interface HeadingNode {
    level: number;
    text: string;
    id: string;
}

function extractTextFromNode(node) {
    if (!node) return '';
    if (node.type === 'text') return node.value || '';
    if (!node.children || !Array.isArray(node.children)) {
        return '';
    }

    return node.children
        .map(child => extractTextFromNode(child))
        .join('');
}

function createHeadingsExtractor(headings) {
    return () => {
        return (tree) => {
            visit(tree, 'element', (node) => {
                if (node.tagName.match(/^h[1-6]$/)) {
                    headings.push({
                        level: parseInt(node.tagName.replace('h', "")),
                        text: extractTextFromNode(node),
                        id: node.properties?.id as string,
                    });
                }
            });
        };
    };
}

const MdxComponents = {
    h1: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className={cn("mt-8 mb-5 text-[32px] leading-snug tracking-tight font-semibold scroll-mt-32 md:scroll-mt-20", className)} {...props} />
    ),
    h2: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className={cn("mt-7.5 mb-5 text-[28px] leading-snug tracking-tight font-semibold scroll-mt-32 md:scroll-mt-20", className)} {...props} />
    ),
    h3: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className={cn("mt-7 mb-4.5 text-2xl leading-snug tracking-tight font-semibold scroll-mt-32 md:scroll-mt-20", className)} {...props} />
    ),
    h4: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className={cn("mt-6 mb-3 text-xl leading-normal tracking-tight font-semibold scroll-mt-32 md:scroll-mt-20", className)} {...props} />
    ),
    h5: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className={cn("mt-5.5 mb-2.5 text-lg leading-normal tracking-tight font-semibold scroll-mt-32 md:scroll-mt-20", className)} {...props} />
    ),
    h6: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className={cn("mt-5 mb-2 text-base leading-normal tracking-tight font-semibold scroll-mt-32 md:scroll-mt-20", className)} {...props} />
    ),
    p: ({className, ...props}: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className={cn("mb-4 text-base leading-normal", className)} {...props} />
    ),
    a: ({className, ...props}: React.HTMLAttributes<HTMLAnchorElement>) => {
        const href = props.href;
        return (
            <Link
                href={href}
                className={cn("font-normal transition-all underline underline-offset-3", className)}
                target={isInternalLink(href) ? "_self" : "_blank"} {...props}
            />
        )
    },
    Link: ({className, href, ...props}: React.ComponentProps<typeof Link>) => {
        return (
            <Link
                href={href}
                className={cn("font-normal transition-all underline underline-offset-3", className)}
                target={isInternalLink(href.toString()) ? "_self" : "_blank"} {...props}
            />
        )
    },
    img: ({className, src, alt, ...props}: React.AllHTMLAttributes<HTMLImageElement>) => {
        return (
            <img
                className={cn("rounded-md border-2 my-4 mx-auto max-w-[70%] ", className)}
                src={src} alt={alt} {...props}
            />
        )
    },
    hr: ({className, ...props}: React.HTMLAttributes<HTMLHRElement>) => (
        <hr className={cn("my-5", className)} {...props}/>
    ),
    strong: ({className, ...props}: React.HTMLAttributes<HTMLElement>) => (
        <strong className={cn("font-bold", className)} {...props} />
    ),
    em: ({className, ...props}: React.HTMLAttributes<HTMLElement>) => (
        <em className={cn("italic", className)} {...props} />
    ),
    blockquote: ({className, ...props}: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote className={cn("my-3 px-4 pt-[5px] border-s-3", className)} {...props} />
    ),
    table: ({className, ...props}: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="max-w-4xl mt-2 mb-4 overflow-x-auto">
            <table
                className={cn(
                    "mx-auto mb-4 border-collapse border-spacing-0 text-left w-[80%]",
                    "text-[1.1rem]",
                    className
                )}
                {...props}
            />
        </div>
    ),
    tr: ({className, ...props}: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
            className={cn("m-0", className)}
            {...props}
        />
    ),
    th: ({className, ...props}: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className={cn(
                "border-y border-solid px-4 py-2 text-left font-semibold",
                className
            )}
            {...props}
        />
    ),
    td: ({className, ...props}: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={cn(
                "border-b border-solid px-4 py-2 text-left leading-normal",
                className
            )}
            {...props}
        />
    ),
    ul: ({className, ...props}: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={cn("ps-6 mb-4 list-disc", className)} {...props} />
    ),
    ol: ({className, ...props}: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={cn("ps-6 mb-4 list-decimal list-outside", className)} {...props} />
    ),
    li: ({className, ...props}: React.HTMLAttributes<HTMLLIElement>) => (
        <li className={cn("my-1.5", className)} {...props} />
    ),
    pre: ({className, ...props}: React.HTMLAttributes<HTMLPreElement>) => (
        <CodeBlock className={className} {...props} />),
    code: ({className, ...props}: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={cn(
                "bg-white/20 text-sm",
                className
            )}
            {...props}
        />
    ),
    small: ({className, ...props}: React.HTMLAttributes<HTMLElement>) => (
        <small
            className={cn("text-[70%]", className)}
            {...props}
        />
    ),
    span: ({className, ...props}: React.HTMLAttributes<HTMLSpanElement>) => (
        <span className={className} {...props}/>)
}

export default async function MDXRenderer({mdxContent}: {mdxContent: string}): Promise<{
    headings: HeadingNode[];
    content: React.ReactElement;
}> {
    const headings: HeadingNode[] = []
    const { content } = await compileMDX({
        source: mdxContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [
                    remarkGfm,
                    [remarkMath, { singleDollarTextMath: true }]
                ],
                rehypePlugins: [
                    rehypeKatex,
                    [rehypePrettyCode, {
                        bypassInlineCode: true,
                        defaultLang: "plaintext",
                        keepBackground: false,
                    }],
                    rehypeSlug,
                    // Get headings for TOC
                    createHeadingsExtractor(headings),
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
        },
        components: MdxComponents,
    });

    return {
        headings,
        content
    }
}
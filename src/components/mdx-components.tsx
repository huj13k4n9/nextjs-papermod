import {cn} from "@/lib/utils";
import React from "react";
import CodeBlock from "@/components/codeblock";

export const MDXComponents = {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className={cn( "mt-8 mb-5 text-[34px] leading-snug tracking-tight font-semibold", className )} {...props} />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className={cn( "mt-7.5 mb-5 text-3xl leading-snug tracking-tight font-semibold", className )} {...props} />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className={cn( "mt-7 mb-4.5 text-2xl leading-snug tracking-tight font-semibold", className )} {...props} />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className={cn( "mt-6 mb-3 text-xl leading-normal tracking-tight font-semibold", className )} {...props} />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h5 className={cn( "mt-5.5 mb-2.5 text-lg leading-normal tracking-tight font-semibold", className )} {...props} />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h6 className={cn( "mt-5 mb-2 text-base leading-normal tracking-tight font-semibold", className )} {...props} />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <p className={cn("mb-4", className)} {...props} />
    ),
    hr: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <hr className={cn( "my-5", className )} {...props}/>
    ),
    strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <strong className={cn("font-bold", className)} {...props} />
    ),
    em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <em className={cn("italic", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <blockquote className={cn("my-3 px-4 pt-[5px] border-s-3", className)} {...props} />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <ul className={cn("ps-6 mb-4 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <ol className={cn("ps-6 mb-4 list-decimal list-outside", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <li className={cn("my-1.5", className)} {...props} />
    ),
    pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (<CodeBlock className={className} {...props} />),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={cn(
                "bg-white/20 text-base",
                className
            )}
            {...props}
        />
    ),
}
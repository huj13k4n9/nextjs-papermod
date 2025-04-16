import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {markdownToTxt} from "markdown-to-txt";
import count from 'word-count'
import {config} from "@/config";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ArticleAttributes {
    wordCount: number;
    summary: string;
}

export function getArticleAttrs(content: string): ArticleAttributes {
    const plainText = markdownToTxt(content).replaceAll(/\n+/gm, "\n");
    const summary = markdownToTxt(content
        .replaceAll(/^#{1,6} +.*\n*/gm, ""))
        .replaceAll(/\n+/gm, "\n")
        .substring(0, 300);

    return {
        wordCount: count(plainText),
        summary: summary
    };
}

export function isInternalLink(href: string): boolean {
    if (!href) return true;
    if (href.startsWith('#')) return true;
    if (href.startsWith('/') && !href.startsWith('//')) return true;
    if (!href.includes('://') && !href.startsWith('//')) return true;
    if (href.includes(new URL(config.site.baseUrl).hostname)) return true;
    return false;
}

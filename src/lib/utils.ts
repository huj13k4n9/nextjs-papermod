import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {markdownToTxt} from "markdown-to-txt";
import count from 'word-count'

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
      .substring(0, 500);

  return {
    wordCount: count(plainText),
    summary: summary
  };
}
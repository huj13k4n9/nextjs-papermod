import Delimiter from "@/components/ui/delimiter";
import React from "react";

interface ArticleAttrs {
    date: Date;
    wordCount: number;
    className: string;
}

export default function ArticleAttributes({date, wordCount, className}: ArticleAttrs) {
    return (
        <span className={className}>
            {date.getFullYear()} 年 {date.getMonth() + 1} 月 {date.getDate()} 日
            <Delimiter/>
            {wordCount} 字
        </span>
    )
}
import Delimiter from "@/components/ui/delimiter";
import React from "react";

interface ArticleAttrs {
    date: Date;
    wordCount: number;
    className: string;
    showReadingTime: boolean;
}

// https://github.com/ngryman/reading-time/blob/master/src/reading-time.ts
function getReadingTime(wordCount: number){
    const wordsPerMinute = 200;
    const minutes = wordCount / wordsPerMinute;
    const time = Math.round(minutes * 60000);

    const displayed = {
        days: Math.floor(time / 86400000),
        hours: Math.floor((time % 86400000) / 3600000),
        minutes: Math.floor(((time % 86400000) % 3600000) / 60000),
    }

    return (displayed.days !== 0 ? `${displayed.days} 天 ` : "00 天 ") +
           (displayed.hours !== 0 ? `${displayed.hours} 时 ` : "00 时 ") +
           (displayed.minutes !== 0 ? `${displayed.minutes} 分` : "00 分")
}

export default function ArticleAttributes({date, wordCount, className, showReadingTime}: ArticleAttrs) {
    return (
        <span className={className}>
            {date.getFullYear()} 年 {date.getMonth() + 1} 月 {date.getDate()} 日
            <Delimiter/>
            {wordCount} 字
            {showReadingTime && (<><Delimiter/> {getReadingTime(wordCount)}</>)}
        </span>
    )
}
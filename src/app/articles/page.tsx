import React from "react";
import {allPosts, Post} from "content-collections";
import Link from "next/link";
import {LuRss} from "react-icons/lu";
import ArticleAttributes from "@/components/ui/article-attr";

type YearMonthPosts = {
    year: number;
    months: {
        month: number;
        posts: Post[];
    }[];
};

function monthToText(month: number): string {
    // @ts-ignore
    return {
        1: "Jan.",  2: "Feb.",  3: "Mar.",
        4: "Apr.",  5: "May.",  6: "Jun.",
        7: "Jul.",  8: "Aug.",  9: "Sept.",
        10: "Oct.", 11: "Nov.", 12: "Dec.",
    }[month];
}

export default function Articles() {
    const organizedPosts: YearMonthPosts[] = [];

    const dateMap = new Map<number, Map<number, Post[]>>();
    for (const post of allPosts) {
        const year = post.date.getFullYear();
        const month = post.date.getMonth() + 1;

        if (!dateMap.has(year)) {
            dateMap.set(year, new Map<number, Post[]>());
        }

        const monthMap = dateMap.get(year)!;

        if (!monthMap.has(month)) {
            monthMap.set(month, []);
        }

        monthMap.get(month)!.push(post);
    }

    for (const [year, months] of dateMap.entries()) {
        const yearData: YearMonthPosts = {
            year,
            months: []
        };

        for (const [month, posts] of months.entries()) {
            const sortedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
            yearData.months.push({
                month,
                posts: sortedPosts,
            });
        }

        yearData.months.sort((a, b) => b.month - a.month);
        organizedPosts.push(yearData);
    }

    organizedPosts.sort((a, b) => b.year - a.year);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col w-full mt-5 mb-8">
                <div className="flex flex-row items-baseline justify-start space-x-2">
                    <h1 className="text-[42px] font-bold pr-1">文章列表</h1>
                    <Link href={`/rss.xml`} className={`[&>svg]:h-7 [&>svg]:w-7`}><LuRss/></Link>
                </div>
                <h2 className="text-[15px]">
                    一共写了 {allPosts.length} 篇文章。
                </h2>
            </div>

            <ol className={`w-full`}>
                {organizedPosts.map((yearData) => (
                    <li className="mb-8 mt-7 relative ps-6 ms-2 md:ms-4" key={yearData.year}>
                        <div className="absolute top-[1em] -left-[3px] rounded-full w-[13px] h-[6px] bg-white"></div>
                        <div className="absolute top-[1em] bottom-0 left-0 border-s-2"
                             style={{ borderImageSource: 'linear-gradient(to bottom, #ffffff55, #ffffff33, transparent)', borderImageSlice: '1' }} />
                        <h2 className="text-3xl font-semibold mb-3">
                            {yearData.year}
                        </h2>
                        {yearData.months.map((monthData) => (
                            <div key={`${yearData.year}${monthData.month}`} className="flex sm:flex-row flex-col items-start justify-start py-4 ps-[2px]">
                                <h2 className="text-2xl font-semibold mr-6 mt-2 mb-5 min-w-28">
                                    {monthToText(monthData.month)} {monthData.posts.length}
                                </h2>

                                <div className="space-y-6">
                                    {monthData.posts.map((post, postIndex) => (
                                        <Link
                                            href={`/article/${post.slug}`}
                                            key={`${yearData.year}${monthData.month}${postIndex}`}
                                            className="flex flex-col items-start justify-center space-y-0.5"
                                        >
                                            <span className={`text-xl`}>{post.title}</span>
                                            <ArticleAttributes date={post.date} wordCount={post.wordCount} className="text-[15px]" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </li>
                ))}
            </ol>
        </div>
    );
}

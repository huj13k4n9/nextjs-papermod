import { allPosts } from "content-collections";
import React from "react";
import { markdownToTxt } from "markdown-to-txt";
import Delimiter from "@/components/delimiter";

interface ArticleProps {
    title: string;
    date: Date;
    summary: string;
    uri: string;
}

function ArticlePreview({title, date, summary, uri}: ArticleProps): React.ReactElement {
    return (
        <a href={uri} className="flex flex-col space-y-3 mt-7 p-6 border-1 rounded-2xl">
            <div className="flex items-center justify-between">
                <h2 className={`font-bold text-2xl`}>{title}</h2>
                <h2 className={`text-sm`}>{date.getFullYear()}年{date.getMonth()+1}月{date.getDate()}日<Delimiter/>xxx字</h2>
            </div>
            <p className={`line-clamp-2 text-base`}>{summary}</p>
        </a>
    )
}

export default async function Home({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return (
        <>
            <h1>Home Page (Page: {(await searchParams).page})</h1>
            <div>
            {allPosts.map((post) => (
                <ArticlePreview
                    key={post._meta.path}
                    title={post.title}
                    date={post.date}
                    summary={
                        markdownToTxt(post.content
                            .replaceAll(/^#{1,6} +.*\n*/gm, ""))
                            .replaceAll(/\n+/gm, "\n")
                            .substring(0, 500)
                    }
                    uri={"/article/"+post._meta.path}
                />
            ))}
            </div>
        </>
    );
}

import {allPosts} from "content-collections";
import React from "react";
import Delimiter from "@/components/delimiter";
import {cn, getArticleAttrs} from "@/lib/utils";
import {socialIcons} from "@/components/icons";
import {config} from "@/config";
import {PaginationEllipsis, PaginationNumber} from "@/components/ui/pagination";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {redirect} from "next/navigation";

interface ArticleProps {
    title: string;
    date: Date;
    summary: string;
    uri: string;
    wordCount: number;
}

function IndexBanner(): React.ReactElement {
    const indexBannerConfig = config.site.indexPage;
    return (
        <>
            <h1 className={`text-[40px] font-bold`}>{indexBannerConfig.title}</h1>
            <h3 className={`text-lg mt-2 mb-4`}>{indexBannerConfig.subtitle}</h3>
            <div className={`flex flex-row flex-wrap gap-3 py-3`}>
                {indexBannerConfig.socialLinks.map((item, index) => {
                    const IconComponent = socialIcons[item.type as keyof typeof socialIcons];
                    return (
                        <div key={index} className="relative group">
                            <a href={item.href === "" ? "#" : item.href} target="_blank"
                               className={`[&>*]:w-7 [&>*]:h-7 block`}>
                                <IconComponent/>
                            </a>
                            <div
                                className="z-10 absolute left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                <div
                                    className="bg-gray-800 text-white text-sm rounded py-1 px-2 mt-2 whitespace-nowrap">
                                    {item.tooltip}
                                </div>
                                <div
                                    className="w-2 h-2 bg-gray-800 transform rotate-45 absolute top-1 left-1/2 -translate-x-1/2"></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

function ArticlePreview(ap: ArticleProps): React.ReactElement {
    return (
        <article>
            <a href={ap.uri} className="flex flex-col space-y-3 p-6 border-1 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-bold text-2xl">{ap.title}</h2>
                    <h2 className="hidden sm:block text-[15px]">
                        {ap.date.getFullYear()} 年 {ap.date.getMonth() + 1} 月 {ap.date.getDate()} 日
                        <Delimiter/>
                        {ap.wordCount} 字
                    </h2>
                </div>
                <p className="line-clamp-2 text-base leading-relaxed sm:mb-0">{ap.summary}</p>
                <h2 className="sm:hidden text-[15px]">
                    {ap.date.getFullYear()} 年 {ap.date.getMonth() + 1} 月 {ap.date.getDate()} 日
                    <Delimiter/>
                    {ap.wordCount} 字
                </h2>
            </a>
        </article>
    )
}

export default async function Home({searchParams}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const articlesAttr: ArticleProps[] = allPosts.map((post) => {
        const {wordCount, summary} = getArticleAttrs(post.content);
        return {
            title: post.title,
            date: post.date,
            uri: "/article/" + post._meta.path,
            summary,
            wordCount,
        }
    })
    articlesAttr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const pageSize = config.site.indexPage.pagination;
    const pageCount = Math.ceil(articlesAttr.length / pageSize);
    const params = await searchParams;
    let currentPage = params.page ? parseInt(params.page as string) : 1;

    if (isNaN(currentPage) || currentPage < 1 || currentPage > pageCount) {
        redirect('/');
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageArticles = articlesAttr.slice(startIndex, endIndex);

    return (
        <>
            <div className={`flex flex-col justify-center min-h-96 px-2`}>
                <IndexBanner/>
            </div>
            <div className="space-y-6">
                {currentPageArticles.map((article) => (
                    <ArticlePreview
                        key={article.uri}
                        title={article.title}
                        date={article.date}
                        summary={article.summary}
                        uri={article.uri}
                        wordCount={article.wordCount}
                    />
                ))}
            </div>
            {pageCount > 1 &&
                <div className={`flex flex-row justify-between pt-5`}>
                    <a href={`/?page=${currentPage - 1}`}
                       className={cn(`inline-flex items-center justify-center rounded-md text-sm`, currentPage === 1 ? "invisible" : "")}
                       title="Go to previous page"
                    >
                        <LuChevronLeft/>
                        <span>Previous</span>
                    </a>
                    <div className={`inline-flex flex-row items-center justify-center`}>
                        {currentPage - 2 > 0 && <PaginationEllipsis/>}
                        {currentPage - 1 > 0 && <PaginationNumber page={currentPage - 1}/>}
                        <PaginationNumber page={currentPage}/>
                        {currentPage + 1 <= pageCount && <PaginationNumber page={currentPage + 1}/>}
                        {currentPage + 2 <= pageCount && <PaginationEllipsis/>}
                    </div>
                    <a href={`/?page=${currentPage + 1}`}
                       className={cn(`inline-flex items-center justify-center rounded-md text-sm`, currentPage === pageCount ? "invisible" : "")}
                       title="Go to next page"
                    >
                        <span>Next</span>
                        <LuChevronRight/>
                    </a>
                </div>
            }
        </>
    );
}

import {allPosts} from "content-collections";
import React from "react";
import {cn} from "@/lib/utils";
import {socialIcons} from "@/components/social-icons";
import {config} from "@/config";
import {PaginationNumber, PaginationPlaceholder} from "@/components/ui/pagination";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";
import {redirect} from "next/navigation";
import Link from "next/link";
import ArticleAttributes from "@/components/ui/article-attr";

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
            <h1 className={`text-[42px] font-bold`}>{indexBannerConfig.title}</h1>
            <h3 className={`text-lg mt-2 mb-4`}>{indexBannerConfig.subtitle}</h3>
            <div className={`flex flex-row flex-wrap gap-3 py-3`}>
                {indexBannerConfig.socialLinks.map((item, index) => {
                    const IconComponent = socialIcons[item.type as keyof typeof socialIcons];
                    return (
                        <div key={index} className="relative group">
                            <Link href={item.href === "" ? "#" : item.href} target="_blank"
                                  className={`[&>svg]:w-7 [&>svg]:h-7 block`}>
                                <IconComponent/>
                            </Link>
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
            <Link href={ap.uri} className="flex flex-col space-y-3 p-6 border-1 rounded-2xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h2 className="font-bold text-2xl line-clamp-1">{ap.title}</h2>
                    <ArticleAttributes
                        date={ap.date} wordCount={ap.wordCount}
                        className="hidden md:block text-[15px] min-w-[19rem] text-right"
                    />
                </div>
                <p className="line-clamp-2 text-base leading-relaxed md:mb-0">{ap.summary}</p>
                <ArticleAttributes date={ap.date} wordCount={ap.wordCount}
                                   className="md:hidden text-[15px]"/>
            </Link>
        </article>
    )
}

export default async function Home({searchParams}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const sortedPosts = allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

    const pageSize = config.site.indexPage.pagination;
    const pageCount = Math.ceil(sortedPosts.length / pageSize);
    const params = await searchParams;
    let currentPage = params.page ? parseInt(params.page as string) : 1;

    if (isNaN(currentPage) || currentPage < 1 || currentPage > pageCount) {
        redirect('/');
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageArticles = sortedPosts.slice(startIndex, endIndex);

    return (
        <main className={cn(
            "max-w-4xl mx-auto px-6 py-6 min-h-[calc(95vh-6rem-4rem)]",
            config.site.nav.float && "md:mt-20 mt-28",
        )}>
            <div className={`flex flex-col justify-center min-h-96 px-2`}>
                <IndexBanner/>
            </div>
            <div className="space-y-6">
                {currentPageArticles.map((article) => (
                    <ArticlePreview
                        key={article.slug}
                        title={article.title}
                        date={article.date}
                        summary={article.summary}
                        uri={`/article/${article.slug}`}
                        wordCount={article.wordCount}
                    />
                ))}
            </div>
            {pageCount > 1 &&
                <div className={`flex flex-row justify-between pt-5`}>
                    <Link href={`/?page=${currentPage - 1}`}
                          className={cn(`inline-flex items-center justify-center rounded-md text-sm`, currentPage === 1 ? "invisible" : "")}
                          title="Go to previous page"
                    >
                        <LuChevronLeft/>
                        <span>Previous</span>
                    </Link>
                    <div className={`inline-flex flex-row items-center justify-center`}>
                        {currentPage - 1 > 0 ? <PaginationNumber page={currentPage - 1}/> : <PaginationPlaceholder/>}
                        <PaginationNumber page={currentPage}/>
                        {currentPage + 1 <= pageCount ? <PaginationNumber page={currentPage + 1}/> :
                            <PaginationPlaceholder/>}
                    </div>
                    <Link href={`/?page=${currentPage + 1}`}
                          className={cn(`inline-flex items-center justify-center rounded-md text-sm`, currentPage === pageCount ? "invisible" : "")}
                          title="Go to next page"
                    >
                        <span>Next</span>
                        <LuChevronRight/>
                    </Link>
                </div>
            }
        </main>
    );
}

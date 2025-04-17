"use client"

import React, {useCallback, useEffect, useState} from "react";
import {LuSearch} from "react-icons/lu";
// @ts-ignore
import {searchArticles, SearchResult} from "@/lib/search";
import Link from "next/link";
import {AnimatePresence, motion} from "motion/react";

function highlightedText({text, index}: { text: string, index: [number, number][] }) {
    if (!index.length) return <>{text}</>;

    const parts: React.ReactElement[] = [];
    let lastEnd = 0;

    index.forEach(([start, length], i) => {
        if (start > lastEnd) {
            parts.push(<React.Fragment key={`normal-${i}`}>{text.substring(lastEnd, start)}</React.Fragment>);
        }
        parts.push(<b key={`highlight-${i}`}>{text.substring(start, start + length)}</b>);
        lastEnd = start + length;
    });

    if (lastEnd < text.length) {
        parts.push(<React.Fragment key={`normal-last`}>{text.substring(lastEnd)}</React.Fragment>);
    }
    return <>{parts}</>;
}

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

function SearchIndicator({count}: { count: number }) {
    return (
        <motion.div
            className={"flex flex-row items-center rounded-full py-1"}
            initial={{
                paddingInline: "0px",
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "var(--foreground)"
            }}
            animate={{
                paddingInline: count !== 0 ? "10px" : "0px",
                backgroundColor: count !== 0 ? "var(--foreground)" : "rgba(0, 0, 0, 0)",
                color: count !== 0 ? "#033639" : "var(--foreground)"
            }}
            transition={{
                ease: "easeInOut",
                duration: 0.3,
                color: {duration: 0.5, delay: 0.3}
            }}
        >
            <LuSearch className={`h-7 w-7`}/>
            <AnimatePresence mode="sync" initial={false}>
                {count !== 0 &&
                    <motion.div
                        className={`text-2xl font-bold ps-2 pe-1`}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {count}
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )
}

function SearchResult({results}: { results: SearchResult[] }) {
    return (
        <AnimatePresence mode="wait" initial={false}>
            {results.length !== 0 &&
                <>
                    <motion.div
                        className="mt-6 mb-8 columns-2 gap-4"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {results.map((result, index) => (
                            <Link
                                key={`result-${index}`}
                                href={result.slug}
                                className="space-y-3 block mb-4 p-4 border-2 rounded-lg break-inside-avoid"
                            >
                                <h2 className={`text-2xl font-semibold leading-snug`}>{highlightedText(result.title)}</h2>
                                <div className={`text-sm leading-normal`}>
                                    {result.content.map((item, contentIndex) => (
                                        <p key={`content-${contentIndex}`}>...{highlightedText(item)}...</p>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                    <p className={`text-center mb-8`}>已加载所有结果</p>
                </>
            }
        </AnimatePresence>
    )
}

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);

    // Debounce
    const debouncedQuery = useDebounce(query, 300);
    const performSearch = useCallback(async (searchQuery: string) => {
        if (searchQuery.length > 0) {
            const searchResults = await searchArticles(searchQuery);
            setResults(searchResults);
        } else {
            setResults([]);
        }
    }, []);

    useEffect(() => {
        performSearch(debouncedQuery).catch(error => console.error("Search error:", error));
    }, [debouncedQuery, performSearch]);

    return (
        <div className={`flex flex-col`}>
            <div className={`flex flex-col w-full mt-5 mb-8`}>
                <div className="flex flex-row items-baseline justify-start space-x-2">
                    <h1 className="text-[42px] font-bold pr-1">文章搜索</h1>
                    <SearchIndicator count={results.length}/>
                </div>
                <div className="mt-5">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search Anything..."
                        className="w-full px-3 py-2 border-2 rounded-lg"
                    />
                    <SearchResult results={results} />
                </div>
            </div>
        </div>
    );
}
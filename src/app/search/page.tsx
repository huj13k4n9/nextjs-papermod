"use client"

import React, {useCallback, useEffect, useState} from "react";
import {LuSearch} from "react-icons/lu";
import {searchArticles, SearchResult} from "@/lib/search";
import Link from "next/link";

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
                    <LuSearch className={`h-7 w-7`}/>
                </div>
                <div className="mt-5">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search Anything..."
                        className="w-full px-3 py-2 border-2 rounded-lg"
                    />

                    <div className="mt-5">
                        {results.map((result, index) => (
                            <Link key={index} href={result.slug} className={"p-2"}>
                                <h3>{highlightedText(result.title)}</h3>
                                {result.content.map((item, index) => (
                                    <p key={index}>...{highlightedText(item)}...</p>
                                ))}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
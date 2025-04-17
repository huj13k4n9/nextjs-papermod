"use client"

import React, {ChangeEvent, useState} from "react";
import {LuSearch} from "react-icons/lu";
import {searchArticles} from "@/lib/search";
import {cn} from "@/lib/utils";

function highlightedText({content, indexes}: {content: string, indexes: [number, number][]}) {
    if (!indexes.length) return <>{content}</>;

    const parts: React.ReactElement[] = [];
    let lastEnd = 0;

    indexes.forEach(([start, length], i) => {
        if (start > lastEnd) {
            parts.push(<React.Fragment key={`normal-${i}`}>{content.substring(lastEnd, start)}</React.Fragment>);
        }
        parts.push(<b key={`highlight-${i}`}>{content.substring(start, start + length)}</b>);
        lastEnd = start + length;
    });

    if (lastEnd < content.length) {
        parts.push(<React.Fragment key={`normal-last`}>{content.substring(lastEnd)}</React.Fragment>);
    }
    return <>{parts}</>;
}


export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        if (newQuery.length > 1) {
            const searchResults = await searchArticles(newQuery);
            console.log(searchResults);
            setResults(searchResults);
        } else {
            setResults([]);
        }
    };

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
                        onChange={handleChange}
                        placeholder="Search Anything..."
                        className="w-full px-3 py-2 border-2 rounded-lg"
                    />

                    <div className="mt-5">
                        {results.map((result, index) => (
                            <div key={index} className={cn(
                                "p-2", index !== 0 && "border-t"
                            )}>
                                <h3>{highlightedText(result.title)}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
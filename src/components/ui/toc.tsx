import {HeadingNode} from "@/components/mdx";
import React from "react";
import Link from "next/link";

export default function TOC({data}: {data: HeadingNode[]}): React.ReactElement {
    return (
        <div className={`sticky top-28 h-[calc(95vh-6rem-4rem)] text-sm hidden xl:block`}>
            <ul className={`h-full overflow-auto space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}>
                {data.map(heading => (
                    <li key={heading.id} style={{
                        paddingInlineStart: `${heading.level-1}rem`,
                        paddingTop: heading.level === 1 ? '0.5rem': '0',
                    }}><Link href={`#${heading.id}`}>{heading.text}</Link></li>
                ))}
            </ul>
        </div>
    )
}
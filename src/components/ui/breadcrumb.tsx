import React from "react";
import Link from "next/link";
import { RxSlash } from "react-icons/rx";

interface BreadcrumbItem {
    index: number;
    text: string;
    href: string;
}

export default function Breadcrumb({items}: {
    items: BreadcrumbItem[];
}) {
    const sortedItems = items.sort((a, b) => {return a.index - b.index})
    return (
        <div className="flex flex-row flex-wrap justify-items-center items-center space-x-1.5 font-medium text-base">
            {sortedItems.map((item, index) => (
                <>
                    {index > 0 && <span className={`text-[120%] font-normal text-white/40`}>/</span>}
                    <Link key={index} href={item.href}>{item.text}</Link>
                </>
            ))}
        </div>
    )
}
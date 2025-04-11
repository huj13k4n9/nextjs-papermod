import React from "react";
import Link from "next/link";
import {LuChevronsRight } from "react-icons/lu";
import {cn} from "@/lib/utils";

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
        <div
            className={cn(
                "[&>svg]:w-6 [&>svg]:h-6 [&>svg]:mb-[1px] [&>svg]:text-white/40",
                "flex flex-row flex-wrap justify-items-center items-center space-x-1.5 font-medium text-[17px]"
            )}
        >
            {sortedItems.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <span className="text-[120%] font-normal text-white/40">/</span>}
                    <Link href={item.href}>{item.text}</Link>
                </React.Fragment>
            ))}
            <LuChevronsRight />
        </div>
    )
}
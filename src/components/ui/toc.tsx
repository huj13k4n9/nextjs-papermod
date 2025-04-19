'use client'

import React, {useEffect, useState} from 'react';
import {HeadingNode} from "@/components/mdx";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default function TOC({data, className}: { data: HeadingNode[], className?: string }): React.ReactElement {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (data.length === 0) return;

        // 创建观察器来监控所有标题元素
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleHeadings = entries
                    .filter((entry) => entry.isIntersecting)
                    .map((entry) => entry.target);
                if (visibleHeadings.length === 0) return;

                // 获取最靠近顶部的可见标题ID
                const mostVisibleHeading = visibleHeadings.reduce((prev, current) => {
                    return prev.getBoundingClientRect().top < current.getBoundingClientRect().top
                        ? prev
                        : current;
                });

                setActiveId(mostVisibleHeading.id);
            }, {
                // -80px == -5rem
                rootMargin: '-80px 0px -80% 0px',
                threshold: 0.1
            }
        );

        const headingElements = data.map(({id}) =>
            document.getElementById(id)
        ).filter(Boolean);

        headingElements.forEach((element) => {
            if (element) observer.observe(element);
        });

        return () => {
            headingElements.forEach((element) => {
                if (element) observer.unobserve(element);
            });
        };
    }, [data]);

    return (
        <div className={cn(
            `sticky top-28 h-[calc(95vh-6rem-4rem)] text-sm hidden xl:block`,
            className
        )}>
            <ul className={`h-full overflow-auto space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}>
                {data.map(heading => (
                    <li
                        key={heading.id}
                        className={cn(
                            heading.level === 1 && 'pt-2',
                            activeId === heading.id && "text-primary font-semibold"
                        )}
                        style={{paddingInlineStart: `${heading.level - 1}rem`}}
                    >
                        <Link
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({behavior: 'smooth'});
                            }}
                        >
                            {heading.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
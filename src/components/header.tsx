"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {config} from "@/config";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import * as motion from "motion/react-client"
import {AnimatePresence} from "motion/react"

const animateAttr = {
    type: "spring",
    stiffness: 150,
    damping: 20,
}

export default function Header() {
    const navAttrs = config.site.nav;
    const currentPath = usePathname()
    const isBlogPage = currentPath.includes("/article/");

    return (
        <header className="pt-4 pb-3 w-full">
            <motion.div className={"mx-auto px-8 w-full select-none"}
                initial={{ maxWidth: "56rem" }}
                animate={{ maxWidth: isBlogPage ? "72rem" : "56rem" }}
                transition={{
                    ...animateAttr,
                    delay: 0.5,
                }}
            >
                <div className={cn(
                    `flex flex-col md:justify-between items-center`,
                    (navAttrs.showIcon || navAttrs.showTitle) && `md:flex-row`
                )}>
                    {(navAttrs.showIcon || navAttrs.showTitle) &&
                        <motion.a href="/" className="flex items-center mb-4 md:mb-0"
                            layout
                            transition={{
                                ...animateAttr,
                            }}
                        >
                            <Link href="/" className="flex items-center mb-4 md:mb-0">
                                {navAttrs.showIcon &&
                                    <Image src={navAttrs.icon} alt="Site Logo" width={32} height={32}
                                           className="mr-3 rounded-full"/>
                                }
                                {config.site.nav.showTitle &&
                                    <span className="text-xl font-bold">{config.site.title}</span>
                                }
                            </Link>
                        </motion.div>
                    }

                    <nav>
                        <motion.ul
                            className={`flex space-x-6 list-none w-full`}
                            layout
                            transition={{
                                ...animateAttr,
                            }}
                        >
                            {navAttrs.entries.map((link, index) => (
                                <motion.li
                                    key={index}
                                    layout
                                    className={`list-none relative cursor-pointer items-center justify-between`}
                                >
                                    <Link href={link.href}>
                                        <div className={`flex items-center min-h-[28px] min-w-[24px]`}>
                                            <motion.span
                                                layout
                                                className="text-base pr-1.5"
                                            >
                                                {link.icon}
                                            </motion.span>
                                            <AnimatePresence mode="wait" initial={false}>
                                                {currentPath === link.href ? (
                                                    <motion.span
                                                        key={link.href}
                                                        initial={{opacity: 0, width: 0}}
                                                        animate={{opacity: 1, width: "auto"}}
                                                        exit={{opacity: 0, width: 0}}
                                                        transition={{
                                                            opacity: {duration: 0.4},
                                                            width: {duration: 0.4, ease: [0.4, 0, 0.2, 1]}
                                                        }}
                                                        className="text-base font-bold overflow-hidden whitespace-nowrap"
                                                    >
                                                        {link.label}
                                                    </motion.span>
                                                ) : null}
                                            </AnimatePresence>
                                        </div>
                                        {currentPath === link.href && (
                                            <motion.div
                                                className={`absolute inset-0 bg-[#ffffff33] rounded-md -z-10 -ml-1.5 -mr-2.5 -my-0.5`}
                                                layoutId="underline"
                                                transition={{
                                                    ...animateAttr,
                                                    duration: 0.5
                                                }}
                                            />
                                        )}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </nav>
                </div>
            </motion.div>
        </header>
    );
};
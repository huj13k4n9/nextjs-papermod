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
        <header className={cn(
            "pt-4 pb-3 w-full bg-transparent backdrop-blur-lg",
            navAttrs.float && "fixed top-0 left-0 right-0 z-20 border-b-[1.5px]"
        )}>
            <motion.div className={"mx-auto px-8 w-full select-none"}
                        initial={{maxWidth: "56rem", y: 0}}
                        animate={{maxWidth: isBlogPage ? "72rem" : "56rem", y: 0}}
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
                        <motion.div
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
                                                <motion.span
                                                    key={link.href}
                                                    initial={{opacity: 0, width: 0}}
                                                    animate={{opacity: 1, width: "auto"}}
                                                    exit={{opacity: 0, width: 0}}
                                                    transition={{
                                                        ...animateAttr,
                                                        opacity: {duration: 0.5},
                                                        width: {duration: 0.5},
                                                    }}
                                                    className={cn(
                                                        "text-base font-bold overflow-hidden",
                                                        currentPath !== link.href && "hidden"
                                                    )}
                                                >
                                                    {link.label}
                                                </motion.span>
                                            </AnimatePresence>
                                        </div>
                                        {currentPath === link.href && (
                                            <motion.div
                                                className={`absolute inset-0 bg-[#ffffff33] rounded-md -z-10 -ml-1.5 -mr-2 -my-0.5`}
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
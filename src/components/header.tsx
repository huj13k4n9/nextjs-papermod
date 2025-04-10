"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {config} from "@/config";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import * as motion from "motion/react-client"
import {AnimatePresence} from "motion/react";

const animateAttr = {
    type: "spring",
    stiffness: 200,
    damping: 28,
}

type LinkLabelConfig = "true" | "false" | "current"

export default function Header() {
    const navAttrs = config.site.nav;
    const currentPath = usePathname()
    const isBlogPage = currentPath.includes("/article/");
    // @ts-ignore
    const linkLabelConfig: LinkLabelConfig = navAttrs.showLinkLabel;

    return (
        <header className={cn(
            "pt-4 pb-3 w-full bg-transparent backdrop-blur-lg",
            navAttrs.float && "fixed top-0 left-0 right-0 z-20 border-b-[1.5px]"
        )}>
            <motion.div
                className={"mx-auto px-8 w-full select-none"}
                initial={{maxWidth: "56rem"}}
                animate={{maxWidth: isBlogPage ? "72rem" : "56rem"}}
                transition={{ ...animateAttr, delay: 0.4 }}
            >
                <nav className={cn(
                    `flex flex-col md:justify-between items-center`,
                    (navAttrs.showIcon || navAttrs.showSiteName) && `md:flex-row`
                )}>
                    {(navAttrs.showIcon || navAttrs.showSiteName) &&
                                <motion.button
                                type="button"
                                whileTap={{ scale: 0.9 }}
                                transition={{ ease: "easeInOut", duration: 0.1 }}
                                >
                                <Link href="/" className="flex items-center mb-4 md:mb-0">
                            {navAttrs.showIcon &&
                                <Image src={navAttrs.icon} alt="Site Logo" width={32} height={32}
                                                           className="mr-3 rounded-full"/>
                        }
                        {config.site.nav.showSiteName &&
                        <span className="text-xl font-bold">{config.site.title}</span>
                        }
                    </Link>
                </motion.button>
                }

                <div>
                    <ul className={`flex space-x-6 list-none w-full`}>
                        {navAttrs.entries.map((link, index) => (
                                <li key={index} className={`list-none relative items-center justify-between`}>
                                    <Link href={link.href}>
                                        <motion.button
                                            type="button"
                                            className={`cursor-pointer flex items-center justify-center min-h-[28px] min-w-[24px]`}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ ease: "easeInOut", duration: 0.1 }}
                                        >
                                            <span className={`text-[15px] font-bold overflow-hidden`}>
                                                {link.icon}
                                            </span>

                                            {(linkLabelConfig === "true" || (linkLabelConfig === "current" && currentPath === link.href)) &&
                                                <span className={`text-[15px] font-bold overflow-hidden ml-1 hidden sm:inline-block`}>
                                                    {link.label}
                                                </span>
                                            }
                                        </motion.button>

                                        <AnimatePresence initial={false}>
                                            {currentPath === link.href && (
                                                <motion.div
                                                    style={{ borderRadius: "8px" }}
                                                    className={`absolute inset-0 bg-[#ffffff33] -z-10 -ml-2 -mr-2 -my-0.5`}
                                                    layoutId="navlinks"
                                                    initial={{ opacity: 0}}
                                                    animate={{ opacity: 1}}
                                                    exit={{ opacity: 0}}
                                                    transition={{
                                                        ...animateAttr,
                                                        duration: 0.5
                                                    }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </motion.div>
        </header>
    );
};
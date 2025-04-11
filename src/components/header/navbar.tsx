"use client"

import React from 'react';
import Link from 'next/link';
import { config } from "@/config";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { animateAttr } from './header';

type NavBarProps = {
    currentPath: string;
};

type NavLinkProps = {
    link: {
        href: string;
        icon: React.ReactNode;
        label: string;
    };
    currentPath: string;
};

const navAttrs = config.site.nav;

function NavLink({ link, currentPath }: NavLinkProps) {
    const getLinkLabelStyle = (href: string) => {
        switch (navAttrs.showLinkLabel) {
            case "true":
                return "hidden sm:inline-block";
            case "false":
                return "hidden";
            case "current":
                return currentPath !== href ? "hidden" : "";
            default:
                return "";
        }
    };

    return (
        <motion.li
            layout
            className="list-none relative items-center justify-between"
        >
            <Link href={link.href}>
                <motion.button
                    type="button"
                    className="cursor-pointer flex items-center justify-center min-h-[28px] min-w-[24px]"
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.span
                        layout
                        className="text-[15px] font-bold overflow-hidden"
                    >
                        {link.icon}
                    </motion.span>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={link.href}
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{
                                ...animateAttr,
                                opacity: { duration: 0.5 },
                                width: { duration: 0.5 },
                            }}
                            className={cn(
                                "text-[15px] font-bold overflow-hidden ml-1",
                                getLinkLabelStyle(link.href)
                            )}
                        >
                            {link.label}
                        </motion.span>

                        {currentPath === link.href && (
                            <motion.div
                                style={{ borderRadius: "8px" }}
                                className="absolute inset-0 bg-[#ffffff33] rounded-xl -z-10 -ml-2 -mr-2 -my-0.5"
                                layoutId="navlinks"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    ...animateAttr,
                                    duration: 0.5
                                }}
                            />
                        )}
                    </AnimatePresence>
                </motion.button>
            </Link>
        </motion.li>
    );
}

export default function NavBar({ currentPath }: NavBarProps) {
    return (
        <div>
            <motion.ul
                className="flex space-x-6 list-none w-full"
                layout
                transition={{ ...animateAttr }}
            >
                {navAttrs.entries.map((link, index) => (
                    <NavLink
                        key={index}
                        link={link}
                        currentPath={currentPath}
                    />
                ))}
            </motion.ul>
        </div>
    );
}

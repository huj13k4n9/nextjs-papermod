"use client"

import React from 'react';
import {config} from "@/config";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import * as motion from "motion/react-client"
import LogoAndName from "@/components/header/logo-and-name";
import NavBar from "@/components/header/navbar";

export const animateAttr = {
    type: "spring",
    stiffness: 200,
    damping: 28,
}

export default function Header() {
    const navAttrs = config.site.nav;
    const currentPath = usePathname()
    const isBlogPage = currentPath.startsWith("/article/");

    return (
        <header className={cn(
            "pt-4 pb-3 w-full bg-transparent backdrop-blur-lg",
            navAttrs.float && "fixed top-0 left-0 right-0 z-20 border-b-[1.5px]"
        )}>
            <motion.div
                className={"mx-auto px-6 w-full select-none"}
                layout
                initial={{maxWidth: "56rem"}}
                animate={{maxWidth: isBlogPage ? "72rem" : "56rem"}}
                transition={{...animateAttr, delay: 0.4}}
                // Fixed scroll problem of animated elements from
                // https://github.com/motiondivision/motion/issues/1535#issuecomment-1952964188
                style={{originY: 'top'}}
            >
                <nav className={cn(
                    `flex flex-col md:justify-between items-center`,
                    (navAttrs.showIcon || navAttrs.showSiteName) && `md:flex-row`
                )}>
                    {(navAttrs.showIcon || navAttrs.showSiteName) && <LogoAndName/>}
                    <NavBar currentPath={currentPath}/>
                </nav>
            </motion.div>
        </header>
    );
};
"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { config } from "@/config";
import * as motion from "motion/react-client";

export default function LogoAndName() {
    const navAttrs = config.site.nav;

    return (
        <motion.button
            type="button"
            layout
            whileTap={{ scale: 0.9 }}
            transition={{ ease: "easeInOut", duration: 0.1 }}
        >
            <Link href="/" className="flex items-center mb-4 md:mb-0">
                {navAttrs.showIcon && (
                    <Image
                        src={navAttrs.icon}
                        alt="Site Logo"
                        width={32}
                        height={32}
                        className="mr-3 rounded-full"
                    />
                )}
                {config.site.nav.showSiteName && (
                    <span className="text-xl font-bold">{config.site.title}</span>
                )}
            </Link>
        </motion.button>
    );
}

"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {config} from "@/config";
import {mergeClasses} from "@/utils";
import {usePathname} from "next/navigation";

export default function Header() {
    const navAttrs = config.site.nav;
    const currentPath = usePathname()

    return (
        <header className="pt-4 pb-3 w-full">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className={mergeClasses(
                    `flex flex-col md:justify-between items-center`,
                    (navAttrs.showIcon || navAttrs.showTitle) && `md:flex-row`
                )}>
                    {(navAttrs.showIcon || navAttrs.showTitle) &&
                        <div className="flex items-center mb-4 md:mb-0">
                            {navAttrs.showIcon &&
                                <Image src={navAttrs.icon} alt="Site Logo" width={32} height={32} className="mr-3 rounded-full"/>
                            }
                            {config.site.nav.showTitle &&
                                <span className="text-xl font-bold">{config.site.title}</span>
                            }
                        </div>
                    }

                    <nav className="flex space-x-6">
                        {navAttrs.entries.map((link, index) => (
                            <Link key={index} href={link.href} >
                                {currentPath === link.href ?
                                    <>
                                        <span className="pr-1.5">{link.icon}</span>
                                        <span className="font-bold">{link.label}</span>
                                    </> :
                                    <span>{link.icon}</span>
                                }
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};
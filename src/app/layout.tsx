import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {config} from "@/config";
import Footer from "@/components/footer";
import Header from "@/components/header/header";
import Background from "@/components/background";

export const metadata: Metadata = {
    generator: 'Next.js',
    applicationName: config.site.title,
    title: config.site.title,
    description: config.site.description,
    referrer: "origin-when-cross-origin",
    authors: [{name: config.site.author}],
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
        <body className={`min-w-xs overflow-x-hidden dark`}>
        <Background>
            <Header/>
            {children}
            <Footer/>
        </Background>
        </body>
        </html>
    );
}

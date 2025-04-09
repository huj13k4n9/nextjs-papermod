import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {config} from "@/config";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Background from "@/components/background";

export const metadata: Metadata = {
    title: config.site.title,
    description: config.site.description,
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </head>
        <body className={`min-w-xs overflow-x-hidden dark`}>
        <Background>
            <Header/>
            <main className="max-w-4xl mx-auto px-8 py-6">
                {children}
            </main>
            <Footer/>
        </Background>
        </body>
        </html>
    );
}

import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <html lang="zh">
      <body className={`min-w-md overflow-x-hidden`}>
        <Background>
            <Header />
            {children}
            <Footer />
        </Background>
      </body>
    </html>
    );
}

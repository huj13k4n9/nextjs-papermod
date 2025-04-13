"use client"

import React from "react";
import {cn} from "@/lib/utils";

export default function KaTeXWrapper({className, ...props}: React.HTMLAttributes<HTMLPreElement>) {
    const preRef = React.useRef<HTMLSpanElement>(null);
    if (preRef.current?.className && preRef.current.className.trim() === "katex") {
        return (
            <span ref={preRef} className={cn(
                preRef.current.parentElement?.innerText.replace(preRef.current.innerText, "") !== "" ? "katex-inline" : "katex-block",
                className)} {...props}
            />
        )
    }

    return (
        <span ref={preRef} className={cn("", className)} {...props} />
    )
}
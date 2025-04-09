"use client"

import {cn} from "@/lib/utils";
import {LuCheckCheck, LuCopy} from "react-icons/lu";
import React, {useState} from "react";
import {AnimatePresence, motion} from "motion/react";

export default function CodeBlock({className, ...props}: React.HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = useState(false);
    const preRef = React.useRef<HTMLPreElement>(null);

    const copyToClipboard = async () => {
        const codeContent = preRef.current?.innerText || '';

        if (!navigator.clipboard) { // HTTPS only
            const textArea = document.createElement('textarea');
            textArea.value = codeContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        } else {  // Backup
            await navigator.clipboard.writeText(codeContent);
        }

        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
    };

    const animationParams = {
        initial: {opacity: 0, scale: 0.5},
        animate: {opacity: 1, scale: 1},
        exit: {opacity: 0, scale: 0.5},
        transition: {duration: 0.1},
    }

    return (
        <div className={`relative group max-w-4xl`}>
            <pre ref={preRef} className={cn("mb-4", className)} {...props} />
            <button
                className={`absolute cursor-pointer top-2 right-2 rounded-md border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                onClick={copyToClipboard}
            >
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.div
                            className={`px-2 py-2 w-10 h-10 [&>*]:w-5 [&>*]:h-5 flex items-center justify-center`}
                            key="check" {...animationParams}>
                            <LuCheckCheck/>
                        </motion.div>
                    ) : (
                        <motion.div
                            className={`px-2 py-2 w-10 h-10 [&>*]:w-5 [&>*]:h-5 flex items-center justify-center`}
                            key="copy" {...animationParams}>
                            <LuCopy/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    )
}
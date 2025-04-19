"use client"

import {config} from "@/config";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import Delimiter from "@/components/ui/delimiter";

interface RunningTime {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

function getRunningTime(createdDate: string): RunningTime {
    const now = new Date();
    const startDate = new Date(createdDate);
    const diffTime = now.getTime() - startDate.getTime();
    const days = Math.floor(diffTime / 86400000);
    const hours = Math.floor((diffTime % 86400000) / 3600000);
    const minutes = Math.floor((diffTime % 3600000) / 60000);
    const seconds = Math.floor((diffTime % 60000) / 1000);
    return {
        days: days.toString(),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
    };
}

export default function Footer() {
    const [mounted, setMounted] = useState(false);
    const [runningTime, setRunningTime] = useState<RunningTime>(getRunningTime(config.site.created));
    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            const time = getRunningTime(config.site.created);
            setRunningTime(time);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <footer className="m-auto text-center text-xs pt-5 pb-8 leading-relaxed">
                <span>© {new Date().getFullYear()} </span>
                <span>{config.site.author}</span>
                <Delimiter/>
                {
                    config.site.beian &&
                    <Link href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                        {config.site.beian}
                    </Link>
                }
                <br/>
                {mounted && (
                    <span>本站已运行 {runningTime.days} 天 {runningTime.hours} 小时 {runningTime.minutes} 分 {runningTime.seconds} 秒</span>
                )}
            </footer>
        </>
    );
}


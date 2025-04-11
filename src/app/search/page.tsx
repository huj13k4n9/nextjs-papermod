import React from "react";
import {LuSearch} from "react-icons/lu";

export default function Search() {
    return (
        <div className={`flex flex-col`}>
            <div className={`flex flex-col w-full mt-5 mb-8`}>
                <div className="flex flex-row items-baseline justify-start space-x-2 [&>svg]:h-7 [&>svg]:w-7">
                    <h1 className="text-[42px] font-bold pr-1">文章搜索</h1>
                    <LuSearch/>
                </div>
            </div>
        </div>
    );
}
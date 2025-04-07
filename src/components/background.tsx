import React, {ReactNode} from 'react';
import {mergeClasses} from "@/utils";
import {config} from "@/config";

export default function Background({children}: {children: ReactNode}) {
    const bg = config.site.background;

    // 计算背景样式
    const getBackgroundStyle = () => {
        switch (bg.type) {
            case 'gradient':
                return {
                    backgroundImage: bg.style,
                    opacity: bg.opacity,
                };
            case 'color':
            default:
                return {
                    backgroundColor: bg.style,
                    opacity: bg.opacity,
                };
        }
    };

    return (
        <div className="relative w-full min-h-screen">
            <div
                className={mergeClasses(
                    'absolute inset-0 w-full h-full z-0',
                    bg.fixed ? 'fixed' : 'absolute'
                )}
                style={getBackgroundStyle()}
            />

            {bg.overlay && (
                <div
                    className={mergeClasses(
                        'absolute inset-0 w-full h-full z-0',
                        bg.fixed ? 'fixed' : 'absolute'
                    )}
                    style={{
                        backgroundColor: bg.overlayColor,
                        opacity: bg.overlayOpacity,
                    }}
                />
            )}

            <div className="relative z-10 w-full min-h-screen">
                {children}
            </div>
        </div>
    );
};

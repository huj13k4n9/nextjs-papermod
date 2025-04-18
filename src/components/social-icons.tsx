import {LuCoffee, LuFacebook, LuGithub, LuGitlab, LuMail, LuRss} from "react-icons/lu";
import {PiLinkedinLogoBold, PiReadCvLogoBold} from "react-icons/pi";
import {RiBilibiliLine} from "react-icons/ri";

function GitHubIcon() {
    return <LuGithub/>
}

function GitLabIcon() {
    return <LuGitlab/>
}

function LinkedinIcon() {
    return <PiLinkedinLogoBold/>
}

function XIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
            </path>
        </svg>
    )
}

function FacebookIcon() {
    return <LuFacebook/>
}

function SteamIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentcolor" stroke="none">
            <path
                d="M-24.6 20.8c-1.4-.8-2.7-1.5-4.1-2.3-2.4-1.5-3.6-3.6-3.3-6.5.3-3 2.8-5.2 5.8-5.3h11c2.6.0 4.6 2.2 4.7 4.7.0 2.6-2 4.8-4.6 4.9h-2.8v.2c.2.2.5.3.7.5 1.2.7 2.4 1.3 3.6 2 2.5 1.5 3.7 4.5 2.9 7.2s-3.1 4.3-6.1 4.4h-10.6c-2.4.0-4.3-1.9-4.6-4.3-.3-2.3 1.2-4.5 3.5-5.1.6-.1 1.2-.1 1.7-.2h2.1c.1.0.1-.1.1-.2zm4.3-3.8c-.1.3-.2.3-.2.4v3.9c0 1.1-.1 1.2-1.2 1.2h-5.1c-.4.0-.9.0-1.3.1-1.6.4-2.5 1.9-2.4 3.6.2 1.6 1.6 2.9 3.3 2.9h10.5c2.1.0 3.8-1.2 4.5-3.1.7-1.8.2-4.1-1.5-5.3-2.1-1.3-4.3-2.4-6.6-3.7zm-1.7 3.4v-4c0-1.4.1-1.5 1.4-1.5h5.3c1.5.0 2.7-1 3.1-2.4.6-2.2-1-4.2-3.4-4.3h-10.1c-2.4.0-4.3 1.3-4.9 3.4-.6 2.1.4 4.4 2.5 5.5 1.7 1 3.5 1.9 5.2 2.9.4.2.6.3.9.4z"></path>
            <path
                d="M53.3 6.9c-.2-1-1-1.7-1.9-2-1.7-.4-8.6-.4-8.6-.4s-6.9.0-8.6.5c-1 .3-1.7 1-1.9 2-.3 1.7-.5 3.5-.5 5.3s.1 3.6.5 5.3c.3.9 1 1.7 1.9 1.9 1.7.5 8.6.5 8.6.5s6.9.0 8.6-.5c1-.3 1.7-1 1.9-2 .3-1.7.5-3.5.5-5.3s-.1-3.6-.5-5.3z"></path>
            <path d="m40.6 15.5 5.7-3.3-5.7-3.3z"></path>
            <path
                d="M72.4-9.9c5.5.0 10 4 10 8.9.0 1.8-.8 3.8-2.1 5.4-.9 1-1.5 2.3-1.6 3.7.0-.1-.1-.1-.2-.2-.4-.4-1.1-.7-1.7-.7-.3.0-.5.0-.8.1-1.2.5-2.5.7-3.6.7-5.5.0-10-4-10-8.9s4.5-9 10-9m0-2c-6.6.0-12 4.9-12 10.9s5.4 11 12 11c1.4.0 2.8-.2 4.2-.7h.1c.1.0.2.0.3.1 1 1.3 2.5 2.3 4.2 2.7l.2-.1v-.3c-.7-.9-1-1.9-1-3s.4-2.1 1.2-2.9c1.5-1.8 2.6-4.2 2.6-6.7.1-6.1-5.3-11-11.8-11z"></path>
            <path
                d="M72.3-6.5c.1.0.3.1.3.2l1.2 3.4 3.7.1c.1.0.3.1.3.2s0 .3-.1.4l-3 2.2 1.1 3.5c0 .1.0.3-.1.4h-.4l-3-2.1-3 2.1h-.4c-.1-.1-.2-.2-.1-.4L69.9.0l-3-2.2c-.1-.1-.2-.2-.1-.4.0-.1.2-.2.3-.2l3.7-.1L72-6.3c0-.1.2-.2.3-.2zM46.8-20.8c2 0 4 .6 5.6 1.6-.5-.1-1.1-.2-1.6-.2-3.2.0-5.8 2.5-6 5.6l-2.2 3.2c-.5.1-.9.2-1.4.4l-4.7-1.9c.8-5 5.2-8.7 10.3-8.7m9.9 7.2c.3 1 .5 2.1.5 3.3C57.2-4.5 52.5.2 46.7.2c-1.8.0-3.6-.5-5.1-1.3.5.2 1 .2 1.5.2 2.5.0 4.5-1.9 4.8-4.3L51-7.4c3.1-.2 5.6-2.8 5.6-6 .1-.1.1-.1.1-.2M38.3-4.2l.3.2c.1.2.2.5.3.7l-.6-.9m8.5-18.1c-6.3.0-11.5 4.9-12 11l6.4 2.7c.5-.4 1.2-.6 1.9-.6h.2l2.9-4.1v-.1c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5h-.1L46.5-6v.2c0 1.9-1.5 3.4-3.4 3.4-1.6.0-3-1.2-3.3-2.7L35.2-7c1.4 5 6 8.7 11.5 8.7 6.6.0 12-5.4 12-12s-5.3-12-11.9-12z"></path>
            <path
                d="M42.6-4.6 41.5-5c.2.4.5.7 1 .9 1 .4 2.1-.1 2.5-1 .2-.5.2-1 0-1.4-.2-.5-.6-.8-1-1-.5-.2-1-.2-1.4.0l1.1.5c.7.3 1 1.1.7 1.8-.3.6-1.1.9-1.8.6zm8.1-11.5c-1.5.0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7-1.2-2.7-2.7-2.7zm0 4.7c-1.1.0-2-.9-2-2s.9-2 2-2 2 .9 2 2c.1 1.1-.9 2-2 2zM12 0C5.4.0.0 5.4.0 12s5.4 12 12 12 12-5.4 12-12S18.6.0 12 0zm0 22c-4.3.0-8-2.7-9.4-6.5L6.2 17c.3 1.3 1.5 2.4 2.9 2.4 1.6.0 2.9-1.3 2.9-2.9v-.1l3.5-2.5h.1c2.1.0 3.9-1.8 3.9-3.9s-1.8-3.9-3.9-3.9c-2.2.0-3.9 1.8-3.9 3.9v.1l-2.5 3.6H9c-.6.0-1.2.2-1.7.5L2 11.7C2.2 6.3 6.6 2 12 2c5.5.0 10 4.5 10 10s-4.5 10-10 10zm-2.4-7.1-1.3-.5c.5-.2 1.1-.2 1.6.0s1 .7 1.2 1.2.2 1.1.0 1.7c-.5 1.1-1.8 1.7-2.9 1.2-.5-.2-.9-.6-1.1-1.1l1.3.5c.2.0.4.1.6.1.6.0 1.2-.4 1.5-1 .4-.9.0-1.8-.9-2.1zM13 9.8c0-1.5 1.2-2.6 2.6-2.6 1.5.0 2.6 1.2 2.6 2.6.0 1.5-1.2 2.6-2.6 2.6S13 11.2 13 9.8z"></path>
            <path d="M13.7 9.8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2c-1.1-.1-2-.9-2-2z"></path>
        </svg>
    )
}

function WeChatIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <path
                d="M17 10C20.3142 10 23 12.2165 23 14.95C23 16.4867 22.1513 17.8595 20.8182 18.767V21L18.6756 19.7042C18.1265 19.835 17.5642 19.9007 17 19.9C13.6858 19.9 11 17.6835 11 14.95C11 12.2165 13.6858 10 17 10Z"/>
            <path
                d="M10.7657 15.5978C10.033 15.8089 9.24728 15.9231 8.43285 15.9231C7.4893 15.9251 6.55199 15.7679 5.65934 15.4578L3.12367 17V13.9835C1.81018 12.8183 1 11.2223 1 9.46154C1 5.89262 4.3278 3 8.43285 3C12.4487 3 15.7202 5.76769 15.8657 9.23V9.48092M9.49469 7.30769H9.50531M6.30918 7.30769H6.3198M14.8039 13.7692H14.8145M17.9894 13.7692H18"/>
        </svg>
    )
}

function QQIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <path transform="scale(0.04) translate(75 40)" strokeWidth="50"
                  d="M433.754 420.445c-11.526 1.393-44.86-52.741-44.86-52.741 0 31.345-16.136 72.247-51.051 101.786 16.842 5.192 54.843 19.167 45.803 34.421-7.316 12.343-125.51 7.881-159.632 4.037-34.122 3.844-152.316 8.306-159.632-4.037-9.045-15.25 28.918-29.214 45.783-34.415-34.92-29.539-51.059-70.445-51.059-101.792 0 0-33.334 54.134-44.859 52.741-5.37-.65-12.424-29.644 9.347-99.704 10.261-33.024 21.995-60.478 40.144-105.779C60.683 98.063 108.982.006 224 0c113.737.006 163.156 96.133 160.264 214.963 18.118 45.223 29.912 72.85 40.144 105.778 21.768 70.06 14.716 99.053 9.346 99.704z">
            </path>
        </svg>
    )
}

function ZhihuIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <path
                d="m13.3334,3.60098l0,17.1471l1.79582,0l0.75424,2.13703l3.18459,-2.13703l3.93584,0l0,-17.1471l-9.6705,0zm7.41375,14.87538l-1.79283,0l-2.24777,1.50849l-0.53276,-1.50849l-0.53875,0l0,-12.53483l5.10911,0l0,12.53483l0.00299,0zm-8.56906,-7.18927l-3.97475,0c0.06285,-1.34387 0.1287,-3.12174 0.19754,-5.17496l3.91788,0l-0.00299,-0.24244c0,-0.01796 -0.00599,-0.43998 -0.06884,-0.87097c-0.06285,-0.44896 -0.19754,-1.04457 -0.62854,-1.04457l-6.5727,0c0.13169,-0.61657 0.46991,-2.08615 0.87995,-2.80747l0.19155,-0.33522l-0.3861,-0.02095c-0.02394,0 -0.58663,-0.02694 -1.23912,0.31726c-1.06851,0.56868 -1.5474,1.68807 -1.75691,2.52612c-0.55072,2.18791 -1.33489,3.70837 -1.66712,4.35786c-0.09877,0.19155 -0.15863,0.30529 -0.18557,0.38311c-0.05387,0.14666 -0.02394,0.29332 0.0838,0.38909c0.31427,0.28434 1.14334,-0.0868 1.15232,-0.08979c0.01796,-0.00898 0.03891,-0.01796 0.06585,-0.02993c0.41603,-0.18856 1.64916,-0.74826 2.08914,-2.52911l1.69705,0c0.02095,0.96376 0.09278,4.14236 0.0868,5.17496l-4.22018,0l-0.06285,0.0449c-0.69139,0.50582 -0.91288,1.8916 -0.92185,1.95146l-0.0419,0.27536l4.99837,0c-0.36814,2.34355 -0.79315,3.3941 -1.01763,3.81313c-0.11074,0.20951 -0.21849,0.41902 -0.32025,0.62255c-0.63752,1.26306 -1.29898,2.56802 -3.7802,4.5973c-0.10775,0.0838 -0.20951,0.23944 -0.14367,0.41005c0.07183,0.18856 0.27835,0.27237 0.73629,0.27237c0.16162,0 0.35318,-0.00898 0.58065,-0.02993c1.49352,-0.13169 3.01698,-0.53875 4.04359,-2.6219c0.50882,-1.05056 0.94879,-2.14601 1.31394,-3.25941l4.08549,4.78886l0.14965,-0.35916c0.02394,-0.05687 0.56868,-1.38578 0.15264,-2.87032l-0.01497,-0.05387l-3.23547,-3.68143l-0.65847,0.49684c0.19155,-0.78118 0.31726,-1.49352 0.37413,-2.12805l4.74995,0l0,-0.23944c0,-1.20021 -0.55371,-1.91255 -0.57466,-1.94248l-0.07183,-0.08979z"/>
        </svg>
    )
}

function GoogleScolarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
            <path
                d="M5.242 13.769L0.5 9.5 12 1l11.5 9-5.242 3.769C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
        </svg>
    )
}

function BilibiliIcon() {
    return <RiBilibiliLine/>
}

function BuyMeACoffeeIcon() {
    return <LuCoffee/>
}

function CVIcon() {
    return <PiReadCvLogoBold/>
}

function EMailIcon() {
    return <LuMail/>
}

function RSSIcon() {
    return <LuRss/>
}


export const socialIcons = {
    "bilibili": BilibiliIcon,
    "buymeacoffee": BuyMeACoffeeIcon,
    "cv": CVIcon,
    "email": EMailIcon,
    "facebook": FacebookIcon,
    "github": GitHubIcon,
    "gitlab": GitLabIcon,
    "googlescholar": GoogleScolarIcon,
    "linkedin": LinkedinIcon,
    "qq": QQIcon,
    "rss": RSSIcon,
    "steam": SteamIcon,
    "wechat": WeChatIcon,
    "x": XIcon,
    "zhihu": ZhihuIcon
}
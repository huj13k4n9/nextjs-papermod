export const config = {
    site: {
        title: "Next.js Blog",
        author: "Zhang San",
        description: "A Simple Next.js Blog Site",
        created: "01/01/1970 00:00:00",
        beian: "京 ICP备 12345678 号",
        url: "http://localhost:3000",
        baseUrl: "http://localhost:3000",
        favicon: "favicon.png",
        indexPage: {
            title: "Hi there 😝",
            subtitle: "This is my simple blog site.",
            socialLinks: [
                {type: "github", href: "https://github.com", tooltip: "GitHub"},
                {type: "gitlab", href: "https://gitlab.com", tooltip: "GitLab"},
                {type: "linkedin", href: "https://linkedin.com", tooltip: "LinkedIn"},
                {type: "x", href: "https://x.com", tooltip: "X"},
                {type: "facebook", href: "https://facebook.com", tooltip: "Facebook"},
                {type: "wechat", href: "", tooltip: "微信号: xxxxxx"},
                {type: "qq", href: "https://qq.com", tooltip: "QQ"},
                {type: "zhihu", href: "https://zhihu.com", tooltip: "知乎"},
                {type: "bilibili", href: "https://bilibili.com", tooltip: "哔哩哔哩"},
                {type: "steam", href: "https://s.team", tooltip: "Steam"},
                {type: "googlescholar", href: "https://scholar.google.com", tooltip: "Google 学术"},
                {type: "cv", href: "https://path.to.your.cv/resume.pdf", tooltip: "简历"},
                {type: "buymeacoffee", href: "https://www.buymeacoffee.com", tooltip: "请我喝杯咖啡"},
                {type: "email", href: "mailto:hello@hello.com", tooltip: "邮箱"},
                {type: "rss", href: "/rss.xml", tooltip: "RSS 订阅"},
            ],
            pagination: 5,
        },
        nav: {
            showIcon: true,
            showSiteName: true,
            // true | false | current
            showLinkLabel: "true",
            float: true,
            icon: "/favicon.png",
            entries: [
                {href: '/', label: 'Home', icon: "🏠"},
                {href: '/articles', label: 'Articles', icon: "📙"},
                {href: '/album', label: 'Album', icon: "🎞️"},
                {href: '/about', label: 'About', icon: "👻"},
                {href: '/search', label: 'Search', icon: "🔎"},
            ]
        },
        background: {
            type: "gradient",
            style: "linear-gradient(0deg, #7a0f40, #9333ea)",
            opacity: 1,
            overlay: true,
            overlayColor: "#000000",
            overlayOpacity: 0.8,
            fixed: true,
        }
    }
}
export const config = {
    site: {
        title: "Next.js Blog",
        description: "A Simple Next.js Blog Site",
        created: "01/01/1970 00:00:00",
        beian: "京ICP备12345678号",
        favicon: "favicon.png",
        nav: {
            showIcon: true,
            showTitle: true,
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
            style: "linear-gradient(75deg, #7a0f40, #9333ea)",
            opacity: 1,
            overlay: true,
            overlayColor: "#000000",
            overlayOpacity: 0.8,
            fixed: false,
        }
    }
}
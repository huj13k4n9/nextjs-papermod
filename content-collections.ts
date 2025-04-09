import { defineCollection, defineConfig } from "@content-collections/core";
import {getArticleAttrs} from "@/lib/utils";

const posts = defineCollection({
    name: "posts",
    directory: "posts",
    include: "**/*.md",
    schema: (z) => ({
        title: z.string(),
        date: z.string(),
    }),
    transform: (data) => {
        const {wordCount, summary} = getArticleAttrs(data.content);
        return {
            ...data,
            wordCount,
            summary,
            uri: "/article/" + data._meta.path,
            date: new Date(data.date),
        };
    },
});

export default defineConfig({
    collections: [posts],
});
import {defineCollection, defineConfig} from "@content-collections/core";
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
        const {wordCount, summary, plainText} = getArticleAttrs(data.content);
        return {
            ...data,
            wordCount,
            summary,
            plainText,
            slug: data._meta.path.replaceAll('\\', '/'),
            date: new Date(data.date),
        };
    },
});

export default defineConfig({
    collections: [posts],
});
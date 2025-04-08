import { defineCollection, defineConfig } from "@content-collections/core";

const posts = defineCollection({
    name: "posts",
    directory: "posts",
    include: "**/*.md",
    schema: (z) => ({
        title: z.string(),
        date: z.string(),
    }),
    transform: (data) => {
        return {
            ...data,
            date: new Date(data.date),
        };
    },
});

export default defineConfig({
    collections: [posts],
});
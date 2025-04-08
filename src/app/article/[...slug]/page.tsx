import {allPosts} from "content-collections";
import { MDXRemote } from 'next-mdx-remote/rsc'

async function getBlogsFromParams(slugs: string[]) {
    const slug = slugs?.join("/") || ""
    const blog = allPosts.find((blog: any) => blog._meta.path === slug)

    if (!blog) {
        return null
    }

    return blog
}

export default async function BlogArticlePage({ params }: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params
    const blog = await getBlogsFromParams(slug)

    if (!blog) {
        return <div>404</div>
    }

    return <MDXRemote source={blog.content} />
}
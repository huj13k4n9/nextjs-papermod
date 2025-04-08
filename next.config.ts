import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
    // Add Markdown plugins here, as desired
})

// Merge MDX config with Next.js config
export default withContentCollections(withMDX(nextConfig))
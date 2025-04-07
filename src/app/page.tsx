import Link from "next/link";
import Footer from "@/components/footer";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <div className="">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1>Home Page (Page: {(await searchParams).page})</h1>
      </main>
    </div>
  );
}

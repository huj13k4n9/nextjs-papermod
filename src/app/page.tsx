export default async function Home({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return (
        <div className="">
            <h1>Home Page (Page: {(await searchParams).page})</h1>
        </div>
    );
}

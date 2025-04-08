import * as React from "react"
import {LuEllipsis} from "react-icons/lu";

interface PaginationProps {
    page: number;
    pageCount?: number;
}

function PaginationNumber({page}: PaginationProps): React.ReactElement {
    return (
        <a href={`/?page=${page}`}
           className={`inline-flex items-center justify-center rounded-md text-sm size-9`}
           title={`Go to page ${page}`}
        >{page}</a>
    )
}

function PaginationEllipsis(): React.ReactElement {
    return (
        <span className={`inline-flex items-center justify-center rounded-md text-sm size-9`}><LuEllipsis/></span>
    )
}

export {
    PaginationNumber,
    PaginationEllipsis
}
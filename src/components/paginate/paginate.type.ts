export type Pagination = {
    start: number,
    step: number,
    filter: any
}

export type Props = {
    onChange(pagination: Pagination): void,
    totalRecords: number,
    step: number
}

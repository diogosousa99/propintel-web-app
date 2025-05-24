export type BasePagination<T> = {
    count: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    results: Array<T>;
    total: number;
    totalPages: number;
};

export type BasePaginationParams = {
    search: string;
    page: number;
    pageRows: number;
    orderBy?: string;
};

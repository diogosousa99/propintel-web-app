import { usePagination } from '@hooks';

type PaginationProps = {
    currentPage: number;
    pagesByGroup: number;
    pageRows: number;
    totalRows: number;
    _onChangePage: (page: number) => void;
};

export function Pagination({ currentPage, pagesByGroup, pageRows, totalRows, _onChangePage }: PaginationProps) {
    const { state, actions } = usePagination({
        currentPage,
        pagesByGroup,
        pageRows,
        totalRows,
        _changePage: _onChangePage,
    });

    const renderPageNumbers = () => {
        const pages = [];
        const startPage = state.paginationGroup * pagesByGroup + 1;
        const endPage = Math.min(startPage + state.groupPagesLength - 1, state.numberOfPages);

        for (let page = startPage; page <= endPage; page++) {
            pages.push(
                <button
                    key={page}
                    className={`btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
                    onClick={() => _onChangePage(page)}
                >
                    {page}
                </button>,
            );
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-center mt-4 gap-2">
            <button className="btn btn-sm" onClick={actions._setFirstPage} disabled={currentPage === 1}>
                « First
            </button>
            {state.hasMoreThanOnePaginationGroup && !state.isFirstGroup && (
                <button className="btn btn-sm" onClick={actions._previousGroup}>
                    ...
                </button>
            )}
            <div className="flex gap-1">{renderPageNumbers()}</div>
            {state.hasMoreThanOnePaginationGroup && !state.isLastGroup && (
                <button className="btn btn-sm" onClick={actions._nextGroup}>
                    ...
                </button>
            )}
            <button
                className="btn btn-sm"
                onClick={actions._setLastPage}
                disabled={currentPage === state.numberOfPages}
            >
                Last »
            </button>
        </div>
    );
}

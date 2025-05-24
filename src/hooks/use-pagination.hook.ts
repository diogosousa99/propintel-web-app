import { useEffect, useState } from 'react';

type Props = {
    currentPage: number;
    pagesByGroup: number;
    pageRows: number;
    totalRows: number;
    _changePage: (page: number) => void;
};

export const LAST_VISIBLE_PAGES = 2;

export function usePagination({ currentPage, pagesByGroup, pageRows, totalRows, _changePage }: Props) {
    const [paginationGroup, _setPaginationGroup] = useState(0);

    const numberOfPages = Math.ceil(totalRows / pageRows);

    let totalGroups = Math.floor(numberOfPages / pagesByGroup);

    const penultGroupTotalRows = totalGroups * pagesByGroup * pageRows;

    const lastGroupPages = Math.ceil((totalRows - penultGroupTotalRows) / pageRows);

    const hasMoreThanOnePaginationGroup = numberOfPages >= pagesByGroup;

    totalGroups =
        hasMoreThanOnePaginationGroup && lastGroupPages <= LAST_VISIBLE_PAGES + 1 ? totalGroups - 1 : totalGroups;

    function _setFirstPage(): void {
        if (currentPage > 1) _changePage(1);
    }

    function _setLastPage(): void {
        if (currentPage < numberOfPages) _changePage(numberOfPages);
    }

    function _nextPage(): void {
        if (currentPage < numberOfPages) _changePage(currentPage + 1);
    }

    function _previousPage(): void {
        if (currentPage > 1) _changePage(currentPage - 1);
    }

    function _nextGroup(): void {
        const updatedGroup = paginationGroup + 1;
        if (updatedGroup <= totalGroups) {
            _setPaginationGroup(updatedGroup);
        }
    }

    function _previousGroup(): void {
        const updatedGroup = paginationGroup - 1;
        if (updatedGroup >= 0 && updatedGroup !== paginationGroup) {
            _setPaginationGroup(updatedGroup);
        }
    }

    function _resetPagination(): void {
        const computedGroup = Math.floor((currentPage - 1) / pagesByGroup);
        if (computedGroup <= totalGroups) _setPaginationGroup(computedGroup);
    }

    useEffect(() => {
        _resetPagination();
    }, [currentPage, pagesByGroup]);

    return {
        state: {
            groupPagesLength: paginationGroup === totalGroups ? pagesByGroup + 1 + LAST_VISIBLE_PAGES : pagesByGroup,
            hasMoreThanOnePage: numberOfPages > 1,
            hasMoreThanOnePaginationGroup,
            isFirstGroup: paginationGroup === 0,
            isLastGroup: paginationGroup === totalGroups,
            isLastPage: currentPage === numberOfPages,
            numberOfPages,
            paginationGroup,
            showNextGroup: totalGroups > 1,
            totalGroups,
            pageRows,
        },
        actions: {
            _nextGroup,
            _nextPage,
            _previousGroup,
            _previousPage,
            _resetPagination,
            _setFirstPage,
            _setLastPage,
        },
    };
}

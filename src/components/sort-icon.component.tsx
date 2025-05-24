interface SortIconProps {
    direction?: 'asc' | 'desc';
}

export function SortIcon({ direction }: SortIconProps) {
    const isAsc = direction === 'asc';
    const isDesc = direction === 'desc';

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-1 inline-block"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7.5L7.5 3M7.5 3L12 7.5M7.5 3v13.5"
                className={isAsc ? 'stroke-neutral' : 'stroke-gray-400'}
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.5L16.5 21M16.5 21L12 16.5M16.5 21V7.5"
                className={isDesc ? 'stroke-neutral' : 'stroke-gray-400'}
            />
        </svg>
    );
}

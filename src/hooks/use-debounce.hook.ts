import { useCallback, useRef, useEffect } from 'react';

export function useDebounce(debounceTime: number): { _debounce: (cb: () => void) => void } {
    const ref = useRef<number>();

    const _debounce = useCallback(
        (cb: () => void) => {
            ref.current && clearTimeout(ref.current);
            ref.current = setTimeout(cb, debounceTime) as unknown as number; // TODO: improve when typescript version upgrade
        },
        [debounceTime],
    );

    useEffect(() => () => ref.current && clearTimeout(ref.current), []);

    return { _debounce };
}

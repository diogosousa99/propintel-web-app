import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export function useAppParam<T>(name: string, _converter: (param: string) => T): T {
    const params = useParams();
    return useMemo(() => _converter(params[name] as string), [params[name]]);
}

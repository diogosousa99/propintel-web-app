import { useResetStore } from '@store';

export function useResetAppState() {
    const { _resetStore } = useResetStore();

    return {
        _resetAppState: () => _resetStore(),
    };
}

import { useCallback } from 'react';
import { PROGRESSIVE_PROFILING_QUERY_PARAM } from '../utils/constants';

export default function useClearProgressiveProfilingQueryParams() {
  return useCallback(() => {
    const currentUrl = new URL(window.location.href);

    currentUrl.searchParams.delete(PROGRESSIVE_PROFILING_QUERY_PARAM);

    window.history.replaceState({}, '', currentUrl.toString());
  }, []);
}

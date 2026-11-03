import { PROGRESSIVE_PROFILING_QUERY_PARAM } from '../utils/constants';

export default function useProgressiveProfilingTrigger() {
  const params = new URLSearchParams(window.location.search);

  return {
    shouldOpen: params.get(PROGRESSIVE_PROFILING_QUERY_PARAM) === 'true',
  };
}

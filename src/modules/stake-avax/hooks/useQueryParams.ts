import { useLocation } from 'react-router';

/**
 * https://reactrouter.com/web/example/query-parameters
 */
export function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

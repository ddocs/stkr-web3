import { DependencyList, useContext, useMemo } from 'react';
import { AppContext } from '../../components/AppBase/AppContext';

function useLocaleMemo<T = any>(
  memoFn: () => T,
  deps: DependencyList | undefined,
) {
  const context = useContext(AppContext);
  return useMemo(memoFn, [...(deps || []), context.locale]);
}

export { useLocaleMemo };

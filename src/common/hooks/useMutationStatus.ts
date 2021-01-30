import { useMutation } from '@redux-requests/react';
import { useEffect, useState } from 'react';

export function useMutationStatus(type: string) {
  const [pristine, setPristine] = useState(false);
  const { loading, error } = useMutation({ type });

  useEffect(() => {
    if (loading) {
      setPristine(true);
    }
  }, [loading, setPristine]);

  return { pristine, success: pristine && !loading && !error };
}

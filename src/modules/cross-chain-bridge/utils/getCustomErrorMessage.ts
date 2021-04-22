import { getErrorMessage } from '../../../components/QueryError/QueryError';

export const getCustomErrorMessage = (error: any) => {
  const errorMessage = getErrorMessage({ error });

  switch (errorMessage) {
    case 'please wait for 1 blocks more: Transaction is not confirmed':
      return 'Please wait for 1 blocks more. Try again a bit later.';

    default:
      return errorMessage;
  }
};

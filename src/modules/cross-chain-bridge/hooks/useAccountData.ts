import { useQuery } from '@redux-requests/react';
import { UserActionTypes } from '../../../store/actions/UserActions';
import { IUserInfo } from '../../../store/apiMappers/userApi';

export const useAccountData = () => {
  const { data: accountData } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  return { accountData };
};

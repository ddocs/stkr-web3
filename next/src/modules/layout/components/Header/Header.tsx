import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isAuthenticated } from '../../../../store/reducers/userReducer';

import { useQuery } from '@redux-requests/react';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { AuthorizedHeaderComponent } from './AuthorizedHeaderComponent';
import { UnauthorizedHeader } from './UnauthorizedHeader';

const HeaderImp = ({
  isAuth,
  className,
  fetchUserInfo,
}: {
  isAuth: boolean;
  className?: string;
  fetchUserInfo: typeof UserActions.fetchUserInfo;
}) => {
  const { data } = useQuery<IUserInfo>({
    type: UserActionTypes.FETCH_USER_INFO,
  });

  if (isAuth) {
    return (
      <AuthorizedHeaderComponent
        fetchUserInfo={fetchUserInfo}
        className={className}
        walletAddress={data.address}
        walletType={data.walletType}
        ethereumBalance={data.ethereumBalance}
        ankrBalance={data.ankrBalance}
      />
    );
  } else {
    return <UnauthorizedHeader className={className} />;
  }
};

export const Header = connect(
  (state: IStoreState) => ({
    isAuth: isAuthenticated(state.user),
  }),
  {
    fetchUserInfo: UserActions.fetchUserInfo,
  },
)(HeaderImp);

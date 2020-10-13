import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isAuthenticated } from '../../../../store/reducers/userReducer';

import { Query } from '@redux-requests/react';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { AuthorizedHeader } from './AuthorizedHeader';
import { UnauthorizedHeader } from './UnauthorizedHeader';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';

interface IHeaderProps {
  isAuth: boolean;
  className?: string;
}

const HeaderImp = ({ isAuth, className }: IHeaderProps) => {
  return isAuth ? (
    <Query<IUserInfo | undefined>
      type={UserActionTypes.FETCH_USER_INFO}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      noDataMessage={<QueryEmpty />}
    >
      {({ data }) => (
        <AuthorizedHeader
          className={className}
          walletAddress={data?.address}
          walletType={data?.walletType}
          ethereumBalance={data?.ethereumBalance.toFormat()}
          ankrBalance={data?.ankrBalance.toFormat()}
        />
      )}
    </Query>
  ) : (
    <UnauthorizedHeader className={className} />
  );
};

export const Header = connect((state: IStoreState) => ({
  isAuth: isAuthenticated(state.user),
}))(HeaderImp);

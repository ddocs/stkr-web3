import * as React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';
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
    <Query<IUserInfo | null>
      type={UserActionTypes.FETCH_ACCOUNT_DATA}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      noDataMessage={<QueryEmpty />}
      showLoaderDuringRefetch={false}
    >
      {({ data }) => {
        return (
          <AuthorizedHeader
            className={className}
            walletAddress={data?.address}
            walletType={data?.walletType}
            ethereumBalance={
              data?.ethereumBalance ? data.ethereumBalance.toNumber() : 0
            }
            ankrBalance={data?.ankrBalance ? data.ankrBalance.toNumber() : 0}
          />
        );
      }}
    </Query>
  ) : (
    <UnauthorizedHeader className={className} isAuth={isAuth} />
  );
};

export const Header = connect((state: IStoreState) => ({
  isAuth: isConnected(state.user),
}))(HeaderImp);

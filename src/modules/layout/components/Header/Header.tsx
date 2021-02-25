import { Query } from '@redux-requests/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Provider } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';
import { binance as binanceLogo } from '../assets/assets';
import { PROVIDERS } from '../const';
import { HeaderComponent } from './HeaderComponent';

export const Header = () => {
  const isAuth = useSelector((state: IStoreState) => isConnected(state.user));

  const authorized = (
    <Query<IUserInfo | null>
      type={UserActionTypes.FETCH_ACCOUNT_DATA}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      noDataMessage={<QueryEmpty />}
      showLoaderDuringRefetch={false}
    >
      {({ data }) => {
        const isBinance = data?.walletType === Provider.binance;
        const binanceCaption = t(PROVIDERS[Provider.binance].caption);
        const walletIcon = isBinance ? binanceLogo : data?.walletIcon;
        const walletName = isBinance ? binanceCaption : data?.walletName;

        return (
          <HeaderComponent
            isAuth={isAuth}
            walletAddress={data?.address}
            blockchainType={data?.blockchainType}
            walletName={walletName}
            walletIcon={walletIcon}
            walletType={data?.walletType}
            ethereumBalance={data?.ethereumBalance}
            ankrBalance={data?.ankrBalance}
            bnbBalance={data?.bnbBalance}
          />
        );
      }}
    </Query>
  );

  const notAuthorized = <HeaderComponent isAuth={isAuth} />;

  return isAuth ? authorized : notAuthorized;
};

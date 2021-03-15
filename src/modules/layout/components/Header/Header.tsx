import { useQuery } from '@redux-requests/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Provider } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';
import { binance as binanceLogo } from '../assets/assets';
import { PROVIDERS } from '../const';
import { HeaderComponent } from './HeaderComponent';

export const Header = () => {
  const isAuth = useSelector((state: IStoreState) => isConnected(state.user));

  const { data, error } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const isBinance = data?.walletType === Provider.binance;
  const binanceCaption = t(PROVIDERS[Provider.binance].caption);
  const walletIcon = isBinance ? binanceLogo : data?.walletIcon;
  const walletName = isBinance ? binanceCaption : data?.walletName;

  const authorized = (
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

  const notAuthorized = <HeaderComponent isAuth={isAuth} />;

  if (error) {
    return <QueryError error={error} />;
  }

  return isAuth ? authorized : notAuthorized;
};

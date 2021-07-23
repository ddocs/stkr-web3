import { useQuery } from '@redux-requests/react';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Provider,
  SupportedBlockchainNetworkId,
} from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { UserActionTypes } from '../../../../store/actions/UserActions';
import { IStakerStats } from '../../../../store/apiMappers/stakerStatsApi';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { IStoreState } from '../../../../store/reducers';
import { binance as binanceLogo } from '../assets/assets';
import { PROVIDERS } from '../const';
import { HeaderComponent } from './HeaderComponent';

export const Header = () => {
  const { isConnected: isAuth, chainId } = useSelector(
    (state: IStoreState) => state.user,
  );

  const isSupportedNetwork =
    chainId !== undefined
      ? SupportedBlockchainNetworkId.includes(chainId)
      : false;

  const { data, error } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const stakerStatsQuery = useQuery<IStakerStats | null>({
    type: UserActionTypes.FETCH_STAKER_STATS,
  });

  const isBinance = data?.walletType === Provider.binance;
  const binanceCaption = t(PROVIDERS[Provider.binance].caption);
  const walletIcon = isBinance ? binanceLogo : data?.walletIcon;
  const walletName = isBinance ? binanceCaption : data?.walletName;

  const authorized = (
    <HeaderComponent
      isAuth={isSupportedNetwork && isAuth}
      walletAddress={data?.address}
      blockchainType={data?.blockchainType}
      walletName={walletName}
      walletIcon={walletIcon}
      walletType={data?.walletType}
      ethereumBalance={data?.ethereumBalance}
      ankrBalance={data?.ankrBalance}
      bnbBalance={data?.bnbBalance}
      aEthBalance={stakerStatsQuery.data?.aEthBalance}
    />
  );

  const notAuthorized = <HeaderComponent isAuth={isAuth} />;

  if (error && isSupportedNetwork) {
    return <QueryError error={error} />;
  }

  return isAuth ? authorized : notAuthorized;
};

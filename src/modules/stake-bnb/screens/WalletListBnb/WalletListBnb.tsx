import { Box, Typography } from '@material-ui/core';
import { Query, useQuery } from '@redux-requests/react';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { uid } from 'react-uid';
import { getStakerDashboardBnbPath } from '../../../../common/const';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { t } from '../../../../common/utils/intl';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { StakeBnbActions } from '../../actions/StakeBnbActions';
import { IBnbAccount } from '../../api/binanceWalletApi';
import { HeadedPaper } from '../../components/HeadedPaper';
import { WalletListItem } from './components/WalletListItem';
import { useWalletListBnbStyles } from './WalletListStyles';

export const WalletListBnb = () => {
  const classes = useWalletListBnbStyles();
  const dispatch = useRequestDispatch();
  const { data: connectData } = useQuery({
    type: StakeBnbActions.connect.toString(),
  });

  useInitEffect(() => {
    dispatch(StakeBnbActions.connect());
  });

  if (!connectData) {
    return (
      <Box margin="auto">
        <Typography variant="h2">
          {t('staker-bnb-dashboard.loading-text')}
        </Typography>
      </Box>
    );
  }

  return (
    <Query<IBnbAccount[]>
      type={StakeBnbActions.connect.toString()}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      showLoaderDuringRefetch={false}
    >
      {({ data }) => (
        <HeadedPaper
          title={t('wallet-list.title')}
          subtitle={t('wallet-list.subtitle')}
          key={uid(data)}
        >
          {data.map(item => (
            <RouterLink
              key={item.id}
              to={getStakerDashboardBnbPath(item.id)}
              className={classes.walletListItem}
            >
              <WalletListItem
                name={item.name}
                address={
                  item.addresses.find(
                    addressItem => addressItem.type === 'bbc-mainnet',
                  )?.address ?? ''
                }
              />
            </RouterLink>
          ))}
        </HeadedPaper>
      )}
    </Query>
  );
};

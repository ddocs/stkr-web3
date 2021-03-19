import * as React from 'react';
import { useWalletListBnbStyles } from './WalletListStyles';
import { Box, Typography } from '@material-ui/core';
import { t } from '../../../../common/utils/intl';
import { WalletListItem } from './components/WalletListItem';
import { Query, useQuery } from '@redux-requests/react';
import { StakeBnbActions } from '../../actions/StakeBnbActions';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { IBnbAccount } from '../../api/binanceWalletApi';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { Link as RouterLink } from 'react-router-dom';
import { getStakerDashboardBnbPath } from '../../../../common/const';
import { HeadedPaper } from '../../components/HeadedPaper';
import { uid } from 'react-uid';

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

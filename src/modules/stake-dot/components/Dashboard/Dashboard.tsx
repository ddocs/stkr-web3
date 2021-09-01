import React from 'react';
import { Query } from '@redux-requests/react';
import { Box, Button } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { Balance } from '../Balance';
import { Claim } from '../Claim';
import { StakeDialog } from '../StakeDialog';
import { t } from '../../../../common/utils/intl';
import { IStakerStats } from '../../../stake-avax/api/types';
import { Spinner } from '../../../../components/Spinner';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import { Headline2 } from '../../../../UiKit/Typography';
import { usePolkadotProvider } from '../../hooks/usePolkadotProvider';
import { useDashboardStyles } from './DashboardStyles';
import {
  IPolkadotConnected,
  PolkadotProviderActions,
} from '../../actions/PolkadotProviderActions';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { PolkadotAccountSwitcher } from '../PolkadotAccountSwitcher';

export interface IDashboardProps {
  isConnected: boolean;
}

export const Dashboard = ({ isConnected }: IDashboardProps) => {
  const classes = useDashboardStyles();

  const { handleConnect } = usePolkadotProvider('wnd');

  const stakingInProgress = false;
  const showStaking = true;
  const stakerStats: IStakerStats = {
    balance: new BigNumber(2),
    claimAvailable: new BigNumber(1),
    history: [],
  };

  return (
    <Query<IPolkadotConnected>
      type={PolkadotProviderActions.connect}
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
    >
      {({ data }) => (
        <section className={classes.root}>
          <Box>
            <Box className={classes.header}>
              <Box display="flex">
                <Headline2>{t('stake-dot.dashboard.dot-staking')}</Headline2>
                <StakeDialog>
                  <Button
                    size="large"
                    color="secondary"
                    variant="outlined"
                    className={classes.buttonStake}
                  >
                    <PlusIcon />
                    {stakingInProgress ? (
                      <Spinner size={32} />
                    ) : (
                      t('stake-dot.dashboard.stake-dot')
                    )}
                  </Button>
                </StakeDialog>
              </Box>

              <PolkadotAccountSwitcher
                wallets={data.polkadotAccounts}
                currentWallet={data.currentPolkadotAccount}
                onConnect={handleConnect}
              />
            </Box>
          </Box>
          {isConnected && (
            <Box display="flex" flexDirection="column">
              {showStaking && stakerStats && (
                <div className={classes.stats}>
                  {stakerStats.claimAvailable && (
                    <Claim amount={stakerStats.claimAvailable} />
                  )}
                  <Balance amount={stakerStats.balance} />
                </div>
              )}
            </Box>
          )}
        </section>
      )}
    </Query>
  );
};

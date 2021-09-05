import { Box, Grid, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { IStakerStats } from '../../../stake-avax/api/types';
import { usePolkadotProvider } from '../../hooks/usePolkadotProvider';
import { ParachainNetwork } from '../../types/ParachainNetwork';
import { Balance } from '../Balance';
import { Claim } from '../Claim';
import { PolkadotAccountSwitcher } from '../PolkadotAccountSwitcher';
import { StakeBtn } from '../StakeBtn';
import { useDashboardStyles } from './DashboardStyles';

// todo: remove hardcode
const useDemo = () => {
  const showStaking = true;
  const stakerStats: IStakerStats = {
    balance: new BigNumber(2),
    claimAvailable: new BigNumber(0),
    history: [],
  };

  return {
    showStaking,
    stakerStats,
  };
};

export interface IDashboardProps {
  isConnected: boolean;
}

export const Dashboard = ({ isConnected }: IDashboardProps) => {
  const classes = useDashboardStyles();
  const { showStaking, stakerStats } = useDemo();
  usePolkadotProvider(ParachainNetwork.WND);

  return (
    <section className={classes.root}>
      <Curtains>
        <div className={classes.header}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm="auto">
              <Typography variant="h3">
                {t('stake-dot.dashboard.dot-staking')}
              </Typography>
            </Grid>

            <Grid item xs={12} sm>
              <StakeBtn />
            </Grid>

            <Grid item xs={12} sm="auto">
              <PolkadotAccountSwitcher />
            </Grid>
          </Grid>
        </div>

        {isConnected && showStaking && stakerStats && (
          <Box display="flex" flexDirection="column">
            <div className={classes.stats}>
              {stakerStats.claimAvailable && (
                <Claim amount={stakerStats.claimAvailable} />
              )}
              <Balance amount={stakerStats.balance} />
            </div>
          </Box>
        )}
      </Curtains>
    </section>
  );
};

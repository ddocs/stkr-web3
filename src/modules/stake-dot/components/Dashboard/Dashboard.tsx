import React from 'react';
import { Box, Button } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { Balance } from '../Balance';
import { Claim } from '../Claim';
import { StakeDialog } from '../StakeDialog';
import { t } from '../../../../common/utils/intl';
import { IStakerStats } from '../../../avalanche-sdk/types';
import { Spinner } from '../../../../components/Spinner';
import { HistoryTable } from '../../../../components/HistoryTable';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import { Headline2 } from '../../../../UiKit/Typography';

import { useDashboardStyles as useStakeAvaxDashboardComponentStyles } from './DashboardStyles';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';

export interface IDashboardProps {
  isConnected: boolean;
}

export const Dashboard = ({ isConnected }: IDashboardProps) => {
  const classes = useStakeAvaxDashboardComponentStyles();
  const step = useSelector((state: IStoreState) => {
    return state.polkadot.step;
  });

  const stakingHistoryData: Record<string, unknown>[] = [];
  const stakingInProgress = false;
  const showStaking = true;
  const stakerStats: IStakerStats = {
    balance: new BigNumber(2),
    claimAvailable: new BigNumber(1),
    history: [],
  };

  return (
    <section className={classes.root}>
      <Box>
        <Box className={classes.header}>
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
      </Box>
      {isConnected && (
        <Box display="flex" flexDirection="column">
          {showStaking && stakerStats && (
            <div className={classes.stats}>
              {stakerStats.claimAvailable && (
                <Claim amount={stakerStats.claimAvailable} />
              )}
              <Balance
                amount={stakerStats.balance}
                isConnected={step === 'connection'}
              />
            </div>
          )}
        </Box>
      )}
      {stakingHistoryData.length > 0 && (
        <HistoryTable data={stakingHistoryData} unitName="dot" />
      )}
    </section>
  );
};

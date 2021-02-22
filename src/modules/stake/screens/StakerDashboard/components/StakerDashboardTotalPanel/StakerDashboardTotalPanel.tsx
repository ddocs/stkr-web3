import React from 'react';

import {
  Button,
  IconButton,
  Paper,
  StyledComponentProps,
} from '@material-ui/core';
import { t, tHTML } from '../../../../../../common/utils/intl';
import { ClaimDialog } from '../ClaimDialog';
import { Link as RouterLink } from 'react-router-dom';
import { STAKER_STAKE_PATH } from '../../../../../../common/const';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import BigNumber from 'bignumber.js';
import { useStakerDashboardTotalPanelStyles } from './StakerDahsboardTotalPanelStyles';
import { DECIMAL_PLACES } from '../../StakerDashboardConst';

interface IStakerDashboardTotalPanelProps extends StyledComponentProps {
  claimableAETHRewardOf: BigNumber;
  claimableAETHFRewardOf: BigNumber;
  children?: React.ReactChild;
  isClaimAvailable: boolean;
}

export const StakerDashboardTotalPanel = ({
  claimableAETHFRewardOf,
  claimableAETHRewardOf,
  children,
  isClaimAvailable,
}: IStakerDashboardTotalPanelProps) => {
  const classes = useStakerDashboardTotalPanelStyles();

  return (
    <Paper variant="outlined" square={false} className={classes.stakedContent}>
      <div className={classes.row}>
        <div className={classes.title}>
          {isClaimAvailable
            ? t('staker-dashboard.staked')
            : t('staker-dashboard.stake')}
        </div>
        <div className={classes.buttonContainer}>
          <RouterLink to={STAKER_STAKE_PATH}>
            <IconButton
              className={classes.stake}
              title={t('staker-dashboard.stake-more')}
            >
              <PlusIcon />
            </IconButton>
          </RouterLink>
        </div>
      </div>
      {isClaimAvailable && (
        <div className={classes.bottomRow}>
          <div className={classes.row}>
            <div className={classes.amount}>
              {tHTML('unit.separated-eth-value', {
                value: claimableAETHFRewardOf.decimalPlaces(DECIMAL_PLACES),
              })}
              {isClaimAvailable && (
                <ClaimDialog
                  aETHBalance={claimableAETHRewardOf}
                  fETHBalance={claimableAETHFRewardOf}
                >
                  <Button
                    size="large"
                    color="secondary"
                    variant="outlined"
                    className={classes.claim}
                    disabled={
                      claimableAETHFRewardOf.isLessThanOrEqualTo(0) &&
                      claimableAETHRewardOf.isLessThanOrEqualTo(0)
                    }
                  >
                    {t('staker-dashboard.claim')}
                  </Button>
                </ClaimDialog>
              )}
            </div>
          </div>
          {children && (
            <div className={classes.childrenContainer}>{children}</div>
          )}
        </div>
      )}
    </Paper>
  );
};

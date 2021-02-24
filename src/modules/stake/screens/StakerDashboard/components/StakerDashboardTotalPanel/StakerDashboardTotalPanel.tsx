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
import { useFeaturesAvailable } from '../../../../../../common/hooks/useFeaturesAvailable';

interface IStakerDashboardTotalPanelProps extends StyledComponentProps {
  claimableAETHRewardOf: BigNumber;
  claimableFETHRewardOf: BigNumber;
  children?: React.ReactChild;
  isClaimAvailable: boolean;
}

export const StakerDashboardTotalPanel = ({
  claimableFETHRewardOf,
  claimableAETHRewardOf,
  children,
  isClaimAvailable,
}: IStakerDashboardTotalPanelProps) => {
  const classes = useStakerDashboardTotalPanelStyles();

  const { isAEthClaimAlwaysAvailable } = useFeaturesAvailable();

  const canClaim =
    claimableFETHRewardOf.isGreaterThan(0) ||
    claimableAETHRewardOf.isGreaterThan(0);

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
      {
        <div className={classes.bottomRow}>
          <div className={classes.row}>
            <div className={classes.amount}>
              {!isAEthClaimAlwaysAvailable &&
                tHTML('unit.separated-eth-value', {
                  value: claimableFETHRewardOf.decimalPlaces(DECIMAL_PLACES),
                })}
              {
                <ClaimDialog
                  aETHBalance={claimableAETHRewardOf}
                  fETHBalance={claimableFETHRewardOf}
                >
                  <Button
                    size="large"
                    color="secondary"
                    variant="outlined"
                    className={classes.claim}
                    disabled={canClaim && !isAEthClaimAlwaysAvailable}
                  >
                    {t('staker-dashboard.claim')}
                  </Button>
                </ClaimDialog>
              }
            </div>
          </div>
          {children && (
            <div className={classes.childrenContainer}>{children}</div>
          )}
        </div>
      }
    </Paper>
  );
};

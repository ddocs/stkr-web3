import React from 'react';
import { Button, ButtonGroup, StyledComponentProps } from '@material-ui/core';
import { t } from '../../../../../../common/utils/intl';
import { ReactComponent as PendingIcon } from '../../assets/pending.svg';
import BigNumber from 'bignumber.js';
import { useStakerDashboardStakingLabelStyles } from './StakingDashboardStakingLabelStyles';

interface IStakerDashboardTotalPanelProps extends StyledComponentProps {
  pending: BigNumber;
}

export const StakerDashboardStakingLabel = ({
  pending,
}: IStakerDashboardTotalPanelProps) => {
  const classes = useStakerDashboardStakingLabelStyles();
  return (
    <>
      {pending.isGreaterThan(0) ? (
        <ButtonGroup className={classes.buttonGroup}>
          {pending.isGreaterThan(0) && (
            <Button
              size="small"
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.pending}
            >
              <PendingIcon className={classes.pendingIcon} />
              {t('staker-dashboard.pending', {
                value: pending.toFormat(),
              })}
            </Button>
          )}
        </ButtonGroup>
      ) : (
        <div />
      )}
    </>
  );
};

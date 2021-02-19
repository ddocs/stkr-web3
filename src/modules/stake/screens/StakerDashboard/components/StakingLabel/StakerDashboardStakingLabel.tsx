import React from 'react';

import { Button, ButtonGroup, StyledComponentProps } from '@material-ui/core';
import { t } from '../../../../../../common/utils/intl';
import { MutationErrorHandler } from '../../../../../../components/MutationErrorHandler/MutationErrorHandler';
import { UserActionTypes } from '../../../../../../store/actions/UserActions';
import { Mutation } from '@redux-requests/react';
import { ReactComponent as PendingIcon } from '../../assets/pending.svg';
import BigNumber from 'bignumber.js';
import { useStakerDashboardStakingLabelStyles } from './StakingDashboardStakingLabelStyles';

interface IStakerDashboardTotalPanelProps extends StyledComponentProps {
  pending: BigNumber;
  onUnstake: () => void;
}

export const StakerDashboardStakingLabel = ({
  onUnstake,
  pending,
}: IStakerDashboardTotalPanelProps) => {
  const classes = useStakerDashboardStakingLabelStyles();
  return (
    <>
      <MutationErrorHandler type={UserActionTypes.UNSTAKE} />
      {pending.isGreaterThan(0) ? (
        <Mutation type={UserActionTypes.UNSTAKE}>
          {({ loading }) => (
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
              <Button
                size="small"
                onClick={onUnstake}
                disabled={loading}
                variant="contained"
                color="secondary"
                className={classes.unstake}
                disableElevation
              >
                {t('staker-dashboard.unstake')}
              </Button>
            </ButtonGroup>
          )}
        </Mutation>
      ) : (
        <div />
      )}
    </>
  );
};

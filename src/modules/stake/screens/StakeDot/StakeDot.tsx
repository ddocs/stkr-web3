import { Box, IconButton, Tooltip } from '@material-ui/core';
import { success } from '@redux-requests/core';
import { useMutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { FEATURES_PATH, STAKER_RATE } from '../../../../common/const';
import { useFeaturesAvailable } from '../../../../common/hooks/useFeaturesAvailable';
import { t, tHTML } from '../../../../common/utils/intl';
import { pushEvent } from '../../../../common/utils/pushEvent';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IGlobalStats } from '../../../../store/apiMappers/globalStatsApi';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { StakeDescriptionContainer } from '../../components/StakeDescriptionContainer';
import { StakeDescriptionName } from '../../components/StakeDescriptionName';
import { StakeDescriptionValue } from '../../components/StakeDescriptionValue';
import {
  IStakePayload,
  MAX_AMOUNT,
  StakeForm,
} from '../../components/StakeForm';
import { DECIMAL_PLACES } from '../StakerDashboard/StakerDashboardConst';

const FIXED_DECIMAL_PLACES = 2;

export interface IStakeDotProps {
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const StakeDot = ({ onSubmit, onCancel }: IStakeDotProps) => {
  const dispatch = useRequestDispatch();
  const { replace } = useHistory();

  const handleSubmit = ({ amount }: IStakePayload) => {
    dispatch(UserActions.stakeDot(amount.toString(10))).then(data => {
      if (data.action.type === success(UserActionTypes.STAKE_DOT)) {
        replace(FEATURES_PATH);
      }
    });
    if (onSubmit) {
      onSubmit();
    }

    pushEvent('stake_dot_submit', { stakingAmount: amount });
  };

  const { data: userInfo } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const { data: globalStats } = useQuery<IGlobalStats | null>({
    type: UserActionTypes.FETCH_GLOBAL_STATS,
  });

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const yearlyInterest =
    globalStats && globalStats.currentApr
      ? globalStats.currentApr * STAKER_RATE
      : 0;

  const { stakingFeeRate, stakingAmountStep } = useFeaturesAvailable();

  const { loading } = useMutation({ type: UserActionTypes.STAKE });

  const renderStats = useCallback(
    (amount: number) => {
      return (
        <StakeDescriptionContainer>
          {stakingFeeRate && !stakingFeeRate.isZero() && (
            <>
              <StakeDescriptionName>
                {t('stake.operation-fee')}

                <Tooltip title={t('stake.operation-fee-tooltip')}>
                  <Box component={IconButton} padding={1}>
                    <QuestionIcon size="xs" />
                  </Box>
                </Tooltip>
              </StakeDescriptionName>

              <StakeDescriptionValue>
                {t('~dot-value', {
                  value: stakingFeeRate
                    .multipliedBy(amount / MAX_AMOUNT)
                    .decimalPlaces(DECIMAL_PLACES)
                    .toNumber(),
                })}
              </StakeDescriptionValue>
            </>
          )}

          <StakeDescriptionName>
            {t('stake.yearly-earning')}

            <Tooltip title={tHTML('stake.yearly-earning-tooltip')}>
              <Box component={IconButton} padding={1}>
                <QuestionIcon size="xs" />
              </Box>
            </Tooltip>
          </StakeDescriptionName>

          <StakeDescriptionValue>
            {t('unit.~dot-value', {
              value: new BigNumber(amount)
                .multipliedBy(yearlyInterest)
                .decimalPlaces(FIXED_DECIMAL_PLACES),
            })}
          </StakeDescriptionValue>
        </StakeDescriptionContainer>
      );
    },
    [stakingFeeRate, yearlyInterest],
  );

  return (
    <StakeForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      balance={userInfo?.dotBalance}
      stakingAmountStep={stakingAmountStep}
      currency={t('unit.dot')}
      loading={loading}
      renderStats={renderStats}
      stakeInfo={t('stake.info-dot')}
    />
  );
};

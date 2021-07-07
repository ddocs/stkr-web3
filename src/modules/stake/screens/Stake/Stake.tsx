import { success } from '@redux-requests/core';
import { useMutation, useQuery } from '@redux-requests/react';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { STAKER_DASHBOARD_PATH, STAKER_RATE } from '../../../../common/const';
import { useFeaturesAvailable } from '../../../../common/hooks/useFeaturesAvailable';
import { pushEvent } from '../../../../common/utils/pushEvent';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import {
  IStakePayload,
  MAX_AMOUNT,
  StakeForm,
} from '../../components/StakeForm';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { t, tHTML } from '../../../../common/utils/intl';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { StakeDescriptionContainer } from '../../components/StakeDescriptionContainer';
import { StakeDescriptionName } from '../../components/StakeDescriptionName';
import { StakeDescriptionValue } from '../../components/StakeDescriptionValue';
import { DECIMAL_PLACES } from '../StakerDashboard/StakerDashboardConst';
import { IGlobalStats } from '../../../../store/apiMappers/globalStatsApi';

export const Stake = () => {
  const dispatch = useRequestDispatch();
  const { replace, push } = useHistory();

  const handleSubmit = ({ amount }: IStakePayload) => {
    dispatch(UserActions.stake(amount.toString(10))).then(data => {
      if (data.action.type === success(UserActionTypes.STAKE)) {
        replace(STAKER_DASHBOARD_PATH);
      }
    });

    pushEvent('stake_submit', { stakingAmount: amount });
  };

  const { data: userInfo } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const handleCancel = useCallback(() => {
    push(STAKER_DASHBOARD_PATH);
  }, [push]);

  const { data: globalStats } = useQuery<IGlobalStats | null>({
    type: UserActionTypes.FETCH_GLOBAL_STATS,
  });

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
                {t('unit.~eth-value', {
                  value: stakingFeeRate
                    .multipliedBy(amount / MAX_AMOUNT)
                    .decimalPlaces(DECIMAL_PLACES)
                    .toNumber(),
                })}
              </StakeDescriptionValue>
            </>
          )}
          {yearlyInterest ? (
            <>
              <StakeDescriptionName>
                {t('stake.yearly-earning')}

                <Tooltip title={tHTML('stake.yearly-earning-tooltip')}>
                  <Box component={IconButton} padding={1}>
                    <QuestionIcon size="xs" />
                  </Box>
                </Tooltip>
              </StakeDescriptionName>

              <StakeDescriptionValue>
                {t('unit.~eth-value', {
                  value: new BigNumber(amount)
                    .multipliedBy(yearlyInterest)
                    .decimalPlaces(2),
                })}
              </StakeDescriptionValue>
            </>
          ) : null}
        </StakeDescriptionContainer>
      );
    },
    [stakingFeeRate, yearlyInterest],
  );

  return (
    <StakeForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      balance={userInfo?.ethereumBalance}
      stakingAmountStep={stakingAmountStep}
      loading={loading}
      renderStats={renderStats}
    />
  );
};

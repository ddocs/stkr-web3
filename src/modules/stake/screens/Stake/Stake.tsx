import { success } from '@redux-requests/core';
import { useMutation, useQuery } from '@redux-requests/react';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { STAKER_PATH } from '../../../../common/const';
import { useFeaturesAvailable } from '../../../../common/hooks/useFeaturesAvailable';
import { pushEvent } from '../../../../common/utils/pushEvent';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { IStakePayload, StakeForm } from '../../components/StakeForm';

export const Stake = () => {
  const dispatch = useRequestDispatch();
  const { replace, push } = useHistory();

  const handleSubmit = ({ amount }: IStakePayload) => {
    dispatch(UserActions.stake(amount.toString(10))).then(data => {
      if (data.action.type === success(UserActionTypes.STAKE)) {
        replace(STAKER_PATH);
      }
    });

    pushEvent('stake_submit', { stakingAmount: amount });
  };

  const { data: userInfo } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const handleCancel = useCallback(() => {
    push(STAKER_PATH);
  }, [push]);

  const { stakingAmountStep } = useFeaturesAvailable();

  const { loading } = useMutation({ type: UserActionTypes.STAKE });

  return (
    <StakeForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      balance={userInfo?.ethereumBalance}
      stakingAmountStep={stakingAmountStep}
      loading={loading}
    />
  );
};

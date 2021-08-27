import { useQuery } from '@redux-requests/react';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { IStakerStats } from '../../api/types';
import { PlusMinusBtn } from '../PlusMinusBtn';
import { UnstakeDialog } from '../UnstakeDialog';
import { useUnstake } from './useUnstake';

interface IUnstakeBtnProps {
  className?: string;
}

export const UnstakeBtn = ({ className }: IUnstakeBtnProps) => {
  const {
    endDate,
    onSubmit: onUnstakeSubmit,
    isOpened,
    onClose,
    onOpen,
    isLoading: unstakeLoading,
  } = useUnstake();

  const { data: stakerStats, loading: stakerStatsLoading } =
    useQuery<IStakerStats | null>({
      type: AvalancheActions.fetchStakerStats.toString(),
    });

  return (
    <>
      <PlusMinusBtn
        onClick={onOpen}
        tooltip={t('stake-avax.unstake.btn')}
        icon="minus"
        className={className}
        isLoading={unstakeLoading}
      />

      <MutationErrorHandler type={AvalancheActions.claimAvax.toString()} />

      <UnstakeDialog
        isOpened={isOpened}
        isBalanceLoading={stakerStatsLoading}
        isLoading={unstakeLoading}
        submitDisabled={unstakeLoading}
        balance={stakerStats?.claimAvailable}
        onClose={onClose}
        onSubmit={onUnstakeSubmit}
        endDate={endDate}
      />
    </>
  );
};

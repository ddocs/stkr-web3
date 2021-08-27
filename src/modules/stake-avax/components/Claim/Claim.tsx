import { useQuery } from '@redux-requests/react';
import React from 'react';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { IStakerStats } from '../../api/types';
import { ClaimDialog } from '../ClaimDialog';
import { ClaimForm } from '../ClaimForm';
import { UnstakeDialog } from '../UnstakeDialog';
import { UnstakeSuccessDialog } from '../UnstakeSuccessDialog';
import { ClaimComponent } from './ClaimComponent';
import { useClaim } from './useClaim';
import { useUnstake } from './useUnstake';

export const Claim = () => {
  const {
    isOpened: isClaimDialogOpened,
    onClose: onClaimDialogClose,
    onOpen: onClaimDialogOpen,
    onSubmit: onClaimSubmit,
    loading: claimLoading,
  } = useClaim();

  const {
    maxTimeLeft,
    onSubmit: onUnstakeSubmit,
    isOpened: isUnstakeDialogOpened,
    onClose: onUnstakeDialogClose,
    onOpen: onUnstakeDialogOpen,
    isLoading: unstakeLoading,
    isSuccessOpened,
    onSuccessClose,
  } = useUnstake();

  const { data: stakerStats, loading: stakerStatsLoading } =
    useQuery<IStakerStats | null>({
      type: AvalancheActions.fetchStakerStats.toString(),
    });

  if (!stakerStats) {
    return null;
  }

  return (
    <>
      <MutationErrorHandler
        type={AvalancheActions.depositToAvalancheBridge.toString()}
      />

      <ClaimComponent
        amount={stakerStats.claimAvailable}
        claimLoading={claimLoading}
        onClaimClick={onClaimDialogOpen}
        onUnstakeClick={onUnstakeDialogOpen}
      />

      <ClaimDialog isOpened={isClaimDialogOpened} onClose={onClaimDialogClose}>
        <ClaimForm
          loading={claimLoading}
          amount={stakerStats.claimAvailable}
          onSubmit={onClaimSubmit}
        />
      </ClaimDialog>

      <UnstakeDialog
        isOpened={isUnstakeDialogOpened}
        isBalanceLoading={stakerStatsLoading}
        isLoading={unstakeLoading}
        submitDisabled={unstakeLoading}
        balance={stakerStats.claimAvailable}
        onClose={onUnstakeDialogClose}
        onSubmit={onUnstakeSubmit}
        maxTimeLeft={maxTimeLeft}
      />

      <UnstakeSuccessDialog
        isOpened={isSuccessOpened}
        onClose={onSuccessClose}
        maxTimeLeft={maxTimeLeft}
      />
    </>
  );
};

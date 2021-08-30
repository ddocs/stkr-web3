import { useQuery } from '@redux-requests/react';
import React from 'react';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { IStakerStats } from '../../api/types';
import { ClaimDialog } from '../ClaimDialog';
import { ClaimForm } from '../ClaimForm';
import { StakeBtn } from '../StakeBtn';
import { StakingAPY } from '../StakingAPY';
import { UnstakeBtn } from '../UnstakeBtn';
import { ClaimComponent } from './ClaimComponent';
import { useClaim } from './useClaim';

export const Claim = () => {
  const {
    isOpened: isClaimDialogOpened,
    onClose: onClaimDialogClose,
    onOpen: onClaimDialogOpen,
    onSubmit: onClaimSubmit,
    loading: claimLoading,
  } = useClaim();

  const { data: stakerStats } = useQuery<IStakerStats | null>({
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
        apyInfo={<StakingAPY />}
        stakeBtn={<StakeBtn />}
        unstakeBtn={<UnstakeBtn />}
      />

      <ClaimDialog isOpened={isClaimDialogOpened} onClose={onClaimDialogClose}>
        <ClaimForm
          loading={claimLoading}
          amount={stakerStats.claimAvailable}
          onSubmit={onClaimSubmit}
        />
      </ClaimDialog>
    </>
  );
};

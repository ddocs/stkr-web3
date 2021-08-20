import { useQuery } from '@redux-requests/react';
import React from 'react';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { IClaimStats } from '../../api/types';
import { ConvertDialog } from '../ConvertDialog';
import { ConvertComponent } from './ConvertComponent';
import { useConvertDialog } from './useConvertDialog';

export const Convert = () => {
  const { data: claimStats, loading: claimStatsLoading } =
    useQuery<IClaimStats | null>({
      type: AvalancheActions.fetchClaimStats.toString(),
    });

  const {
    isOpened: isConvertDialogOpened,
    onClose: onConvertDialogClose,
    onOpen: onConvertDialogOpen,
    onSubmit: onConvertSubmit,
    isLoading: ConvertLoading,
  } = useConvertDialog();

  return (
    <>
      <ConvertComponent
        amount={claimStats?.balance}
        onClick={onConvertDialogOpen}
        isLoading={ConvertLoading}
      />

      <ConvertDialog
        isOpened={isConvertDialogOpened}
        isBalanceLoading={claimStatsLoading}
        isLoading={ConvertLoading}
        submitDisabled={ConvertLoading}
        balance={claimStats?.balance}
        onClose={onConvertDialogClose}
        onSubmit={onConvertSubmit}
      />
    </>
  );
};

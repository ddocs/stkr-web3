import { useMemo } from 'react';
import { StkrSdk } from '../../api';
import { StakingStep } from '../../avalanche-sdk/types';
import { getStakingSession } from '../../avalanche-sdk/utils';

export const useClaimState = () => {
  const session = useMemo(() => getStakingSession(), []);
  const stkrSdk = useMemo(() => StkrSdk.getForEnv(), []);

  const isValidRecipient = stkrSdk.currentAccount() === session?.recipient;

  return {
    isPendingClaim: session?.nextStep === StakingStep.WithdrawAAvaxB,
    isInProgress: session?.inProgress,
    isValidRecipient,
    recipient: session?.recipient,
  };
};

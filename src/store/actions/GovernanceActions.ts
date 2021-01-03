import { StkrSdk } from '../../modules/api';
import { SendOptions } from 'web3-eth-contract';

export const GovernanceActionTypes = {
  VOTE: 'VOTE',
  PROPOSE: 'PROPOSE',
  PROPOSAL: 'PROPOSAL',
};

export const GovernanceActions = {
  vote: (proposalId: string, vote: string, options?: SendOptions) => ({
    type: GovernanceActionTypes.VOTE,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.vote(proposalId, vote, options);
      },
    },
  }),
  propose: (
    timeSpan: number,
    topic: string,
    content: string,
    options?: SendOptions,
  ) => ({
    type: GovernanceActionTypes.PROPOSE,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.propose(timeSpan, topic, content, options);
      },
    },
  }),
  proposal: () => ({
    type: GovernanceActionTypes.PROPOSAL,
    request: {
      promise: async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.proposal();
      },
    },
  }),
};

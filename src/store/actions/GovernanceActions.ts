import { StkrSdk } from '../../modules/api';
import { SendOptions } from 'web3-eth-contract';

export const GovernanceActionTypes = {
  VOTE: 'VOTE',
  FETCH_PROJECTS: 'FETCH_PROJECTS',
  CREATE_PROJECT: 'CREATE_PROJECT',
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
  fetchProjects: () => ({
    type: GovernanceActionTypes.FETCH_PROJECTS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.fetchProjects();
      })(),
    },
  }),
  createProject: (timeSpan: number, topic: string, content: string) => ({
    type: GovernanceActionTypes.CREATE_PROJECT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.createProject(timeSpan, topic, content, {
          from: stkrSdk.getKeyProvider().currentAccount(),
        });
      })(),
    },
  }),
};

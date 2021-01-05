import { StkrSdk } from '../../modules/api';
import { SendOptions } from 'web3-eth-contract';
import { MIN_GOVERNANCE_AMOUNT } from '../../common/const';
import { mapProject } from '../../modules/governance/types';
import { VoteStatus } from '@ankr.com/stkr-jssdk';

export const GovernanceActionTypes = {
  VOTE: 'VOTE',
  FETCH_PROJECTS: 'FETCH_PROJECTS',
  CREATE_PROJECT: 'CREATE_PROJECT',
};

export const GovernanceActions = {
  vote: (
    proposalId: string,
    vote: VoteStatus,
    options?: Partial<SendOptions>,
  ) => ({
    type: GovernanceActionTypes.VOTE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        const currentAccount = stkrSdk.getKeyProvider().currentAccount();
        return await stkrSdk.vote(proposalId, vote, {
          ...options,
          from: currentAccount,
        });
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  fetchProjects: () => ({
    type: GovernanceActionTypes.FETCH_PROJECTS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        const projects = await stkrSdk.fetchProjects();

        console.log('projects', projects);

        const data = await Promise.all(
          projects.map(item =>
            stkrSdk.getProposalInfo(item.returnValues.proposeID),
          ),
        );

        return { projects, data };
      })(),
    },
    meta: {
      getData: mapProject,
    },
  }),
  createProject: (timeSpan: number, topic: string, content: string) => ({
    type: GovernanceActionTypes.CREATE_PROJECT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        const currentAccount = stkrSdk.getKeyProvider().currentAccount();
        await stkrSdk.setAnkrAllowance(MIN_GOVERNANCE_AMOUNT, {
          from: currentAccount,
        });
        return await stkrSdk.createProject(timeSpan, topic, content, {
          from: currentAccount,
        });
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
};

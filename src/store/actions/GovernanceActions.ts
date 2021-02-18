import { StkrSdk } from '../../modules/api';
import { MIN_GOVERNANCE_AMOUNT } from '../../common/const';
import { mapProject } from '../../modules/governance/types';
import { VoteStatus } from '@ankr.com/stkr-jssdk';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';

export const GovernanceActionTypes = {
  VOTE: 'VOTE',
  FETCH_PROJECTS: 'FETCH_PROJECTS',
  CREATE_PROJECT: 'CREATE_PROJECT',
  GET_ANKR_GOVERNANCE_ALLOWANCE: 'GET_ANKR_GOVERNANCE_ALLOWANCE',
};

export const GovernanceActions = {
  vote: (proposalId: string, vote: VoteStatus, amount: string) => ({
    type: GovernanceActionTypes.VOTE,
    request: {
      promise: (async function () {
        const weiAmount = Web3.utils.toWei(amount);
        const stkrSdk = StkrSdk.getForEnv();
        const allowance = await stkrSdk.getAnkrGovernanceAllowance(
          stkrSdk.getKeyProvider().currentAccount(),
        );

        const currentAccount = stkrSdk.getKeyProvider().currentAccount();

        if (!new BigNumber(allowance).isEqualTo(weiAmount)) {
          await stkrSdk.setAnkrAllowance(weiAmount, {
            from: currentAccount,
          });
        }

        return await stkrSdk.vote(proposalId, vote, {
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
        const stkrSdk = StkrSdk.getForEnv();
        const projects = await stkrSdk.fetchProjects();

        const data = await Promise.all(
          projects.map((item: any) =>
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
        const stkrSdk = StkrSdk.getForEnv();
        const currentAccount = stkrSdk.getKeyProvider().currentAccount();

        const allowance = await stkrSdk.getAnkrGovernanceAllowance(
          stkrSdk.getKeyProvider().currentAccount(),
        );

        if (new BigNumber(allowance).isLessThan(MIN_GOVERNANCE_AMOUNT)) {
          await stkrSdk.setAnkrAllowance(MIN_GOVERNANCE_AMOUNT, {
            from: currentAccount,
          });
        }

        return await stkrSdk.createProject(timeSpan, topic, content, {
          from: currentAccount,
        });
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  getAnkrGovernanceAllowance: () => ({
    type: GovernanceActionTypes.GET_ANKR_GOVERNANCE_ALLOWANCE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        const allowance = await stkrSdk.getAnkrGovernanceAllowance(
          stkrSdk.getKeyProvider().currentAccount(),
        );

        return { allowance };
      })(),
    },
  }),
};

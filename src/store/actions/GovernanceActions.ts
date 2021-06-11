import { StkrSdk } from '../../modules/api';
import { mapProject } from '../../modules/governance/types';
import { VoteStatus } from '@ankr.com/stkr-jssdk';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { mapVoterStats } from '../apiMappers/projectsApi';

export const GovernanceActionTypes = {
  VOTE: 'VOTE',
  FETCH_PROJECTS: 'FETCH_PROJECTS',
  CREATE_PROJECT: 'CREATE_PROJECT',
  GET_ANKR_GOVERNANCE_ALLOWANCE: 'GET_ANKR_GOVERNANCE_ALLOWANCE',
  FETCH_CLAIM_ANKR_AMOUNT: 'FETCH_CLAIM_ANKR_AMOUNT',
  CLAIM_ANKR: 'CLAIM_ANKR',
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
        const minimumDeposit = Web3.utils.toWei((await stkrSdk.getMinimumDeposit()).toString());

        if (new BigNumber(allowance).isLessThan(minimumDeposit)) {
          await stkrSdk.setAnkrAllowance(minimumDeposit, {
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
  fetchClaimAmount: () => ({
    type: GovernanceActionTypes.FETCH_CLAIM_ANKR_AMOUNT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        const claimableAnkrRewardOf = new BigNumber(
          await stkrSdk.getClaimableAnkrBalance(),
        );
        return {
          claimableAnkrRewardOf,
        };
      })(),
    },
    meta: {
      getData: mapVoterStats,
    },
  }),
  claimAnkr: (amount: BigNumber) => ({
    type: GovernanceActionTypes.CLAIM_ANKR,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getForEnv();
        return await stkrSdk.claimAnkr(amount);
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
};

import Stkr, {
  BlockchainNetworkId,
  GovernanceEvents,
  VoteStatus,
} from '@ankr.com/stkr-jssdk';
import { SendOptions } from 'web3-eth-contract';
import { KeyProvider } from './provider';
import BigNumber from 'bignumber.js';

export interface IJssdkManager {}

const ERROR_SDK_NOT_INITIALIZED = new Error("Stkr SDK hasn't been initialized");

export class JssdkManager implements IJssdkManager {
  private stkr: Stkr | undefined = undefined;

  public constructor(keyProvider: KeyProvider) {
    keyProvider
      .getWeb3()
      .eth.net.getId()
      .then(networkId => {
        if (
          [BlockchainNetworkId.mainnet, BlockchainNetworkId.goerli].includes(
            networkId,
          )
        ) {
          this.stkr = new Stkr(keyProvider.getWeb3(), networkId);
        }
      });
  }

  public async vote(
    proposalId: string,
    vote: VoteStatus,
    options?: SendOptions,
  ) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return this.stkr.vote(proposalId, vote, options);
  }

  public async fetchProjects() {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return new GovernanceEvents(
      this.stkr.contracts.Governance.getWeb3ContractInstance(),
    ).getPastPropose({ fromBlock: 0 });
  }

  public async deposit(options: SendOptions) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    await this.stkr.contracts.Governance.deposit(options);
  }

  public async createProject(
    timeSpan: number,
    topic: string,
    content: string,
    options?: SendOptions,
  ) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return this.stkr.propose(timeSpan, topic, content, options);
  }

  public async faucet(options?: SendOptions) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return this.stkr.faucet5m(options);
  }

  public async setAnkrAllowance(amount: string, options?: SendOptions) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return this.stkr.setAnkrAllowance(amount, options);
  }

  public async getAnkrGovernanceAllowance(owner: string): Promise<string> {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return this.stkr
      .getAnkrGovernanceAllowance(owner.toString())
      .then(data => data.toString(10));
  }

  public async getProposalInfo(proposalId: string) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return this.stkr.getProposalInfo(proposalId);
  }

  public async claimableAETHRewardOf(staker: string) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return new BigNumber(await this.stkr.claimableAETHRewardOf(staker));
  }

  public async claimableAETHFRewardOf(staker: string) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return new BigNumber(await this.stkr.claimableAETHFRewardOf(staker));
  }

  public async fEthBalanceOf(staker: string) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return new BigNumber(await this.stkr.fEthBalanceOf(staker));
  }

  public async aEthBalanceOf(staker: string) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return new BigNumber(await this.stkr.aEthBalanceOf(staker));
  }

  public async claimAETH(options?: SendOptions) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return this.stkr.contracts.GlobalPool.claimAETH(options);
  }

  public async claimFETH(options?: SendOptions) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return this.stkr.contracts.GlobalPool.claimFETH(options);
  }
}

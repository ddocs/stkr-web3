import Stkr, {
  GovernanceEvents,
  VoteStatus,
} from '@ankr.com/stkr-jssdk/dist/types';
import { SendOptions } from 'web3-eth-contract';
import { KeyProvider } from './provider';

export interface IGovernanceManager {}

const ERROR_SDK_NOT_INITIALIZED = new Error("Stkr SDK hasn't been initialized");

export class GovernanceManager implements IGovernanceManager {
  private stkr: Stkr | undefined = undefined;

  public constructor(keyProvider: KeyProvider) {
    console.log(keyProvider);
    // TODO sync init
    // keyProvider
    //   .getWeb3()
    //   .eth.net.getId()
    //   .then(networkId => {
    //     if (networkId !== BlockchainNetworkId.smartchain) {
    //       return (this.stkr = new Stkr(keyProvider.getWeb3(), networkId));
    //     }
    //   });
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
      this.stkr.contracts.governance.getWeb3ContractInstance(),
    ).getPastPropose({ fromBlock: 0 });
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
    return this.stkr.getAnkrGovernanceAllowance(owner);
  }

  public async getProposalInfo(proposalId: string) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }
    return this.stkr.getProposalInfo(proposalId);
  }
}

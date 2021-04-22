import Stkr, {
  BlockchainNetworkId,
  GovernanceEvents,
  VoteStatus,
} from '@ankr.com/stkr-jssdk';
import { Contract } from 'web3-eth-contract';
import { SendOptions } from 'web3-eth-contract';
import { KeyProvider } from './provider';
import BigNumber from 'bignumber.js';
import web3 from 'web3';
import { IContractConfig } from './contract';
import ABI_Governance from '../../store/artifacts/contracts/Governance.json';

export interface IJssdkManager {}

const ERROR_SDK_NOT_INITIALIZED = new Error("Stkr SDK hasn't been initialized");
const PROVIDER_MINIMUM_ANKR_STAKING_KEY = 'PROVIDER_MINIMUM_ANKR_STAKING';

export class JssdkManager implements IJssdkManager {
  private stkr: Stkr | undefined = undefined;
  protected readonly governanceContract?: Contract;

  public constructor(
    keyProvider: KeyProvider,
    contractConfig?: IContractConfig,
  ) {
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

    if (contractConfig?.governanceAddress) {
      this.governanceContract = keyProvider.createContract(
        ABI_Governance as any,
        contractConfig.governanceAddress,
      );
    }
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

  public async availableDepositsOf(address: string) {
    if (!this.governanceContract) {
      throw new Error('Governance contract is not available');
    }

    return await this.governanceContract.methods
      .availableDepositsOf(address)
      .call();
  }

  public async getMinimumStakingAmount(): Promise<BigNumber> {
    if (!this.governanceContract) {
      throw new Error('Governance contract is not available');
    }
    const setting = await this.governanceContract.methods
      .getConfig(web3.utils.asciiToHex(PROVIDER_MINIMUM_ANKR_STAKING_KEY))
      .call();
    return new BigNumber(setting.toString());
  }
}

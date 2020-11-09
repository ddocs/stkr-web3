/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/interface-name-prefix */
import { KeyProvider, SendAsyncResult } from './provider';
import { Contract, EventData } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
import { EventLog } from 'web3-core';
import { EventEmitter } from 'events';
import {
  ContractManagerEvents,
  IContractManagerStakeConfirmed,
  IContractManagerStakePending,
  IContractManagerStakeRemoved,
} from './event';

const ABI_GLOBAL_POOL = require('./contract/GlobalPool.json');
const ABI_ANKR = require('./contract/ANKR.json');
const ABI_STAKING = require('./contract/Staking.json');
const ABI_SYSTEM = require('./contract/SystemParameters.json');

export interface ContractConfig {
  aethContract: string;
  microPoolContract: string;
  ankrContract: string;
  stakingContract: string;
  systemContract: string;
}

export interface SystemContractParameters {
  providerMinimumStaking: BigNumber;
  requesterMinimumStaking: BigNumber;
  ethereumStakingAmount: BigNumber;
}

const ANKR_SCALE_FACTOR = 10 ** 18;
const ETH_SCALE_FACTOR = 10 ** 18;

export class ContractManager {
  private readonly microPoolContract: Contract;
  private readonly ankrContract: Contract;
  private readonly stackingContract: Contract;
  private readonly systemContract: Contract;

  private systemContractParameters: SystemContractParameters | null = null;

  public constructor(
    private keyProvider: KeyProvider,
    private contractConfig: ContractConfig,
    private eventEmitter: EventEmitter,
  ) {
    this.microPoolContract = this.keyProvider.createContract(
      ABI_GLOBAL_POOL,
      contractConfig.microPoolContract,
    );
    this.ankrContract = this.keyProvider.createContract(
      ABI_ANKR,
      contractConfig.ankrContract,
    );
    this.stackingContract = this.keyProvider.createContract(
      ABI_STAKING,
      contractConfig.stakingContract,
    );
    this.systemContract = this.keyProvider.createContract(
      ABI_SYSTEM,
      contractConfig.systemContract,
    );
    console.log(`subscribing for contract events`);
    this.followContractEvents();
  }

  public async queryStakePendingEventLogs(): Promise<
    IContractManagerStakePending[]
  > {
    const currentAddress = this.keyProvider.currentAccount();
    const events = await this.microPoolContract.getPastEvents('StakePending', {
      fromBlock: 0,
      filter: { staker: currentAddress },
    });
    return events.map((eventData: EventData) => {
      const { staker, amount } = eventData.returnValues;
      return {
        type: ContractManagerEvents.StakePending,
        data: {
          eventData,
          staker: staker,
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        },
      };
    });
  }

  public async queryStakeConfirmedEventLogs(): Promise<
    IContractManagerStakeConfirmed[]
  > {
    const currentAddress = this.keyProvider.currentAccount();
    const events = await this.microPoolContract.getPastEvents(
      'StakeConfirmed',
      {
        fromBlock: 0,
        filter: { staker: currentAddress },
      },
    );
    return events.map((eventData: EventData) => {
      const { staker, amount } = eventData.returnValues;
      return {
        type: ContractManagerEvents.StakeConfirmed,
        data: {
          eventData,
          staker: staker,
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        },
      };
    });
  }

  public async queryStakeRemovedEventLogs(): Promise<
    IContractManagerStakeRemoved[]
  > {
    const currentAddress = this.keyProvider.currentAccount();
    const events = await this.microPoolContract.getPastEvents('StakeRemoved', {
      fromBlock: 0,
      filter: { staker: currentAddress },
    });
    return events.map((eventData: EventData) => {
      const { staker, amount } = eventData.returnValues;
      return {
        type: ContractManagerEvents.StakeRemoved,
        data: {
          eventData,
          staker: staker,
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        },
      };
    });
  }

  private followContractEvents() {
    const currentAddress = this.keyProvider.currentAccount(),
      latestBlockHeight = this.keyProvider.latestBlockHeight();
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .StakePending({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { staker, amount } = eventLog.returnValues;
        console.log(
          `handled stake pending event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.StakePending, {
          eventData: eventLog,
          staker,
          amount,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .StakeConfirmed({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { staker, amount } = eventLog.returnValues;
        console.log(
          `handled stake confirmed event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.StakeConfirmed, {
          eventData: eventLog,
          staker,
          amount,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .StakeRemoved({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { staker, amount } = eventLog.returnValues;
        console.log(
          `handled stake removed event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.StakeRemoved, {
          eventData: eventLog,
          staker,
          amount,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .PoolOnGoing({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { pool } = eventLog.returnValues;
        console.log(
          `handled pool ongoing event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.PoolOnGoing, {
          eventData: eventLog,
          pool,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .PoolCompleted({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { pool } = eventLog.returnValues;
        console.log(
          `handled pool completed event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.PoolCompleted, {
          eventData: eventLog,
          pool,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .ProviderSlashedAnkr({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const {
          provider,
          ankrAmount,
          etherEquivalence,
        } = eventLog.returnValues;
        console.log(
          `handled provider slashed ankr log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.ProviderSlashedAnkr, {
          eventData: eventLog,
          provider,
          ankrAmount,
          etherEquivalence,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .ProviderSlashedEth({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { provider, amount } = eventLog.returnValues;
        console.log(
          `handled provider slashed eth event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.ProviderSlashedEth, {
          eventData: eventLog,
          provider,
          amount,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .ProviderToppedUpEth({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { provider, amount } = eventLog.returnValues;
        console.log(
          `handled provider topped up eth event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.ProviderToppedUpEth, {
          eventData: eventLog,
          provider,
          amount,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .ProviderToppedUpAnkr({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { provider, amount } = eventLog.returnValues;
        console.log(
          `handled provider topped up ankr event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.ProviderToppedUpAnkr, {
          eventData: eventLog,
          provider,
          amount,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .ProviderExited({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { provider } = eventLog.returnValues;
        console.log(
          `handled provider exited event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.ProviderExited, {
          eventData: eventLog,
          provider,
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .RewardClaimed({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { staker, amount } = eventLog.returnValues;
        console.log(
          `handled reward claimed event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.RewardClaimed, {
          eventData: eventLog,
          staker,
          amount,
        });
      });
  }

  public async stake(
    amount: BigNumber | BigNumber.Value,
  ): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods.stake().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    console.log(`sending stake transaction`);
    const result = await this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
        value: new BigNumber(amount)
          .multipliedBy(ETH_SCALE_FACTOR)
          .toString(10),
      },
    );
    console.log(`emitting stake manual pending event`);
    this.eventEmitter.emit(ContractManagerEvents.StakePending, {
      eventData: {
        transactionHash: result.transactionHash,
      },
      staker: currentAccount,
      amount,
    });
    return result;
  }

  public async unstake(): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods.unstake().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
  }

  public async topUpETH(amount: BigNumber | string): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods.topUpETH().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
        value: new BigNumber(amount)
          .multipliedBy(ETH_SCALE_FACTOR)
          .toString(10),
      },
    );
  }

  public async topUpANKR(amount: BigNumber | string): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods
      .topUpANKR(
        new BigNumber(amount).multipliedBy(ANKR_SCALE_FACTOR).toString(10),
      )
      .encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
  }

  public async providerExit(): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods
      .providerExit()
      .encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
  }

  public async claim(): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods.claim().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
  }

  public async claimableRewardOf(): Promise<BigNumber> {
    return this.microPoolContract.methods.claimableRewardOf().call();
  }

  public async poolCount(): Promise<BigNumber> {
    return this.microPoolContract.methods.poolCount().call();
  }

  public async pendingStakesOf(staker: string): Promise<BigNumber> {
    return this.microPoolContract.methods.pendingStakesOf(staker).call();
  }

  public async getSystemContractParameters(): Promise<
    SystemContractParameters
  > {
    if (this.systemContractParameters) {
      return this.systemContractParameters;
    }
    const providerMinimumStaking = await this.systemContract.methods
      .PROVIDER_MINIMUM_STAKING()
      .call();
    const requesterMinimumStaking = await this.systemContract.methods
      .REQUESTER_MINIMUM_POOL_STAKING()
      .call();
    const ethereumStakingAmount = await this.systemContract.methods
      .ETHEREUM_STAKING_AMOUNT()
      .call();
    console.log(`fetching system contract parameters`);
    this.systemContractParameters = {
      providerMinimumStaking: new BigNumber(providerMinimumStaking).dividedBy(
        ANKR_SCALE_FACTOR,
      ),
      requesterMinimumStaking: new BigNumber(requesterMinimumStaking).dividedBy(
        ANKR_SCALE_FACTOR,
      ),
      ethereumStakingAmount: new BigNumber(ethereumStakingAmount).dividedBy(
        ETH_SCALE_FACTOR,
      ),
    };
    console.log(
      `system contract parameters: ${JSON.stringify(
        this.systemContractParameters,
        null,
        2,
      )}`,
    );
    return this.systemContractParameters;
  }

  public async checkAnkrAllowance(): Promise<BigNumber> {
    const currentAccount = await this.keyProvider.currentAccount();
    const allowance = await this.ankrContract.methods
      .allowance(currentAccount, this.contractConfig.stakingContract)
      .call();
    return new BigNumber(allowance).dividedBy(ANKR_SCALE_FACTOR);
  }

  public async faucet(): Promise<SendAsyncResult> {
    const data: string = this.ankrContract.methods.faucet().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    console.log(`encoded [faucet] ABI: ${data}`);
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.ankrContract,
      {
        data: data,
      },
    );
  }

  public async approveAnkrToStakingContract(
    amount: BigNumber,
  ): Promise<SendAsyncResult> {
    const data: string = this.ankrContract.methods
      .approve(
        this.contractConfig.stakingContract,
        amount.multipliedBy(ANKR_SCALE_FACTOR).toString(10),
      )
      .encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    console.log(`encoded [approveAnkrToStakingContract] ABI: ${data}`);
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.ankrContract,
      {
        data: data,
      },
    );
  }

  public async ankrBalance(address: string): Promise<string> {
    return this.keyProvider.erc20Balance(this.ankrContract, address);
  }
}

/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/interface-name-prefix */
import { KeyProvider, SendAsyncResult } from './provider';
import { Contract } from 'web3-eth-contract';
import { stringToHex } from 'web3-utils';
import BigNumber from 'bignumber.js';

const ABI_MICRO_POOL = require('./contract/MicroPool.json');
const ABI_ANKR = require('./contract/ANKR.json');
const ABI_STAKING = require('./contract/Staking.json');
const ABI_SYSTEM = require('./contract/SystemParameters.json');

export interface ContractConfig {
  microPoolContract: string;
  ankrContract: string;
  stakingContract: string;
  systemContract: string;
}

export interface SystemContractParameters {
  providerMinimumStaking: BigNumber;
  requesterMinimumStaking: BigNumber;
  slashingForMigration: BigNumber;
  ethereumStakingAmount: BigNumber;
}

const ANKR_SCALE_FACTOR = 10 ** 18;
const ETH_SCALE_FACTOR = 10 ** 18;

console.log('Remove or use me', ETH_SCALE_FACTOR);

export class ContractManager {
  private readonly microPoolContract: Contract;
  private readonly ankrContract: Contract;
  private readonly stackingContract: Contract;
  private readonly systemContract: Contract;

  private systemContractParameters: SystemContractParameters | null = null;

  public constructor(
    private keyProvider: KeyProvider,
    private contractConfig: ContractConfig,
  ) {
    this.microPoolContract = this.keyProvider.createContract(
      ABI_MICRO_POOL,
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
  }

  public async initializePool(name: string): Promise<SendAsyncResult> {
    const encodedName = stringToHex(name);
    if (encodedName.length > 32) {
      throw new Error("Encoded pool name can't be greater than 32 bytes");
    }
    const data: string = this.microPoolContract.methods
      .initializePool(encodedName)
      .encodeABI();
    console.log(`encoded [initializePool] ABI: ${data}`);
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        gasLimit: '1000000',
        data: data,
      },
    );
  }

  public async initializePoolWithETH(
    name: string,
    amount: BigNumber,
  ): Promise<SendAsyncResult> {
    const { ethereumStakingAmount } = await this.getSystemContractParameters();
    if (amount.lt(ethereumStakingAmount)) {
      throw new Error(`Amount can't be lower than minimum staking amount`);
    }
    const encodedName = stringToHex(name);
    if (encodedName.length > 32) {
      throw new Error(`Encoded pool name can't be greater than 32 bytes`);
    }
    const data: string = this.microPoolContract.methods
      .initializePoolWithETH(encodedName)
      .encodeABI();
    console.log(`encoded [initializePool] ABI: ${data}`);
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        gasLimit: '1000000',
        data: data,
        value: amount.toString(10),
      },
    );
  }

  public async poolDetails(poolIndex: string): Promise<any> {
    return this.microPoolContract.methods
      .poolDetails(stringToHex(poolIndex))
      .call();
  }

  public async pendingPools(): Promise<BigNumber[]> {
    const pendingPools = await this.microPoolContract.methods
      .poolDetails()
      .call();
    console.log(
      `found next pending pools: ${JSON.stringify(pendingPools, null, 2)}`,
    );
    return Object.values(pendingPools);
  }

  public async stake(poolIndex: BigNumber, amount: BigNumber): Promise<string> {
    const data: string = this.microPoolContract.methods
      .stake(poolIndex.toString(10))
      .encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    const receipt = await this.keyProvider.send(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
        value: amount.multipliedBy(ETH_SCALE_FACTOR).toString(10),
      },
    );
    return receipt.transactionHash;
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
    const slashingForMigration = await this.systemContract.methods
      .SLASHINGS_FOR_MIGRATION()
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
      slashingForMigration: new BigNumber(slashingForMigration).dividedBy(
        ETH_SCALE_FACTOR,
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

  public async faucet(): Promise<string> {
    const data: string = this.ankrContract.methods.faucet().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    console.log(`encoded [faucet] ABI: ${data}`);
    const receipt = await this.keyProvider.send(
      currentAccount,
      this.contractConfig.ankrContract,
      {
        data: data,
      },
    );
    return receipt.transactionHash;
  }

  public async approveAnkrToStakingContract(
    amount: BigNumber,
  ): Promise<string> {
    const data: string = this.ankrContract.methods
      .approve(
        this.contractConfig.stakingContract,
        amount.multipliedBy(ANKR_SCALE_FACTOR).toString(10),
      )
      .encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    console.log(`encoded [approveAnkrToStakingContract] ABI: ${data}`);
    const receipt = await this.keyProvider.send(
      currentAccount,
      this.contractConfig.ankrContract,
      {
        data: data,
      },
    );
    return receipt.transactionHash;
  }

  public async unstake(poolIndex: number): Promise<string> {
    const data: string = this.microPoolContract.methods
      .unstake(poolIndex)
      .encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    const receipt = await this.keyProvider.send(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
    return receipt.transactionHash;
  }

  public async ankrBalance(address: string): Promise<string> {
    return this.keyProvider.erc20Balance(this.ankrContract, address);
  }
}

import { KeyProvider } from './provider';
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

  public async initializePool(name: string): Promise<string> {
    const encodedName = stringToHex(name);
    if (encodedName.length > 32) {
      throw new Error("Encoded pool name can't be greater than 32 bytes");
    }
    const data: string = this.microPoolContract.methods
      .initializePool(encodedName)
      .encodeABI();
    console.log(`encoded [initializePool] ABI: ${data}`);
    const currentAccount = await this.keyProvider.currentAccount();
    const receipt = await this.keyProvider.send(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        gasLimit: '1000000',
        data: data,
      },
    );
    return receipt.result;
  }

  public async poolDetails(poolIndex: string): Promise<any> {
    const encodedPoolIndex = stringToHex(poolIndex);
    const data: string = this.microPoolContract.methods
      .poolDetails(encodedPoolIndex)
      .encodeABI();
    console.log(`encoded [initializePool] ABI: ${data}`);
    const currentAccount = await this.keyProvider.currentAccount();
    const receipt = await this.keyProvider.invoke(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
    return receipt.result;
  }

  public async stake(poolIndex: number): Promise<string> {
    const data: string = this.microPoolContract.methods
      .stake(poolIndex)
      .encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    const receipt = await this.keyProvider.send(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
    return receipt.result;
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
    console.log(`fetching system contract parameters`);
    this.systemContractParameters = {
      providerMinimumStaking: new BigNumber(providerMinimumStaking).dividedBy(
        ANKR_SCALE_FACTOR,
      ),
      requesterMinimumStaking: new BigNumber(requesterMinimumStaking).dividedBy(
        ANKR_SCALE_FACTOR,
      ),
      slashingForMigration: new BigNumber(slashingForMigration).dividedBy(
        ANKR_SCALE_FACTOR,
      ),
    };
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
    return receipt.result;
  }

  public async approveAnkrToStakingContract(
    amount: BigNumber,
  ): Promise<string> {
    const data: string = this.ankrContract.methods
      .approve(
        this.contractConfig.stakingContract,
        amount.multipliedBy(ANKR_SCALE_FACTOR),
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
    return receipt.result;
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
    return receipt.result;
  }

  public async ankrBalance(address: string): Promise<string> {
    return this.keyProvider.erc20Balance(this.ankrContract, address);
  }
}

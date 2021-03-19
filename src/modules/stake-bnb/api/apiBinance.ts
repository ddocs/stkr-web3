import axios from 'axios';
import BigNumber from 'bignumber.js';

interface IAPIAccountData {
  account_number: number;
  address: string;
  balances: [
    {
      free: string;
      frozen: string;
      locked: string;
      symbol: 'BNB';
    },
  ];
  flags: number;
  public_key: number[];
  sequence: number;
}

interface IAccountData {
  account_number: number;
  address: string;
  balances: {
    free: BigNumber;
    frozen: BigNumber;
    locked: BigNumber;
    symbol: 'BNB';
  }[];
  flags: number;
  public_key: number[];
  sequence: number;
}

function mapAccountData(data: IAPIAccountData): IAccountData {
  return {
    ...data,
    balances: data.balances.map(item => ({
      free: new BigNumber(item.free),
      frozen: new BigNumber(item.frozen),
      locked: new BigNumber(item.locked),
      symbol: item.symbol,
    })),
  };
}

export async function getBnbAccountData(address: string) {
  const { data } = await axios.get(
    `https://dex.binance.org/api/v1/account/${address}`,
  );

  return mapAccountData(data);
}

interface IApiStakingBalanceData {
  asset: 'BNB';
  delegated: number;
  unbonding: number;
}

interface IStakingBalanceData {
  asset: 'BNB';
  delegated: BigNumber;
  unbonding: BigNumber;
}

function mapStakingBalance(data: IApiStakingBalanceData): IStakingBalanceData {
  return {
    asset: data.asset,
    delegated: new BigNumber(data.delegated),
    unbonding: new BigNumber(data.unbonding),
  };
}

interface IApiRewardsDetails {
  chainId: 'bsc';
  validator: string;
  valName: 'pexmons';
  delegator: string;
  reward: number;
  height: number;
  rewardTime: string;
}

interface IApiRewardsData {
  total: number;
  rewardDetails: IApiRewardsDetails[];
}

interface IRewardsDetails {
  chainId: 'bsc';
  validator: string;
  valName: 'pexmons';
  delegator: string;
  reward: BigNumber;
  height: number;
  rewardTime: Date;
}

interface IRewardsData {
  total: number;
  rewardDetails: IRewardsDetails[];
}

function mapRewards(data: IApiRewardsData): IRewardsData {
  return {
    ...data,
    rewardDetails: data.rewardDetails.map(item => ({
      ...item,
      reward: new BigNumber(item.reward),
      rewardTime: new Date(item.rewardTime),
    })),
  };
}

export async function getStakingBalance(address: string) {
  const [
    { data: stakingBalanceData },
    { data: rewardsData },
  ] = await Promise.all([
    await axios.get(
      `https://api.binance.org/v1/staking/accounts/${address}/balance`,
    ),
    await axios.get(
      `https://api.binance.org/v1/staking/chains/bsc/delegators/${address}/rewards?limit=100&offset=0`,
    ),
  ]);

  const rewards = mapRewards(rewardsData);

  const rewardsAmount = rewards.rewardDetails.reduce(
    (acc, item) => acc.plus(item.reward),
    new BigNumber(0),
  );

  return { ...mapStakingBalance(stakingBalanceData), rewardsAmount };
}

interface IApiGetStakingHistoryData {
  total: number;
  operations: {
    delegator: string;
    operationType: number;
    amount: number;
    srcValidator: null;
    validator: string;
    valName: string;
    time: string;
    txHash: string;
  }[];
}

export interface IStakingOperation {
  delegator: string;
  operationType: number;
  amount: BigNumber;
  srcValidator: null;
  validator: string;
  valName: string;
  time: Date;
  txHash: string;
}

export interface IGetStakingHistoryData {
  total: number;
  operations: IStakingOperation[];
}

function mapStakingHistory(
  data: IApiGetStakingHistoryData,
): IGetStakingHistoryData {
  return {
    ...data,
    operations: data.operations.map(item => {
      return {
        ...item,
        time: new Date(item.time),
        amount: new BigNumber(item.amount),
      };
    }),
  };
}

export async function getStakingHistory(address: string) {
  const { data } = await axios.get(
    `https://api.binance.org/v1/staking/chains/bsc/delegators/${address}/operations?limit=100&offset=0`,
  );

  return mapStakingHistory(data);
}

interface IApiValidatorData {
  validator: string;
  valName: string;
  commissionRate: number;
  votingPower: number;
  status: 0;
  votingPowerProportion: number;
  creationTime: number;
  apr: number;
  logoUrl: string;
  selfDelegator: string;
  selfStake: number;
  commissionMaxRate: number;
  commissionMaxChangeRate: number;
  website: string;
  detail: string;
  identity: string;
  sideConsAddr: string;
  sideFeeAddr: string;
  distributionAddr: string;
}

interface IValidatorData {
  commissionRate: BigNumber;
  apr: BigNumber;
}

function mapValidatorData(data: IApiValidatorData): IValidatorData {
  return {
    commissionRate: new BigNumber(data.commissionRate),
    apr: new BigNumber(data.apr),
  };
}

export async function getValidator(address: string) {
  const { data } = await axios.get<IApiValidatorData>(
    `https://api.binance.org/v1/staking/chains/bsc/validators/${address}`,
  );

  return mapValidatorData(data);
}

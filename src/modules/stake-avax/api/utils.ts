import { t } from '../../../common/utils/intl';
import { IAvaxStakingSession, IIWalletStake, IWalletStatus } from './types';

const AVAX_STAKING_SESSION_KEY = 'aAVAXbStaking';

export const getStakingSession = (): IAvaxStakingSession | null => {
  const tx = localStorage.getItem(AVAX_STAKING_SESSION_KEY);
  let claimTransactionInfo = null;
  try {
    claimTransactionInfo = tx && JSON.parse(tx);
    return claimTransactionInfo as IAvaxStakingSession;
  } catch {
    return null;
  }
};

export function isWalletStake(status: IWalletStatus): status is IIWalletStake {
  return (status as IIWalletStake).requiredNetwork !== undefined;
}

export const saveStakingSession = (
  session: Partial<IAvaxStakingSession>,
  inProgress = false,
): void => {
  localStorage.setItem(
    AVAX_STAKING_SESSION_KEY,
    JSON.stringify({
      ...session,
      inProgress,
    }),
  );
};

export const setSessionInProgress = (inProgress = true): void => {
  const session = getStakingSession();
  if (!session) throw new Error("Couldn't set progress, session not found");
  saveStakingSession(session, inProgress);
};

export const clearStakingSession = (): void =>
  localStorage.removeItem(AVAX_STAKING_SESSION_KEY);

export const msToEstimate = (ms: number): string => {
  let h, m;
  const s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  h = Math.floor(m / 60);
  m = m % 60;
  const d = Math.floor(h / 24);
  h = h % 24;

  const resultArray = [];

  d > 0 && resultArray.push(`${t('unit.day-value', { value: d })}`);
  h > 0 && resultArray.push(`${t('unit.hour-value', { value: h })}`);
  // m > 0 && resultArray.push(`${t('unit.minute-value', { value: m })}`);

  return resultArray.length === 1
    ? resultArray[0]
    : `${resultArray.slice(0, -1).join(', ')} ${t('stake-avax.and')} ${
        resultArray[resultArray.length - 1]
      }`;
};

const DEFAULT_MAX_ATTEMPTS = 10;
const DEFAULT_ATTEMPT_INTERVAL = 10 * 1000;

export const retry = async <T>(
  action: () => Promise<T | any>,
  skipCondition: (e: any) => boolean,
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
  interval = DEFAULT_ATTEMPT_INTERVAL,
  errorMessage?: (e: Error) => string,
): Promise<T> => {
  const result = await new Promise(async (resolve, reject) => {
    let attempts = 0;
    const i = setInterval(async () => {
      try {
        const value = await action();
        clearInterval(i);
        return resolve(value);
      } catch (e) {
        if (!e.response?.data || !skipCondition(e.response.data)) {
          if (attempts < maxAttempts) {
            attempts++;
          } else {
            clearInterval(i);
            reject(errorMessage || e);
          }
        }
      }
    }, interval);
  });

  return result as T;
};

export const getShortTxHash = (hash: string) => {
  const len = hash.length;

  return len > 10 ? `${hash.slice(0, 4)}...${hash.slice(len - 5)}` : hash;
};

export const mapEventToTxType = (event: string) => {
  switch (event) {
    case 'StakePending':
      return 'Stake';
    case 'AvaxClaimPending':
      return 'Unstake';
    case 'ClaimsServed':
      return 'Claim';
    default:
      return event;
  }
};

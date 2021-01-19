import { ETH, Milliseconds } from './types';
import Web3 from 'web3';
import { generatePath } from 'react-router';

export const INDEX_PATH = '/';
export const ANKR_PATH = 'https://www.ankr.com';
export const STAKER_STAKE_PATH = '/staker/stake';
export const STAKER_PATH = '/staker';
export const STAKER_DASHBOARD_PATH = STAKER_PATH;
export const PROVIDER_PATH = '/provider';
export const PROVIDER_MAIN_PATH = PROVIDER_PATH;
export const PROVIDER_NODE_LIST_PATH = PROVIDER_MAIN_PATH;
export const PROVIDER_CREATE_NODE_PATH = `${PROVIDER_PATH}/node/create-node`;
export const PROVIDER_TOP_UP_PATH = `${PROVIDER_PATH}/top-up/create`;
export const PROVIDER_TOP_UP_ROUTE = `${PROVIDER_PATH}/top-up/create/:type?`;
export const PROVIDER_TOP_UP_LIST_PATH = `${PROVIDER_PATH}/top-up/list`;
export const PICKER_PATH = '/picker';
export const GOVERNANCE_PATH = '/governance';
export const GOVERNANCE_PROJECT_LIST_PATH = `${GOVERNANCE_PATH}/project/list`;
export const GOVERNANCE_CREATE_PROJECT_PATH = `${GOVERNANCE_PATH}/project/create`;
export const GOVERNANCE_PROJECT_PATH = `${GOVERNANCE_PATH}/project/view`;
export const GOVERNANCE_PROJECT_ROUTE = `${GOVERNANCE_PATH}/project/view/:projectId`;

export function getGovernanceProjectPath(projectId: string) {
  return generatePath(GOVERNANCE_PROJECT_ROUTE, { projectId });
}
export const ANKR_IFRAME_PATH = '/3dparty';
export const ANKR_IFRAME_SIGNATURE_PATH = '/3dparty/signature';

export const SOCIAL_LINK = {
  twitter: 'https://twitter.com/ankr',
  facebook: 'facebook',
  telegram: 'https://t.me/ankrnetwork',
  telegramAnnouncements: 'https://t.me/anrknetworkann',
  medium: 'https://medium.com/ankr-network',
  whitepaperEn: 'https://assets.ankr.com/files/stkr_whitepaper.pdf',
  whitepaperCh: 'https://assets.ankr.com/files/stkr_whitepaper_cn.pdf',
};
export const DOCS_LINK = 'https://ankr.gitbook.io/stkr-docs/.';
export const GOVERNANCE_LINK = '#';
export const LITEPAPER_LINK =
  'https://assets.ankr.com/files/stkr_litepaper.pdf';
const ANNUAL_EXPECTED_YEARNING = 0.15;
const STAKER_RATE = 0.77;
export const YEAR_INTEREST = ANNUAL_EXPECTED_YEARNING * STAKER_RATE;
export const NOTIFICATION_AUTO_HIDE_DURATION: Milliseconds = 3000;
export const DEFAULT_STAKING_AMOUNT = 32;
export const MAX_PROVIDER_STAKING_AMOUNT = 16;
const env = process.env.REACT_APP_STKR_ENV
  ? process.env.REACT_APP_STKR_ENV
  : 'develop';

export const isMainnet = env === 'mainnet';
export const ENABLE_PROVIDER = true;

export const ETH_SCALE_FACTOR = 10 ** 18;
export const PROVIDER_MIN_BALANCE: ETH = 2;
export const STAKING_AMOUNT_STEP = 0.5;
export const PROVIDE_MIN_BALANCE: ETH = 2;
export const ETHEREUM_PRICE = 590;
export const DEFAULT_FIXED = 4;
export const ANKR_DEPOSIT_LINK =
  'https://app.uniswap.org/#/swap?outputCurrency=0x8290333cef9e6d528dd5618fb97a76f268f3edd4';
export const MIN_GOVERNANCE_AMOUNT = Web3.utils.toWei('5000000');

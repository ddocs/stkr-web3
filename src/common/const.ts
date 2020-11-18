import { Milliseconds } from './types';

export const INDEX_PATH = '/';
export const ANKR_PATH = 'https://www.ankr.com';
export const STAKER_STAKE_PATH = '/staker/stake';
export const STAKER_PATH = '/staker';
export const STAKER_DASHBOAR_PATH = STAKER_PATH;
export const PROVIDER_PATH = '/provider';
export const PROVIDER_NODES_PATH = `${PROVIDER_PATH}/nodes`;
export const PROVIDER_CREATE_MICROPOOL_PATH = '/provider/create-micropool';
export const PROVIDER_CREATE_NODE_PATH = '/provider/create-node';
export const PICKER_PATH = '/picker';
export const SURVEY_PATH = 'https://ankr_stkr.typeform.com/to/pc5sgxl9';

export const SOCIAL_LINK = {
  twitter: 'https://twitter.com/ankr',
  facebook: 'facebook',
  telegram: 'https://t.me/ankrnetwork',
  telegramAnnouncements: 'https://t.me/anrknetworkann',
  medium: 'https://medium.com/ankr-network',
  whitepaperEn: 'https://assets.ankr.com/files/stkr_whitepaper.pdf',
  whitepaperCh: 'https://assets.ankr.com/files/stkr_whitepaper_cn.pdf',
};
export const DOCS_LINK = '#';
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
export const ENABLE_PROVIDER = !isMainnet;
export const REACT_APP_GOOGLE_TAG_MANAGER_KEY =
  process.env.REACT_APP_GOOGLE_TAG_MANAGER_KEY;

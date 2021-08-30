import { generatePath } from 'react-router';
import { ETH, Milliseconds } from './types';

export const EMPTY_PATH = '/';
export const INDEX_PATH = '/internet-bonds';
export const FEATURES_PATH = `${INDEX_PATH}/launchpad`;
export const ABOUT_AETH_PATH = `${INDEX_PATH}/aETHc`;
export const STAKER_PATH = `${INDEX_PATH}/ETH`;
export const STAKER_AVALANCHE_PATH = `${INDEX_PATH}/AVAX`;
export const STAKER_STAKE_DOT_ROUTE = `${INDEX_PATH}/DOT`;
export const STAKER_STAKE_PATH = `${STAKER_PATH}/stake`;

export const STAKER_BNB_PATH = '/staking/BNB';
export const STAKER_DASHBOARD_BNB_ROUTE = `${STAKER_BNB_PATH}/:id`;
export const STAKER_STAKE_BNB_ROUTE = `${STAKER_BNB_PATH}/stake/:id`;

export const PROVIDER_PATH = `${STAKER_PATH}/provider`;
export const PROVIDER_CREATE_NODE_PATH = `${PROVIDER_PATH}/node/create-node`;
export const PROVIDER_DEPOSIT_LIST_PATH = `${PROVIDER_PATH}/deposit/list`;
export const PROVIDER_DEPOSIT_PATH = `${PROVIDER_PATH}/deposit/create`;
export const PROVIDER_DEPOSIT_ROUTE = `${PROVIDER_DEPOSIT_PATH}/:type?`;

export const GOVERNANCE_PATH = '/governance';
export const GOVERNANCE_PROJECT_LIST_PATH = `${GOVERNANCE_PATH}/project/list`;
export const GOVERNANCE_CREATE_PROJECT_PATH = `${GOVERNANCE_PATH}/project/create`;
export const GOVERNANCE_PROJECT_PATH = `${GOVERNANCE_PATH}/project/view`;
export const GOVERNANCE_PROJECT_ROUTE = `${GOVERNANCE_PROJECT_PATH}/:projectId`;

export const ABOUT_SMARTCHAIN_PATH = '/bsc';
export const ANKR_IFRAME_PATH = '/3dparty';
export const ANKR_IFRAME_SIGNATURE_PATH = '/3dparty/signature';
export const BRIDGE_PATH = '/bridge';
export const BRIDGE_RECOVERY_PATH = `${BRIDGE_PATH}/recovery`;
export const CONVERT_ROUTE = '/convert/:from/:to';

export const PARACHAIN_BONDS = '/parachain-bonds';
export const PARACHAIN_BONDS_CROWDLOANS_PATH =
  '/parachain-bonds/:network/crowdloans';
export const PARACHAIN_BONDS_LEND_PATH = `${PARACHAIN_BONDS_CROWDLOANS_PATH}/lend/:id/:name`;

export function getParachainBondsCrowdloansPath(network: string) {
  return generatePath(PARACHAIN_BONDS_CROWDLOANS_PATH, { network });
}

export function getParachainBondsLendPath(
  network: string,
  id: number,
  name?: string,
) {
  return generatePath(PARACHAIN_BONDS_LEND_PATH, {
    network,
    id,
    name: name ? name.toLowerCase() : '/',
  });
}

export function getStakerBnbPath(id: string) {
  return generatePath(STAKER_STAKE_BNB_ROUTE, { id });
}
export function getStakerDashboardBnbPath(id: string) {
  return generatePath(STAKER_DASHBOARD_BNB_ROUTE, { id });
}
export function getGovernanceProjectPath(projectId: string) {
  return generatePath(GOVERNANCE_PROJECT_ROUTE, { projectId });
}

export const SOCIAL_LINK = {
  discord: 'https://discord.gg/uYaNu23Ww7',
  facebook: 'facebook',
  medium: 'https://medium.com/ankr-network',
  telegram: 'https://t.me/ankrnetwork',
  telegramAnnouncements: 'https://t.me/anrknetworkann',
  twitter: 'https://twitter.com/ankr',
  whitepaperCh: 'https://assets.ankr.com/files/stkr_whitepaper_cn.pdf',
  whitepaperEn: 'https://assets.ankr.com/files/stkr_whitepaper.pdf',
};
export const ANKR_DEPOSIT_LINK =
  'https://app.uniswap.org/#/swap?outputCurrency=0x8290333cef9e6d528dd5618fb97a76f268f3edd4';
export const DOCS_LINK = 'https://ankr.gitbook.io/stkr-docs/.';
export const LITEPAPER_LINK =
  'https://assets.ankr.com/files/stakefi_litepaper.pdf';
export const POLKADOT_EXTENSION_LINK =
  'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd';

export const DEFAULT_FIXED = 4;
export const DEFAULT_STAKING_AMOUNT = 32;
export const ETH_DIVIDER = 10 ** 18;
export const ETH_SCALE_FACTOR = 10 ** 18;
export const MAX_PROVIDER_STAKING_AMOUNT = 16;
export const NOTIFICATION_AUTO_HIDE_DURATION: Milliseconds = 3000;
export const PROVIDER_MIN_BALANCE: ETH = 2;
export const PROVIDE_MIN_BALANCE: ETH = 2;
export const STAKER_RATE = 0.85;

export const ENABLE_AVA = true;
export const ENABLE_DOT = false;
export const ENABLE_KSM = false;
export const ENABLE_PROVIDER = true;
export const ENABLE_PARACHAIN_APP = true;

export const featuresConfig = {
  aEthVideo: false,
  bridge: false,
  avalancheBridge: false,
  avalancheUnstake: true,
};

const env = process.env.REACT_APP_STKR_ENV
  ? process.env.REACT_APP_STKR_ENV
  : 'develop';
export const isMainnet = env === 'mainnet';

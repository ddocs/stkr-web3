import {
  DEVELOP_ROCOCO_CONFIG,
  DEVELOP_WESTEND_CONFIG,
  MAINNET_KUSAMA_CONFIG,
  MAINNET_POLKADOT_CONFIG,
} from '@ankr.com/stakefi-polkadot';
import { ParachainNetwork } from '../types/ParachainNetwork';

export function getConfig(networkType: ParachainNetwork) {
  switch (networkType) {
    case ParachainNetwork.KSM:
      return MAINNET_KUSAMA_CONFIG;

    case ParachainNetwork.DOT:
      return MAINNET_POLKADOT_CONFIG;

    case ParachainNetwork.ROC:
      return DEVELOP_ROCOCO_CONFIG;

    default:
      return DEVELOP_WESTEND_CONFIG;
  }
}

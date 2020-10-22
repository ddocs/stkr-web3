import Provider from './contracts/Provider.json';
import AETH from './contracts/AETH.json';
import ANKR from './contracts/ANKR.json';
import Governance from './contracts/Governance.json';
import Staking from './contracts/Staking.json';
import MicroPool from './contracts/MicroPool.json';
import { AbiItem } from 'web3-utils';

// Goerli
const network = 5;

export const artifacts = {
  Provider: {
    abi: (Provider.abi as unknown) as AbiItem,
    address: Provider.networks[network].address,
  },
  Staking: {
    abi: (Staking.abi as unknown) as AbiItem,
    address: Staking.networks[network].address,
  },
  AETH: {
    abi: (AETH.abi as unknown) as AbiItem,
    address: AETH.networks[network].address,
  },
  Governance: {
    abi: (Governance.abi as unknown) as AbiItem,
    address: Governance.networks[network].address,
  },
  Micropool: {
    abi: (MicroPool.abi as unknown) as AbiItem,
    address: MicroPool.networks[network].address,
  },
  ANKR: {
    abi: (ANKR.abi as unknown) as AbiItem,
    address: ANKR.networks[network].address,
  },
};

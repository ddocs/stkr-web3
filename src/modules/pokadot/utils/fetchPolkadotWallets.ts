import packageJson from '../../../../package.json';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { Address } from '../../api/provider';

interface IInjected {
  accounts: any;
  metadata: any;
  name: 'polkadot-js';
  provider: any;
  signer: any;
  version: string;
}

interface IAccount {
  address: Address;
  meta: {
    genesisHash: string;
    name: string;
    source: 'polkadot-js';
  };
}

export async function fetchPolkadotWallets() {
  // Must be called even if result not used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allInjected: IInjected[] = await web3Enable(packageJson.name);
  const allAccounts: IAccount[] = await web3Accounts();

  return allAccounts;
}

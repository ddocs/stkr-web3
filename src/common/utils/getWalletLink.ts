import { isMainnet } from '../const';

const ADDRESS_LINK = isMainnet
  ? 'https://etherscan.io/address/'
  : 'https://goerli.etherscan.io/address/';

export function getWalletLink(id: string) {
  return `${ADDRESS_LINK}/${id}`;
}

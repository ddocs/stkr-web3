import { Blockchain } from '../../../common/types';

const BRIDGE_NAMESPACE = 'bridge-state';

export interface IBridgeStorage {
  amount?: string;
  signature?: string;
  txHash?: string;
  fromAddress?: string;
  toAddress?: string;
  fromBlockchain?: Blockchain;
  toBlockchain?: Blockchain;
  resultTx?: string;
}

/**
 * Localstorage for bridge state data
 */
export const BridgeStorage = {
  set: (data: IBridgeStorage) => {
    const storageDataStr = localStorage.getItem(BRIDGE_NAMESPACE);
    if (storageDataStr) {
      const updatedData = {
        ...JSON.parse(storageDataStr),
        ...data,
      };
      localStorage.setItem(BRIDGE_NAMESPACE, JSON.stringify(updatedData));
    } else {
      localStorage.setItem(BRIDGE_NAMESPACE, JSON.stringify(data));
    }
  },

  get: () => {
    const data = localStorage.getItem(BRIDGE_NAMESPACE);
    const bridgeStorage = data
      ? (JSON.parse(data) as IBridgeStorage)
      : undefined;

    return {
      txHash: bridgeStorage?.txHash,
      fromAddress: bridgeStorage?.fromAddress,
      toAddress: bridgeStorage?.toAddress,
      amount: bridgeStorage?.amount,
      signature: bridgeStorage?.signature,
      fromBlockchain: bridgeStorage?.fromBlockchain,
      toBlockchain: bridgeStorage?.toBlockchain,
    };
  },

  clear: () => {
    localStorage.removeItem(BRIDGE_NAMESPACE);
  },
};

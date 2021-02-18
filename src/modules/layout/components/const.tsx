const ENABLE_WALLET_CONNECT = false;
const ENABLE_TRUST_CONNECT = false;
const ENABLE_BINANCE_CONNECT = true;

export interface IProvider {
  caption: string;
  available: boolean;
}

export const PROVIDERS: Record<string, IProvider> = {
  metamask: {
    caption: 'providers.metamask',
    available: true,
  },
  trust: {
    caption: 'providers.trust',
    available: ENABLE_TRUST_CONNECT,
  },
  wallet: {
    caption: 'providers.wallet',
    available: ENABLE_WALLET_CONNECT,
  },
  binance: {
    caption: 'providers.binance',
    available: ENABLE_BINANCE_CONNECT,
  },
};

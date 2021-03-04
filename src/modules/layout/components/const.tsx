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
    available: false,
  },
  wallet: {
    caption: 'providers.wallet',
    available: false,
  },
  binance: {
    caption: 'providers.binance',
    available: true,
  },
};

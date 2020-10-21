const ENABLE_WALLET_CONNECT = false;
const ENABLE_TRUST_CONNECT = false;

export const PROVIDERS: Record<string, any> = {
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
};

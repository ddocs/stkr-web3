import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  DEVELOP_ROCOCO_CONFIG,
  DEVELOP_WESTEND_CONFIG,
  MAINNET_KUSAMA_CONFIG,
  MAINNET_POLKADOT_CONFIG,
} from '@ankr.com/stakefi-polkadot';
import { PolkadotProviderActions } from '../actions/PolkadotProviderActions';

const configs = {
  ksm: MAINNET_KUSAMA_CONFIG,
  dot: MAINNET_POLKADOT_CONFIG,
  wnd: DEVELOP_WESTEND_CONFIG,
  roc: DEVELOP_ROCOCO_CONFIG,
};

export const usePolkadotProvider = (network: keyof typeof configs) => {
  const dispatch = useDispatch();

  const config = configs[network];

  useEffect(() => {
    const connectPolkadotProvider = async () => {
      await dispatch(PolkadotProviderActions.initialize(config));
      dispatch(PolkadotProviderActions.connect());
    };
    connectPolkadotProvider();
  }, [dispatch, config]);

  const handleConnect = (newAccount: string) => async () => {
    await dispatch(PolkadotProviderActions.connect(newAccount));
  };

  return { handleConnect };
};

import { createContext, useContext } from 'react';
import { SolanaDirectStakingSdk } from './sdk';

export interface SdkContextState {
  sdk: SolanaDirectStakingSdk;
}

export const SdkContext = createContext<SdkContextState>({} as SdkContextState);

export function useSdk(): SdkContextState {
  return useContext(SdkContext);
}

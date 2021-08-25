import React, { FC, ReactNode, useMemo } from 'react';
import { SdkContext } from './useSdk';
import { SolanaDirectStakingSdk } from './sdk';

export interface SdkProviderProps {
  children: ReactNode;
}

export const SdkProvider: FC<SdkProviderProps> = ({ children }) => {
  const sdk = useMemo(() => SolanaDirectStakingSdk.initWithProvider(), []);
  return <SdkContext.Provider value={{ sdk }}>{children}</SdkContext.Provider>;
};

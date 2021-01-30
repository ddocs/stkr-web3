import BigNumber from 'bignumber.js';
import { ISwapConfirmsDetails } from '../../bridge-sdk';
import { ISwapResponse } from '../../bridge-sdk/entity';

export interface IConversionStats {
  availablePegETH: BigNumber;
  latestConfirms: ISwapConfirmsDetails | undefined;
  latestWaitingForDepositSwap: ISwapResponse | undefined;
}

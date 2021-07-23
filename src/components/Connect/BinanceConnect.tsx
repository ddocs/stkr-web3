import React, { useEffect, useState } from 'react';
import { useConnect } from '../../common/hooks/useConnect';
import { tHTML } from '../../common/utils/intl';
import { ConnectComponent, IConnectProps } from './Connect';

const getIsBinanceReady = () => !!window.BinanceChain;

export const BinanceConnect = ({
  networks,
}: Pick<IConnectProps, 'networks'>) => {
  const { dispatchConnect } = useConnect();
  const [isBinanceReady, setIsBinanceReady] = useState(getIsBinanceReady());

  useEffect(() => {
    const windowLoadHandler = () => setIsBinanceReady(getIsBinanceReady());
    window.addEventListener('load', windowLoadHandler);

    return function reset() {
      window.removeEventListener('load', windowLoadHandler);
    };
  }, []);

  return (
    <ConnectComponent
      networks={networks}
      onConnectClick={dispatchConnect}
      btnDisabled={!isBinanceReady}
      info={
        isBinanceReady
          ? tHTML('connect.info-binance')
          : tHTML('connect.install-binance')
      }
    />
  );
};

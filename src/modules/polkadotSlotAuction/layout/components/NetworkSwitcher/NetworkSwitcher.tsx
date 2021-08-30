import React, { useState } from 'react';
import { uid } from 'react-uid';
import classNames from 'classnames';
import { useSlotAuctionSdk } from '../../../hooks/useSlotAuctionSdk';
import {
  getParachainBondsCrowdloansPath,
  isMainnet,
} from '../../../../../common/const';
import { useNetworkSwitcherStyles } from './NetworkSwitcherStyles';

export const NetworkSwitcher = () => {
  const classes = useNetworkSwitcherStyles();

  const { networkType } = useSlotAuctionSdk();

  const [currentNetwork, setCurrentNetwork] = useState(networkType);

  const networks = isMainnet ? ['KSM', 'DOT'] : ['KSM', 'DOT', 'WND', 'ROC'];

  const handleCurrentActionChange = (newNetwork: string) => {
    setCurrentNetwork(newNetwork);
  };

  return (
    <div className={classes.networkSwitcher}>
      {networks.map(network => (
        <a
          key={uid(network)}
          href={getParachainBondsCrowdloansPath(network.toLowerCase())}
          onClick={() => handleCurrentActionChange(network)}
          className={classes.networkHref}
          rel="noopener noreferrer"
        >
          <div
            className={classNames(classes.networkButton, {
              [classes.activeNetworkButton]: network === currentNetwork,
            })}
          >
            {network}
          </div>
        </a>
      ))}
    </div>
  );
};

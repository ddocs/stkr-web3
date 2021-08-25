import { Box } from '@material-ui/core';
import React from 'react';
import { uid } from 'react-uid';
import { Body2 } from '../../UiKit/Typography';
import { INetwork } from '../../UiKit/GuardRoute/useNetworks';

interface INetworkSelector {
  networks: INetwork[];
}

export const NetworkSelector = (props: INetworkSelector) => {
  return (
    <Box display="flex" justifyContent="center">
      {props.networks.map(network => (
        <Box key={uid(network)} textAlign="center" mt={2} mx={1} width={100}>
          {network.icon}
          <Body2>{network.title}</Body2>
        </Box>
      ))}
    </Box>
  );
};

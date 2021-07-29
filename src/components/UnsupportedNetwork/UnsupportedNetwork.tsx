import { Container, Paper } from '@material-ui/core';
import React from 'react';
import { tHTML } from '../../common/utils/intl';
import { INetwork } from '../../UiKit/GuardRoute';
import { Headline5 } from '../../UiKit/Typography';
import { NetworkSelector } from '../NetworkSelector';
import { useUnsupportedNetworkStyles } from './UnsupportedNetworkStyles';

export interface IUnsupportedNetwork {
  networks: INetwork[];
}

export const UnsupportedNetwork = (props: IUnsupportedNetwork) => {
  const classes = useUnsupportedNetworkStyles();

  return (
    <Container maxWidth="md">
      <Paper variant="outlined" square={false} className={classes.paper}>
        <Headline5 className={classes.header}>
          {tHTML('connect.unsupported-network')}
        </Headline5>

        <NetworkSelector networks={props.networks} />
      </Paper>
    </Container>
  );
};

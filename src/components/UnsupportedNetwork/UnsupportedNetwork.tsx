import React from 'react';
import { Container, Paper } from '@material-ui/core';
import { Headline5 } from '../../UiKit/Typography';
import { INetwork } from '../../UiKit/GuardRoute';
import { NetworkSelector } from '../NetworkSelector/NetworkSelector';
import { useUnsupportedNetworkStyles } from './UnsupportedNetworkStyles';
import { tHTML } from '../../common/utils/intl';

interface IUnsupportedNetwork {
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

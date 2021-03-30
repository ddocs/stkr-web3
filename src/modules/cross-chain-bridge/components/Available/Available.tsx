import { Box } from '@material-ui/core';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { Headline4 } from '../../../../UiKit/Typography';
import { BigButton } from '../BigButton';
import { BridgeBox } from '../BridgeBox';
import { useAvailableStyles } from './AvailableStyles';

interface IAvailableProps {
  value: string | number;
  network: string;
  onClick: () => void;
}

export const Available = ({ value, network, onClick }: IAvailableProps) => {
  const classes = useAvailableStyles();

  return (
    <BridgeBox className={classes.root}>
      <Headline4 className={classes.title}>
        {t('cross-chain-bridge.available.title', {
          value,
          network,
        })}
      </Headline4>

      <Box textAlign="center" mt={7.5}>
        <BigButton onClick={onClick}>
          {t('cross-chain-bridge.available.btn')}
        </BigButton>
      </Box>
    </BridgeBox>
  );
};

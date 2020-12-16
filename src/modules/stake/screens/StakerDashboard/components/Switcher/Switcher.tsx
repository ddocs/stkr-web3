import * as React from 'react';
import { useCallback } from 'react';
import { useSwitcherStyles } from './SwitcherStyles';
import { Box, Divider, IconButton } from '@material-ui/core';
import { ReactComponent as AEthIcon } from './assets/aeth.svg';
import { ReactComponent as EthIcon } from './assets/eth.svg';
import { t } from '../../../../../../common/utils/intl';
import classNames from 'classnames';

export enum BalanceSwitcherMode {
  'aETH',
  'ETH',
}

export interface ISwitcherProps {
  value: BalanceSwitcherMode;
  onSetBalanceMode: (mode: BalanceSwitcherMode) => void;
}

export const Switcher = ({ onSetBalanceMode, value }: ISwitcherProps) => {
  const classes = useSwitcherStyles();

  const handleSetEthMode = useCallback(() => {
    onSetBalanceMode(BalanceSwitcherMode.ETH);
  }, [onSetBalanceMode]);

  const handleSetAethMode = useCallback(() => {
    onSetBalanceMode(BalanceSwitcherMode.aETH);
  }, [onSetBalanceMode]);

  return (
    <Box justifySelf={{ xs: undefined, sm: 'end' }} className={classes.root}>
      <IconButton
        onClick={handleSetAethMode}
        className={classNames(
          classes.button,
          value !== BalanceSwitcherMode.aETH && classes.inactive,
        )}
      >
        <Box component={AEthIcon} mr={0.75} />
        {t('units.aeth')}
      </IconButton>
      <Box ml={2} mr={2} height={20}>
        <Divider orientation="vertical" />
      </Box>
      <IconButton
        onClick={handleSetEthMode}
        className={classNames(
          classes.button,
          value !== BalanceSwitcherMode.ETH && classes.inactive,
        )}
      >
        <Box component={EthIcon} mr={0.75} />
        {t('units.eth')}
      </IconButton>
    </Box>
  );
};

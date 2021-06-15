import { SelectProps } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { uid } from 'react-uid';
import {
  PROVIDER_PATH,
  STAKER_AVALANCHE_PATH,
  STAKER_BNB_PATH,
  STAKER_DASHBOARD_PATH,
} from '../../../../common/const';
import { useFeaturesAvailable } from '../../../../common/hooks/useFeaturesAvailable';
import { t } from '../../../../common/utils/intl';
import { useNavigationSelectorStyles } from './SwitcherStyles';
import { useConnect } from '../../../../common/hooks/useConnect';
import { Blockchain } from '../../../../common/types';

export const Switcher = () => {
  const classes = useNavigationSelectorStyles();
  const { isProviderAvailable, isBnbStakingAvailable } = useFeaturesAvailable();
  const { blockChainType, loading } = useConnect();

  const options = useMemo(() => {
    const optionsList = [
      {
        label: t('navigation.staker'),
        value:
          blockChainType === Blockchain.avalanche
            ? STAKER_AVALANCHE_PATH
            : STAKER_DASHBOARD_PATH,
      },
    ];

    if (isBnbStakingAvailable) {
      optionsList.push({
        label: t('navigation.staker-bnb'),
        value: STAKER_BNB_PATH,
      });
    }

    if (isProviderAvailable) {
      optionsList.push({
        label: t('navigation.provider'),
        value: PROVIDER_PATH,
      });
    }

    return optionsList;
  }, [isBnbStakingAvailable, isProviderAvailable, blockChainType]);

  const switcherPaths = useMemo(() => options.map(option => option.value), [
    options,
  ]);

  const currentPath = useLocation().pathname;

  const value = useMemo(
    () =>
      switcherPaths.find(
        path => path && path.length > 1 && currentPath.startsWith(path),
      ),
    [currentPath, switcherPaths],
  );

  const notSelected = useMemo(
    () => !options.find(option => option.value === value),
    [options, value],
  );

  const items = useMemo(() => {
    return options.map(option => (
      <MenuItem
        component={RouterLink as any}
        to={option.value}
        key={uid(option)}
        value={option.value}
      >
        {option.label}
      </MenuItem>
    ));
  }, [options]);

  const ref = useRef<HTMLDivElement | null>(null);

  const selectProps = useMemo(
    () =>
      ({
        variant: 'outlined',
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          anchorReference: ref.current as any,
        },
      } as SelectProps),
    [],
  );

  return !loading ? (
    <TextField
      select={true}
      value={value}
      ref={ref}
      SelectProps={selectProps}
      className={classNames(classes.darkened, notSelected && classes.empty)}
    >
      {items}
    </TextField>
  ) : (
    <div />
  );
};

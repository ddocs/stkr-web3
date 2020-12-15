import React, { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { uid } from 'react-uid';
import { SelectProps } from '@material-ui/core';
import { PROVIDER_PATH, STAKER_DASHBOAR_PATH } from '../../../../common/const';
import { ITab } from '../types';
import { t } from '../../../../common/utils/intl';
import { useHistory, useLocation } from 'react-router';
import { useNavigationSelectorStyles } from './NavigationSelectorStyles';

export const NavigationSelector = () => {
  const classes = useNavigationSelectorStyles();
  const { push } = useHistory();
  const value = useLocation().pathname;

  const navigationOptions = useMemo(() => {
    return [
      {
        label: t('navigation.staker'),
        value: STAKER_DASHBOAR_PATH,
      },
      {
        label: t('navigation.provider'),
        value: PROVIDER_PATH,
      } as ITab,
    ];
  }, []);

  const notSelected = useMemo(
    () => !navigationOptions.find(option => option.value === value),
    [navigationOptions, value],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      push(event.target.value);
    },
    [push],
  );

  const items = useMemo(() => {
    return navigationOptions.map(option => (
      <MenuItem key={uid(option)} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  }, [navigationOptions]);

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

  return (
    <TextField
      select={true}
      value={value}
      onChange={handleChange}
      ref={ref}
      SelectProps={selectProps}
      className={notSelected ? classes.empty : ''}
    >
      {items}
    </TextField>
  );
};

import { SelectProps } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import React, { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { useHistory, useLocation } from 'react-router';
import { uid } from 'react-uid';
import { PROVIDER_PATH, STAKER_DASHBOARD_PATH } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { useNavigationSelectorStyles } from './SwitcherStyles';

export const Switcher = () => {
  const classes = useNavigationSelectorStyles();
  const { push } = useHistory();

  const options = useMemo(() => {
    return [
      {
        label: t('navigation.staker'),
        value: STAKER_DASHBOARD_PATH,
      },
      {
        label: t('navigation.provider'),
        value: PROVIDER_PATH,
      },
    ];
  }, []);

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

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      push(event.target.value);
    },
    [push],
  );

  const items = useMemo(() => {
    return options.map(option => (
      <MenuItem key={uid(option)} value={option.value}>
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

  return (
    <TextField
      select={true}
      value={value}
      onChange={handleChange}
      ref={ref}
      SelectProps={selectProps}
      className={classNames(classes.darkened, notSelected && classes.empty)}
    >
      {items}
    </TextField>
  );
};

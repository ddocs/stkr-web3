import { SelectProps } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { uid } from 'react-uid';
import { useLocaleOptions } from '../../../../common/hooks/useLocaleOptions';
import { Locale } from '../../../../common/types';
import { useLocaleSwitcher } from './LocaleSwitcherStyles';

export const LocaleSwitcher = () => {
  const classes = useLocaleSwitcher();
  const { localeOptions, initialLocale, setLocale } = useLocaleOptions();
  const ref = useRef<HTMLDivElement | null>(null);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLocale(event.target.value as Locale);
    },
    [setLocale],
  );

  const items = useMemo(
    () =>
      localeOptions.map(option => (
        <MenuItem key={uid(option)} value={option.value}>
          {option.label}
        </MenuItem>
      )),
    [localeOptions],
  );

  const selectProps = useMemo(
    () =>
      ({
        variant: 'outlined',
        MenuProps: {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          anchorReference: ref.current as any,
        },
      } as SelectProps),
    [],
  );

  return (
    <TextField
      value={initialLocale}
      select={true}
      onChange={onChange}
      ref={ref}
      SelectProps={selectProps}
      className={classes.root}
    >
      {items}
    </TextField>
  );
};

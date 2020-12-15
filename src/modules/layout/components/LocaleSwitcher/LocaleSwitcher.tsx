import React, { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { Locale } from '../../../../common/types';
import TextField from '@material-ui/core/TextField';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { t } from '../../../../common/utils/intl';
import MenuItem from '@material-ui/core/MenuItem';
import { uid } from 'react-uid';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../../../store/actions/UserActions';
import { useLocale } from '../../../../common/utils/useLocale';
import { SelectProps } from '@material-ui/core';
import { useLocaleSwitcher } from './LocaleSwitcherStyles';

export interface ILanguageSwitcherProps {
  value: Locale;
  onChange: (language: Locale) => void;
}

export const LanguageSwitcherComponent = ({
  value,
  onChange,
}: ILanguageSwitcherProps) => {
  const classes = useLocaleSwitcher();

  const localeOptions = useLocaleMemo(() => {
    return [
      {
        value: 'en-US',
        label: t('language.en-US'),
      },
      {
        value: 'zh-CN',
        label: t('language.zh-CN'),
      },
    ];
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value as Locale);
    },
    [onChange],
  );

  const items = useMemo(() => {
    return localeOptions.map(option => (
      <MenuItem key={uid(option)} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  }, [localeOptions]);

  const ref = useRef<HTMLDivElement | null>(null);

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
      value={value}
      select={true}
      onChange={handleChange}
      ref={ref}
      SelectProps={selectProps}
      className={classes.root}
    >
      {items}
    </TextField>
  );
};

export const LocaleSwitcher = () => {
  const dispatch = useDispatch();
  const { locale } = useLocale();

  const handleChange = useCallback(
    (value: Locale) => {
      dispatch(UserActions.setLocale({ locale: value }));
    },
    [dispatch],
  );

  return <LanguageSwitcherComponent onChange={handleChange} value={locale} />;
};

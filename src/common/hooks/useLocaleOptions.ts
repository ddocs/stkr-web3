import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../store/actions/UserActions';
import { Locale } from '../types';
import { t } from '../utils/intl';
import { useLocale } from '../utils/useLocale';
import { useLocaleMemo } from './useLocaleMemo';

export const useLocaleOptions = () => {
  const dispatch = useDispatch();
  const { locale: initialLocale } = useLocale();

  const setLocale = useCallback(
    (locale: Locale) => {
      dispatch(UserActions.setLocale({ locale }));
    },
    [dispatch],
  );

  const localeOptions = useLocaleMemo(
    () => [
      {
        value: Locale.en,
        label: t('language.en-US'),
      },
      {
        value: Locale.zh,
        label: t('language.zh-CN'),
      },
    ],
    [],
  );

  return { localeOptions, initialLocale, setLocale };
};

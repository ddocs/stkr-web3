import { useSelector } from 'react-redux';
import { IStoreState } from '../../store/reducers';
import { Locale } from '../types';

export function useLocale() {
  return useSelector<IStoreState, { locale: Locale }>(
    ({ user: { locale } }) => {
      return { locale };
    },
  );
}

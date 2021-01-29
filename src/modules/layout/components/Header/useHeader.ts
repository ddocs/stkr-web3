import { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { PROVIDER_PATH, STAKER_DASHBOARD_PATH } from '../../../../common/const';
import {
  useIsLGUp,
  useIsMDUp,
  useIsSMUp,
} from '../../../../common/hooks/useTheme';
import { UserActions } from '../../../../store/actions/UserActions';
import { useHeaderStyles } from './HeaderStyles';

const FILTERED_ERRORS = ['Modal closed by user'];
const SHOW_SWITCHER_ON_ALL_PAGES = true;

function isFilteredError(error: any) {
  return FILTERED_ERRORS.indexOf(error) !== -1;
}

export const useHeader = () => {
  const isLGUp = useIsLGUp();
  const isSMUp = useIsSMUp();
  const isMDUp = useIsMDUp();
  const dispatch = useDispatch();
  const modalControlRef = useRef<HTMLButtonElement>(null);
  const [mobileNavShowed, setMobileNavShowed] = useState(false);
  const location = useLocation();
  const classes = useHeaderStyles();

  const switcherPaths = useMemo(
    () => [STAKER_DASHBOARD_PATH, PROVIDER_PATH],
    [],
  );

  const showSwitcher = useMemo(
    () =>
      SHOW_SWITCHER_ON_ALL_PAGES ||
      switcherPaths.find(path => location.pathname.startsWith(path)),
    [location.pathname, switcherPaths],
  );

  const handleMobileNavOpen = useCallback(() => setMobileNavShowed(true), []);
  const handleMobileNavClose = useCallback(() => setMobileNavShowed(false), []);

  const handleConnect = useCallback(() => {
    dispatch(UserActions.connect());
  }, [dispatch]);

  return {
    mobileNavShowed,
    modalControlRef,
    classes,
    showSwitcher,
    isLGUp,
    isMDUp,
    isSMUp,
    isFilteredError,
    handleConnect,
    handleMobileNavClose,
    handleMobileNavOpen,
  };
};

import React from 'react';
import classNames from 'classnames';
import { useHeaderStyles } from './HeaderStyles';
import { t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { ITab, NavTab } from '../types';
import { Button } from '../../../../UiKit/Button';
import { Tabs } from '../Tabs';
import { PROVIDER_PATH, STAKER_PATH } from '../../../../common/const';
import { Logotype } from '../Logotype';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isAuthenticated } from '../../../../store/reducers/userReducer';
import { openUnlockWalletAction } from '../../../../store/modals/actions';
import { useAction } from '../../../../store/redux';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { Toggle } from '../Toggle';
import { useQuery } from '@redux-requests/react';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IUserInfo } from '../../../../store/apiMappers/userApi';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';

const SHOW_SWITCHER_ON_ALL_PAGES = true;

interface IHeaderStoreProps {
  isAuth?: boolean;
}

export interface IHeaderProps extends IHeaderStoreProps {
  className?: string;
  fetchUserInfo: typeof UserActions.fetchUserInfo;
}

const TABS: ITab[] = [
  {
    label: 'navigation.staker',
    value: NavTab.staker,
    href: STAKER_PATH,
  },
  {
    label: 'navigation.provider',
    value: NavTab.provider,
    href: PROVIDER_PATH,
  },
];

export const HeaderComponent = ({
  className,
  isAuth,
  fetchUserInfo,
}: IHeaderProps) => {
  const classes = useHeaderStyles();

  useInitEffect(() => {
    if (isAuth) {
      fetchUserInfo();
    }
  });

  const location = useLocation();

  const openUnlockWallet = useAction(openUnlockWalletAction);

  const isSMDown = useIsSMDown();

  const { data } = useQuery<IUserInfo | undefined>({
    type: UserActionTypes.FETCH_USER_INFO,
  });

  return (
    <header
      className={classNames(
        classes.component,
        !isAuth && classes.outerComponent,
        className,
      )}
    >
      <Curtains className={isAuth ? classes.inner : classes.outer}>
        <Logotype className={classes.logo} />
        {isAuth ? (
          isSMDown ? (
            <Toggle />
          ) : (
            <>
              {([STAKER_PATH, PROVIDER_PATH].includes(location.pathname) ||
                SHOW_SWITCHER_ON_ALL_PAGES) && (
                <Tabs className={classes.tabs} values={TABS} />
              )}
              <div className={classes.wallet}>{data?.address}</div>
            </>
          )
        ) : (
          <Button
            onClick={openUnlockWallet}
            className={classes.button}
            color="primary"
            size={!isSMDown ? 'large' : 'medium'}
          >
            {t('navigation.unlock-wallet')}
          </Button>
        )}
      </Curtains>
    </header>
  );
};

export const Header = connect(
  (state: IStoreState) => ({
    isAuth: isAuthenticated(state.user),
  }),
  {
    fetchUserInfo: UserActions.fetchUserInfo,
  },
)(HeaderComponent);

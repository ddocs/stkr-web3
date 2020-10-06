import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useDefaultLayoutStyles } from './DefaultLayoutStyles';
import { Header } from '../Header';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isAuthenticated } from '../../../../store/reducers/userReducer';
import { UserActions } from '../../../../store/actions/UserActions';

interface ILayoutStoreProps {
  signIn: typeof UserActions.signIn;
}

export interface ILayoutProps extends ILayoutStoreProps {
  className?: string;
  isAuth: boolean;
  children?: React.ReactNode;
  displayName?: string;
}

export const DefaultLayoutComponent = ({
  className,
  isAuth,
  children,
  signIn,
  displayName,
}: ILayoutProps) => {
  const classes = useDefaultLayoutStyles();

  const handleUnlockWallet = useCallback(() => {
    signIn();
  }, [signIn]);

  return (
    <div className={classNames(classes.component, className)}>
      <Header
        isAuth={isAuth}
        onUnlockWallet={handleUnlockWallet}
        displayName={displayName}
      />
      <main>{children}</main>
    </div>
  );
};

export const DefaultLayout = connect(
  (state: IStoreState) => ({
    isAuth: isAuthenticated(state.user),
    displayName: state.user.userInfo?.displayName,
  }),
  {
    signIn: UserActions.signIn,
  },
)(DefaultLayoutComponent);

import React from 'react';
import classNames from 'classnames';
import { useDefaultLayoutStyles } from './DefaultLayoutStyles';
import { Header } from '../Header';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isAuthenticated } from '../../../../store/reducers/userReducer';
import { UnlockWallet } from '../UnlockWallet';

interface ILayoutStoreProps {
  isAuth: boolean;
}

export interface ILayoutProps extends ILayoutStoreProps {
  className?: string;
  children?: React.ReactNode;
}

export const DefaultLayoutComponent = ({
  className,
  children,
}: ILayoutProps) => {
  const classes = useDefaultLayoutStyles();

  return (
    <>
      <div className={classNames(classes.component, className)}>
        <Header />
        <main>{children}</main>
      </div>
      <UnlockWallet />
    </>
  );
};

export const DefaultLayout = connect(
  (state: IStoreState) => ({
    isAuth: isAuthenticated(state.user),
  }),
  {},
)(DefaultLayoutComponent);

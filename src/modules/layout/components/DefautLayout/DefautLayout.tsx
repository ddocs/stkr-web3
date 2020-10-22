import React from 'react';
import classNames from 'classnames';
import { useDefaultLayoutStyles } from './DefaultLayoutStyles';
import { Header } from '../Header';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';
import { UnlockWallet } from '../UnlockWallet';
import { Footer } from '../Footer';

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
        <main className={classes.content}>{children}</main>
        <Footer />
      </div>
      <UnlockWallet />
    </>
  );
};

export const DefaultLayout = connect(
  (state: IStoreState) => ({
    isAuth: isConnected(state.user),
  }),
  {},
)(DefaultLayoutComponent);

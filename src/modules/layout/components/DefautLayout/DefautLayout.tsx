import React from 'react';
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
  children?: React.ReactNode;
}

export const DefaultLayoutComponent = ({ children }: ILayoutProps) => {
  const classes = useDefaultLayoutStyles();

  return (
    <>
      <div className={classes.root}>
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

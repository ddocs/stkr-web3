import React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useDefaultLayoutStyles } from './DefaultLayoutStyles';

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
    </>
  );
};

export const DefaultLayout = connect(
  (state: IStoreState) => ({
    isAuth: isConnected(state.user),
  }),
  {},
)(DefaultLayoutComponent);

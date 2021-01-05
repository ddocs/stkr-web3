import React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';
import { INDEX_PATH } from '../common/const';
import { useStore } from 'react-redux';
import { IStoreState } from '../store/reducers';
import { Route } from 'react-router-dom';

interface IPrivateRouteProps extends RouteProps {
  component: any;
}

export const PrivateRoute = (props: IPrivateRouteProps) => {
  const store = useStore<IStoreState>();
  const {
    user: { isConnected },
  } = store.getState();

  if (isConnected) {
    return <Route {...props} />;
  }

  return <Redirect to={INDEX_PATH} />;
};

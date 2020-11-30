import React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';
import { INDEX_PATH } from '../common/const';
import { useStore } from 'react-redux';
import { IStoreState } from '../store/reducers';

interface IPrivateRouteProps extends RouteProps {
  component: any;
}

export const PrivateRoute = (props: IPrivateRouteProps) => {
  const { component: CurrentComponent, ...rest } = props;
  const store = useStore<IStoreState>();
  const {
    user: { isConnected },
  } = store.getState();

  if (isConnected) {
    return <CurrentComponent {...rest} />;
  }

  return <Redirect to={INDEX_PATH} />;
};

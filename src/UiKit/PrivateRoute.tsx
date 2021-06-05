import React from 'react';
import { RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStoreState } from '../store/reducers';
import { Route } from 'react-router-dom';
import { withDefaultLayout } from '../modules/layout';
import loadable, { LoadableComponent } from '@loadable/component';
import { QueryLoadingAbsolute } from '../components/QueryLoading/QueryLoading';

interface IPrivateRouteProps extends RouteProps {
  component: any;
}

const ConnectContainer = withDefaultLayout(
  loadable(
    async () =>
      import('../components/Connect/Connect').then(module => module.Connect),
    {
      fallback: <QueryLoadingAbsolute />,
    },
  ) as LoadableComponent<any>,
);

export const PrivateRoute = (props: IPrivateRouteProps) => {
  const isAuth = useSelector((state: IStoreState) => state.user.isConnected);

  if (isAuth) {
    return <Route {...props} />;
  }

  return <ConnectContainer {...props} />;
};

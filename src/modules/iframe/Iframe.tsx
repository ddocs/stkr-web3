import * as React from 'react';
import { useEffect } from 'react';
import { CreateSignature } from './components/CreateSignature';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../store/actions/UserActions';
import { Route, Switch } from 'react-router-dom';
import { ANKR_IFRAME_SIGNATURE_PATH } from '../../common/const';

export const Iframe = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserActions.fetchGlobalStats());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route
          path={ANKR_IFRAME_SIGNATURE_PATH}
          exact={true}
          component={CreateSignature}
        />
      </Switch>
    </>
  );
};

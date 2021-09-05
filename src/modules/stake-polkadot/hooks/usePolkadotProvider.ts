import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from '../actions/connect';
import { initialize } from '../actions/initialize';
import { ParachainNetwork } from '../types/ParachainNetwork';
import { getConfig } from '../utils/getConfig';

export const usePolkadotProvider = (network: ParachainNetwork) => {
  const dispatch = useDispatch();
  const config = getConfig(network);

  useEffect(() => {
    (async () => {
      await dispatch(initialize(config));
      dispatch(connect());
    })();
  }, [dispatch, config]);
};

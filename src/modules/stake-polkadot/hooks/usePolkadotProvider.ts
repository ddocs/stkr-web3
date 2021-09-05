import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { connect } from '../actions/connect';
import { initialize } from '../actions/initialize';
import { ParachainNetwork } from '../types/ParachainNetwork';
import { getConfig } from '../utils/getConfig';
import { FEATURES_PATH } from '../../../common/const';

export const usePolkadotProvider = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { network } = useParams<{ network: ParachainNetwork }>();

  const config = getConfig(network);

  useEffect(() => {
    (async () => {
      if (!Object.values(ParachainNetwork).includes(network)) {
        return history.push(FEATURES_PATH);
      }

      await dispatch(initialize(config));

      dispatch(connect());
    })();
  }, [history, network, dispatch, config]);
};

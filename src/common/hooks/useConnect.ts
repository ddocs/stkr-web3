import { useQuery } from '@redux-requests/react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { UserActions, UserActionTypes } from '../../store/actions/UserActions';
import { IUserInfo } from '../../store/apiMappers/userApi';
import { IStoreState } from '../../store/reducers';
import { isConnected } from '../../store/reducers/userReducer';
import { BRIDGE_PATH, BRIDGE_RECOVERY_PATH } from '../const';

export const useConnect = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuth = useSelector((state: IStoreState) => isConnected(state.user));
  const { data: userInfo, loading } = useQuery<IUserInfo | null>({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
  });

  const isBridgePath = location.pathname === BRIDGE_PATH;
  const isBridgeRecoveryPath = location.pathname === BRIDGE_RECOVERY_PATH;

  const dispatchConnect = useCallback(() => {
    if (isAuth) {
      return;
    } else if (isBridgePath) {
      dispatch(UserActions.connect(BRIDGE_PATH));
    } else if (isBridgeRecoveryPath) {
      dispatch(UserActions.connect(BRIDGE_RECOVERY_PATH));
    } else {
      dispatch(UserActions.connect());
    }
  }, [dispatch, isAuth, isBridgePath, isBridgeRecoveryPath]);

  const dispatchDisconnect = useCallback(() => {
    if (!isAuth) {
      return;
    } else if (isBridgePath) {
      dispatch(UserActions.disconnect(BRIDGE_PATH));
    } else if (isBridgeRecoveryPath) {
      dispatch(UserActions.disconnect(BRIDGE_RECOVERY_PATH));
    } else {
      dispatch(UserActions.disconnect());
    }
  }, [dispatch, isAuth, isBridgePath, isBridgeRecoveryPath]);

  return {
    dispatchConnect,
    dispatchDisconnect,
    isAuth,
    blockChainType: userInfo?.blockchainType,
    loading,
  };
};

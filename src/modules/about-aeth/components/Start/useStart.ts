import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { STAKER_STAKE_PATH } from '../../../../common/const';
import { UserActions } from '../../../../store/actions/UserActions';
import { IStoreState } from '../../../../store/reducers';
import { isConnected } from '../../../../store/reducers/userReducer';

export const useStart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: IStoreState) => isConnected(state.user));

  const onClick = useCallback(() => {
    if (isAuth) {
      history.push(STAKER_STAKE_PATH);
    } else {
      dispatch(UserActions.connect());
    }
  }, [dispatch, history, isAuth]);

  return {
    onClick,
  };
};

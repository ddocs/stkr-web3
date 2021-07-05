import * as React from 'react';
import { ReactNode, useCallback } from 'react';
import { useDispatchRequest } from '@redux-requests/react';
import { fetchPolkadotWalletsAction } from '../../actions/fetchPolkadotWalletsAction';
import { useDispatch } from 'react-redux';
import { polkadotSlice } from '../../reducers/polkadotSlice';

interface IConnectPolkadotProps {
  children: ReactNode;
}

export const ConnectPolkadotButton = ({ children }: IConnectPolkadotProps) => {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useDispatch();

  const handleOpen = useCallback(() => {
    dispatchRequest(fetchPolkadotWalletsAction());
    dispatch(polkadotSlice.actions.setStep({ step: 'init' }));
  }, [dispatch, dispatchRequest]);

  const element = React.isValidElement(children)
    ? React.cloneElement(children, { onClick: handleOpen })
    : null;

  return <>{element}</>;
};

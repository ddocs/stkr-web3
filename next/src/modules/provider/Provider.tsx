import React from 'react';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/reducers';
import { CreateBeaconChain } from './screens/CreateBeaconChain';
import { ProviderDashboard } from './screens/ProviderDashboard';

interface IProviderStoreProps {
  isProvider: boolean;
}

interface IProviderProps extends IProviderStoreProps {}

export const ProviderComponent = ({ isProvider }: IProviderProps) => {
  return isProvider ? <ProviderDashboard /> : <CreateBeaconChain />;
};

export const Provider = connect((state: IStoreState): IProviderStoreProps => {
  return {
    isProvider: true,
  };
}, {})(ProviderComponent);

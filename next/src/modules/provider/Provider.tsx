import React from 'react';
import { NotProviderYet } from './screens/NotProviderYet';
import { ProviderAlready } from './screens/ProviderAlready';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/reducers';

interface IProviderStoreProps {
  isProvider: boolean;
}

interface IProviderProps extends IProviderStoreProps {}

export const ProviderComponent = ({ isProvider }: IProviderProps) => {
  return isProvider ? <ProviderAlready /> : <NotProviderYet />;
};

export const Provider = connect((state: IStoreState): IProviderStoreProps => {
  return {
    isProvider: true,
  };
}, {})(ProviderComponent);

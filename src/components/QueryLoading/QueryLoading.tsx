import * as React from 'react';
import { Spinner } from '../Spinner';

export const QueryLoading = () => {
  return <Spinner />;
};

export const QueryLoadingCentered = () => {
  return <Spinner centered={true} />;
};

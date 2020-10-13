import * as React from 'react';
import { ErrorProps } from '@redux-requests/react';

interface ILoadingProps extends ErrorProps {}

export const QueryError = ({ error }: ILoadingProps) => {
  return <div>{error.toString ? error.toString() : error}</div>;
};

import * as React from 'react';
import { ErrorProps } from '@redux-requests/react';
import { t } from '../../common/utils/intl';

function getErrorMessage(props: ErrorProps) {
  if (typeof props.error.message === 'string') {
    return props.error.message;
  }

  if (props.error.toString) {
    return props.error.toString();
  }

  return t('error.unknown');
}

interface ILoadingProps extends ErrorProps {}

export const QueryError = (props: ILoadingProps) => {
  return <div>{getErrorMessage(props)}</div>;
};

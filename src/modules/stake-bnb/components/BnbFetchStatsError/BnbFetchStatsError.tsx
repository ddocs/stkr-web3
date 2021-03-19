import * as React from 'react';
import { ErrorProps } from '@redux-requests/react';
import {
  getErrorMessage,
  QueryError,
} from '../../../../components/QueryError/QueryError';
import { t, tHTML } from '../../../../common/utils/intl';
import { HeadedPaper } from '../HeadedPaper';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { IconButton } from '@material-ui/core';
import { useBnbFetchStatsError } from './BnbFetchStatsErrorStyles';

const NOT_FOUND_ERROR_MESSAGE = 'account not found';

interface IBnbFetchStatsErrorProps extends ErrorProps {
  onCancel?: () => void;
}

export const BnbFetchStatsError = (props: IBnbFetchStatsErrorProps) => {
  const { onCancel } = props;
  const message = getErrorMessage(props);
  const classes = useBnbFetchStatsError();

  if (message === NOT_FOUND_ERROR_MESSAGE) {
    return (
      <HeadedPaper
        title={t('bnb-fetch-stats-error.title')}
        subtitle={tHTML('bnb-fetch-stats-error.error.account-not-found')}
        classes={{ root: classes.root }}
      >
        <IconButton
          disableTouchRipple={false}
          focusRipple={false}
          disableFocusRipple={false}
          disableRipple={false}
          className={classes.cancel}
          onClick={onCancel}
        >
          <CancelIcon size="md" />
        </IconButton>
      </HeadedPaper>
    );
  }

  return <QueryError {...props} />;
};

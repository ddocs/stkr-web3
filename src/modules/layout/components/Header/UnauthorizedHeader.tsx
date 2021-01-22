import { Box } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { t } from '../../../../common/utils/intl';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Button } from '../../../../UiKit/Button';
import { Links } from '../Links';
import { LocaleSwitcher } from '../LocaleSwitcher';
import { HeaderFrame } from './HeaderFrame';
import { useHeaderStyles } from './HeaderStyles';

const FILTERED_ERRORS = ['Modal closed by user'];

function isFilteredError(error: any) {
  return FILTERED_ERRORS.indexOf(error) !== -1;
}

export const UnauthorizedHeader = ({
  className,
  isAuth,
}: {
  className?: string;
  isAuth?: boolean;
}) => {
  const classes = useHeaderStyles({});
  const dispatch = useDispatch();
  const history = useHistory();

  const handleConnect = useCallback(() => {
    dispatch(UserActions.connect());
  }, [dispatch]);

  const isSMDown = useIsSMDown();
  const isIframe = window.location.pathname.startsWith('/iframe');
  if (isIframe) {
    return (
      <HeaderFrame
        outerClassName={className}
        innerClassName={classes.outer}
        dropdownClassName={classes.dropdown}
      >
        <MutationErrorHandler
          type={UserActionTypes.CONNECT}
          resetOnShow={false}
          filter={isFilteredError}
        />
      </HeaderFrame>
    );
  }

  return (
    <HeaderFrame
      outerClassName={className}
      innerClassName={classes.inner}
      dropdownClassName={classes.mobileUnAuth}
    >
      <MutationErrorHandler
        type={UserActionTypes.CONNECT}
        resetOnShow={false}
        filter={isFilteredError}
      />

      <div className={classes.switcherWrap}>
        <LocaleSwitcher />
      </div>

      <Button
        onClick={() => {
          if (isAuth) {
            history.push('/picker');
          } else {
            handleConnect();
          }
        }}
        className={classes.button}
        color="primary"
        size={!isSMDown ? 'large' : 'medium'}
      >
        {t('navigation.unlock-wallet')}
      </Button>

      <Box m={{ lg: 'auto' }}>
        <Links className={classes.links} />
      </Box>
    </HeaderFrame>
  );
};

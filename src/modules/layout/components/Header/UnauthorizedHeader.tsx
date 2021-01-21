import { useHeaderStyles } from './HeaderStyles';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import React, { useCallback } from 'react';
import { HeaderFrame } from './HeaderFrame';
import { Links } from '../Links';
import { useHistory } from 'react-router';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { useDispatch } from 'react-redux';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { LocaleSwitcher } from '../LocaleSwitcher';
import { Box } from '@material-ui/core';

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
      innerClassName={classes.outer}
      dropdownClassName={classes.dropdown}
    >
      <MutationErrorHandler
        type={UserActionTypes.CONNECT}
        resetOnShow={false}
        filter={isFilteredError}
      />
      <Box display="flex" alignItems="center" margin={{ xs: 'auto' }}>
        <Links className={classes.links} />
      </Box>
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
      <Box
        display="flex"
        alignItems="center"
        ml={{ xs: 'auto', md: 0 }}
        mb={{ xs: 3, md: 0 }}
      >
        <LocaleSwitcher />
      </Box>
    </HeaderFrame>
  );
};

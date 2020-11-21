import { useHeaderStyles } from './HeaderStyles';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import React, { useCallback } from 'react';
import { HeaderFrame } from './HeaderFrame';
import { Links } from '../Links';
import { useHistory } from 'react-router';
import { UserActions } from '../../../../store/actions/UserActions';
import { useDispatch } from 'react-redux';

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
  return (
    <HeaderFrame
      outerClassName={className}
      innerClassName={classes.outer}
      dropdownClassName={classes.dropdown}
    >
      <Links className={classes.links} />
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
    </HeaderFrame>
  );
};

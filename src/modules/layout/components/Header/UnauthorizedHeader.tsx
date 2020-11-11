import { useHeaderStyles } from './HeaderStyles';
import { useAction } from '../../../../store/redux';
import { openUnlockWalletAction } from '../../../../store/modals/actions';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import React from 'react';
import { HeaderFrame } from './HeaderFrame';
import { Links } from '../Links';
import { useHistory } from 'react-router';

export const UnauthorizedHeader = ({
  className,
  isAuth,
}: {
  className?: string;
  isAuth?: boolean;
}) => {
  const classes = useHeaderStyles({});
  const openUnlockWallet = useAction(openUnlockWalletAction);
  const history = useHistory();

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
            openUnlockWallet();
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

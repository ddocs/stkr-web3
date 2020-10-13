import { useHeaderStyles } from './HeaderStyles';
import { useAction } from '../../../../store/redux';
import { openUnlockWalletAction } from '../../../../store/modals/actions';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import classNames from 'classnames';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import React from 'react';
import { HeaderFrame } from './HeaderFrame';

export const UnauthorizedHeader = ({ className }: { className?: string }) => {
  const classes = useHeaderStyles();
  const openUnlockWallet = useAction(openUnlockWalletAction);

  const isSMDown = useIsSMDown();
  return (
    <HeaderFrame
      outerClassName={classNames(classes.outerComponent, className)}
      innerClassName={classes.outer}
    >
      <Button
        onClick={openUnlockWallet}
        className={classes.button}
        color="primary"
        size={!isSMDown ? 'large' : 'medium'}
      >
        {t('navigation.unlock-wallet')}
      </Button>
    </HeaderFrame>
  );
};

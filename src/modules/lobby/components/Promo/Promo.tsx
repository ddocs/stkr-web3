import React from 'react';
import { usePromoStyles } from './PromoStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { t, tHTML } from '../../../../common/utils/intl';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { Button } from '../../../../UiKit/Button';
import { useAction } from '../../../../store/redux';
import { openUnlockWalletAction } from '../../../../store/modals/actions';

interface IPromoProps {
  className?: string;
}

export const Promo = ({ className }: IPromoProps) => {
  const classes = usePromoStyles();
  const openUnlockWallet = useAction(openUnlockWalletAction);

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <h2 className={classes.title}>{tHTML('about.title')}</h2>
        <Typography className={classes.text} component="p">
          {t('about.text')}
        </Typography>
        <Button
          className={classes.button}
          color="primary"
          size="large"
          onClick={openUnlockWallet}
        >
          {t('navigation.unlock-wallet')}
        </Button>
      </Curtains>
    </section>
  );
};

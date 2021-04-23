import React, { useCallback } from 'react';
import { usePromoStyles } from './PromoStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import { t, tHTML } from '../../../../common/utils/intl';
import { Typography } from '@material-ui/core';
import { Button } from '../../../../UiKit/Button';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../../../store/actions/UserActions';

export const Promo = () => {
  const classes = usePromoStyles();
  const dispatch = useDispatch();
  const handleUnlockWallet = useCallback(() => {
    dispatch(UserActions.connect());
  }, [dispatch]);

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.wrapper }}>
        <h2 className={classes.title}>{tHTML('about.title')}</h2>
        <Typography className={classes.text} component="p">
          {t('about.text')}
        </Typography>
        <Button
          className={classes.button}
          color="primary"
          size="large"
          onClick={handleUnlockWallet}
        >
          {t('navigation.unlock-wallet')}
        </Button>
      </Curtains>
    </section>
  );
};
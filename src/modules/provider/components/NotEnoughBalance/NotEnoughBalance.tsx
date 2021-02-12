import { Button, Paper } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PROVIDER_DEPOSIT_PATH } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { Body2, Headline4 } from '../../../../UiKit/Typography';
import { ReactComponent as NotEnoughBalanceImage } from './assets/notEnoughBalance.svg';
import { useEmptyNodeListStyles } from './NotEnoughBalanceStyles';

export const NotEnoughBalance = () => {
  const classes = useEmptyNodeListStyles();
  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <i className={classes.img}>
        <NotEnoughBalanceImage />
      </i>

      <div className={classes.content}>
        <Headline4 className={classes.title}>
          {t('not-enough-balance.title')}
        </Headline4>

        <Body2 className={classes.text}>{t('not-enough-balance.text')}</Body2>

        <Button
          className={classes.btn}
          component={RouterLink}
          to={PROVIDER_DEPOSIT_PATH}
          color="primary"
          size="large"
          fullWidth
        >
          {t('not-enough-balance.submit')}
        </Button>
      </div>
    </Paper>
  );
};

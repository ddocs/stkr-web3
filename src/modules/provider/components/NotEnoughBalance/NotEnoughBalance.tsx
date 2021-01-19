import React from 'react';
import { t } from '../../../../common/utils/intl';
import { ReactComponent as NotEnoughBalanceImage } from './assets/notEnoughBalance.svg';
import { Button, Grid } from '@material-ui/core';
import { useEmptyNodeListStyles } from './NotEnoughBalanceStyles';
import { Headline4 } from '../../../../UiKit/Typography';
import { PROVIDER_TOP_UP_PATH } from '../../../../common/const';
import { Link as RouterLink } from 'react-router-dom';

export const NotEnoughBalance = () => {
  const classes = useEmptyNodeListStyles();
  return (
    <Grid container={true} spacing={2} alignItems="flex-start">
      <Grid item={true} md={3} xs={12}>
        <NotEnoughBalanceImage />
      </Grid>
      <Grid item={true} md={9} xs={12}>
        <Headline4 className={classes.title}>
          {t('not-enough-balance.title')}
        </Headline4>
        <Button
          component={RouterLink}
          to={PROVIDER_TOP_UP_PATH}
          color="primary"
          size="large"
          fullWidth={true}
          className={classes.button}
        >
          {t('not-enough-balance.submit')}
        </Button>
      </Grid>
    </Grid>
  );
};

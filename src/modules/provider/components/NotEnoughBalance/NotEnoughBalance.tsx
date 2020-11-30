import React from 'react';
import { t } from '../../../../common/utils/intl';
import { ReactComponent as NotEnoughBalanceImage } from './assets/notEnoughBalance.svg';
import { Button, Grid } from '@material-ui/core';
import { useEmptyNodeListStyles } from './NotEnoughBalanceStyles';
import { Headline4 } from '../../../../UiKit/Typography';

interface IEmptyNodeList {
  onSubmit: () => void;
}

export const NotEnoughBalance = ({ onSubmit }: IEmptyNodeList) => {
  const classes = useEmptyNodeListStyles();
  return (
    <Grid container={true} spacing={2} alignItems="center">
      <Grid item={true} md={3} xs={12}>
        <NotEnoughBalanceImage />
      </Grid>
      <Grid item={true} md={9} xs={12}>
        <Headline4 className={classes.title}>
          {t('not-enough-balance.title')}
        </Headline4>
        <Button color="primary" size="large" onClick={onSubmit}>
          {t('not-enough-balance.submit')}
        </Button>
      </Grid>
    </Grid>
  );
};

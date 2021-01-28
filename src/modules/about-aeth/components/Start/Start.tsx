import { Typography } from '@material-ui/core';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { useStartStyles } from './StartStyles';
import { useStart } from './useStart';

export const Start = () => {
  const { onClick } = useStart();
  const classes = useStartStyles();

  return (
    <section className={classes.root}>
      <Curtains>
        <div className={classes.box}>
          <Typography className={classes.title} variant="h3">
            {t('aeth-start.title')}
          </Typography>

          <Typography className={classes.text}>
            {t('aeth-start.text')}
          </Typography>

          <div className={classes.btnWrap}>
            <Button
              className={classes.btn}
              color="primary"
              size="large"
              onClick={onClick}
            >
              {t('aeth-start.start-staking')}
            </Button>
          </div>
        </div>
      </Curtains>
    </section>
  );
};

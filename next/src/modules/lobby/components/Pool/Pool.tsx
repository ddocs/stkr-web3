import * as React from 'react';
import { usePoolStyles } from './PoolStyles';
import { Curtains } from '../../../../UiKit/Curtains';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { PoolTable } from '../PoolTable';
import { Button } from '../../../../UiKit/Button';
import { Headline1 } from '../../../../UiKit/Typography';

interface IPoolProps {
  className?: string;
}

export const Pool = ({ className }: IPoolProps) => {
  const classes = usePoolStyles();

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains className={classes.wrapper}>
        <Headline1 className={classes.title} color="primary" component="h2">
          {t('pool.title')}
        </Headline1>
        <PoolTable className={classes.table} />
        <span className={classes.note}>{t('pool.note')}</span>
        <Button className={classes.button} color="primary" size="large">
          {t('navigation.unlock-your-wallet')}
        </Button>
      </Curtains>
    </section>
  );
};

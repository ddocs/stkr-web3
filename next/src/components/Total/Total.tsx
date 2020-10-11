import * as React from 'react';
import { useTotalStyles } from './TotalStyles';
import classNames from 'classnames';
import { t } from '../../common/utils/intl';

export interface ITotalProps {
  className?: string;
  children?: React.ReactNode;
  reward: number;
  total: number;
}

export const Total = ({ className, reward, total, children }: ITotalProps) => {
  const active = (reward * 100) / total;

  const classes = useTotalStyles({ width: active });

  return (
    <div className={classNames(classes.component, className)}>
      {t('total.out-of', { value: reward, of: total })}
      <span className={classes.range} />
      <div className={classes.extension}>{children}</div>
    </div>
  );
};

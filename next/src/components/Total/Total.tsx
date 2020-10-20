import * as React from 'react';
import { useTotalStyles } from './TotalStyles';
import classNames from 'classnames';
import { t } from '../../common/utils/intl';
import { Range } from '../Range/Range';

const RANGE_WIDTH = 115;

export interface ITotalProps {
  className?: string;
  children?: React.ReactNode;
  reward: number;
  total: number;
}

export const Total = ({ className, reward, total, children }: ITotalProps) => {
  const active = (reward * 100) / total;
  console.log(`--------------`);
  console.log(reward);
  console.log(total);
  console.log(active);
  console.log(`--------------`);

  const classes = useTotalStyles({ width: active });

  return (
    <div className={classNames(classes.component, className)}>
      {t('total.out-of', { value: reward, of: total })}
      <Range className={classes.range} value={active} width={RANGE_WIDTH} />
      <div className={classes.extension}>{children}</div>
    </div>
  );
};

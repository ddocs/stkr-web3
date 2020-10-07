import * as React from 'react';
import { useTotalStyles } from './TotalStyles';
import classNames from 'classnames';

export interface ITotalStoreProps {
  reward: number;
  total: number;
}

interface ITotalProps extends ITotalStoreProps {
  className?: string;
  children?: React.ReactNode;
}

export const Total = ({ className, reward, total, children }: ITotalProps) => {
  const active = (reward * 100) / total;

  const classes = useTotalStyles({ width: active });

  return (
    <div className={classNames(classes.component, className)}>
      {`${reward} / ${total}`}
      <span className={classes.range} />
      <div className={classes.extension}>{children}</div>
    </div>
  );
};

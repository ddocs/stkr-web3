import * as React from 'react';
import { useTotalStyles } from './TotalStyles';
import classNames from 'classnames';
import { NavLink } from '../../../../../UiKit/Link';
import { INDEX_PATH } from '../../../../../common/const';
import { t } from '../../../../../common/utils/intl';

interface ITotalProps {
  className?: string;
  reward: number;
  total: number;
}
export const Total = ({ className, reward, total }: ITotalProps) => {
  const active = (reward * 100) / total;

  const classes = useTotalStyles({ width: active });

  return (
    <div className={classNames(classes.component, className)}>
      {`${reward} / ${total}`}
      <span className={classes.range} />
      <NavLink
        className={classes.button}
        href={INDEX_PATH}
        variant="outlined"
        size="large"
        color="primary"
      >
        {t('navigation.join')}
      </NavLink>
    </div>
  );
};

import React from 'react';
import classNames from 'classnames';
import { useTabsStyles } from './TabsStyles';
import { t } from '../../../../common/utils/intl';
import { ITab } from '../types';
import { uid } from 'react-uid';
import { NavLink } from '../../../../UiKit/NavLink';

interface ITabsProps {
  className?: string;
  value?: string;
  values: ITab[];
}

export const Tabs = ({ className, values }: ITabsProps) => {
  const classes = useTabsStyles({ count: values.length });

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {values.map(value => (
          <li key={uid(value)}>
            <NavLink
              href={value.href}
              className={classes.button}
              activeClassName={classes.active}
              disabled={value.disabled}
            >
              {t(value.label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

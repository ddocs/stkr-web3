import React from 'react';
import classNames from 'classnames';
import { useTabsStyles } from './TabsStyles';
import { t } from '../../../../common/utils/intl';
import { ITab } from '../types';
import { NavLink } from 'react-router-dom';
import { uid } from 'react-uid';

interface ITabsProps {
  className?: string;
  value?: string;
  values: ITab[];
}

export const Tabs = ({ className, values }: ITabsProps) => {
  const classes = useTabsStyles({ count: values.length });

  return (
    <div className={classNames(className, classes.tabs)}>
      <ul className={classes.list}>
        {values.map(value => (
          <li className={classes.item} key={uid(value)}>
            <NavLink
              to={value.href}
              className={classes.button}
              activeClassName={classes.active}
            >
              {t(value.label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

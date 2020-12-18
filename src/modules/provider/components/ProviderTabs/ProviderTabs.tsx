import * as React from 'react';
import { useProviderTabsStyles } from './ProviderTabsStyles';
import classNames from 'classnames';
import { NavLink, useRouteMatch } from 'react-router-dom';

export interface IItemProps {
  label: string;
  path: string;
  route: string;
}

const Item = ({ label, path, route }: IItemProps) => {
  const classes = useProviderTabsStyles();
  const match = useRouteMatch({ path: route, exact: true });

  return (
    <li>
      <NavLink
        className={classNames(classes.tab, match && classes.active)}
        to={path}
      >
        {label}
      </NavLink>
    </li>
  );
};

interface IProviderTabsProps {
  className?: string;
  tabs: { label: string; path: string; route: string }[];
}

export const ProviderTabs = ({ className, tabs }: IProviderTabsProps) => {
  const classes = useProviderTabsStyles();

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {tabs.map(tab => (
          <Item
            label={tab.label}
            path={tab.path}
            route={tab.route}
            key={tab.path}
          />
        ))}
      </ul>
    </div>
  );
};

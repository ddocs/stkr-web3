import * as React from 'react';
import { useProviderTabsStyles } from './ProviderTabsStyles';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { NavLink, useRouteMatch } from 'react-router-dom';
import {
  PROVIDER_NODES_PATH,
  PROVIDER_TOP_UP_PATH,
  PROVIDER_TOP_UP_ROUTE,
} from '../../../../common/const';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';

interface IItemProps {
  to: string;
  route: string;
  label: string;
}

const Item = ({ to, route, label }: IItemProps) => {
  const classes = useProviderTabsStyles();
  const match = useRouteMatch({ path: route, exact: true });

  return (
    <li className={classes.item}>
      <NavLink
        className={classNames(classes.tab, match && classes.active)}
        to={to}
      >
        {label}
      </NavLink>
    </li>
  );
};

interface IProviderTabsProps {
  className?: string;
}

export const ProviderTabs = ({ className }: IProviderTabsProps) => {
  const classes = useProviderTabsStyles();

  const TABS = useLocaleMemo(
    () => [
      {
        label: t('navigation.beacon-list'),
        path: PROVIDER_NODES_PATH,
        route: PROVIDER_NODES_PATH,
      },
      {
        label: t('navigation.top-up'),
        path: PROVIDER_TOP_UP_PATH,
        route: PROVIDER_TOP_UP_ROUTE,
      },
    ],
    [],
  );

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {TABS.map(tab => (
          <Item
            to={tab.path}
            route={tab.route}
            label={tab.label}
            key={tab.path}
          />
        ))}
      </ul>
    </div>
  );
};

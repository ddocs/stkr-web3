import * as React from 'react';
import { useProviderTabsStyles } from './ProviderTabsStyles';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { NavLink, useRouteMatch } from 'react-router-dom';
import {
  PROVIDER_TOP_UP_PATH,
  PROVIDER_NODES_PATH,
} from '../../../../common/const';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';

interface IItemProps {
  to: string;
  label: string;
}

const Item = ({ to, label }: IItemProps) => {
  const classes = useProviderTabsStyles();
  const match = useRouteMatch({ path: to, exact: true });

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
        label: t('navigation.top-up'),
        link: PROVIDER_TOP_UP_PATH,
      },
      {
        label: t('navigation.beacon-list'),
        link: PROVIDER_NODES_PATH,
      },
    ],
    [],
  );

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {TABS.map(tab => (
          <Item to={tab.link} label={tab.label} key={tab.link} />
        ))}
      </ul>
    </div>
  );
};

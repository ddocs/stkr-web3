import * as React from 'react';
import { useProviderTabsStyles } from './ProviderTabsStyles';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { NavLink } from 'react-router-dom';
import {
  PROVIDER_BEACON_CHAIN_PATH,
  PROVIDER_PATH,
} from '../../../../common/const';
import { useState } from 'react';
import { useLocation } from 'react-router';

interface IProviderTabsProps {
  className?: string;
}

enum Tabs {
  micropool = 'micropool',
  beacon = 'beacon',
}

const TABS = [
  {
    value: Tabs.micropool,
    label: 'navigation.micropool-list',
    link: PROVIDER_PATH,
  },
  {
    value: Tabs.beacon,
    label: 'navigation.beacon-list',
    link: PROVIDER_BEACON_CHAIN_PATH,
  },
];

export const ProviderTabs = ({ className }: IProviderTabsProps) => {
  const classes = useProviderTabsStyles();

  const location = useLocation();

  const recognizeDefaultValue = () => {
    if (location.pathname === PROVIDER_BEACON_CHAIN_PATH) {
      return Tabs.beacon;
    } else return Tabs.micropool;
  };

  const defaultValue = recognizeDefaultValue();

  const [value, setValue] = useState(defaultValue);

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {TABS.map(tab => (
          <li className={classes.item} key={tab.value}>
            <NavLink
              className={classNames(
                classes.tab,
                value === tab.value && classes.activeTab,
              )}
              to={tab.link}
              onClick={() => setValue(tab.value)}
            >
              {t(tab.label)}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

import * as React from 'react';
import { useProviderTabsStyles } from './ProviderTabsStyles';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import { NavLink } from 'react-router-dom';
import { PROVIDER_PATH } from '../../../../common/const';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { MICRO_POOL_DATA } from '../../mock';
import { ITablesRowProps } from '../../../../components/TableComponents/types';
import { BEACON_NODE_DATA } from '../BeaconList/mock';
import { useState } from 'react';

interface IProviderTabsStoreProps {
  micropool?: ITablesRowProps[] | undefined;
  beacon?: ITablesRowProps[] | undefined;
}

interface IProviderTabsProps extends IProviderTabsStoreProps {
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
    link: `${PROVIDER_PATH}`,
  },
  {
    value: Tabs.beacon,
    label: 'navigation.beacon-list',
    link: `${PROVIDER_PATH}/beacon`,
  },
];

export const ProviderTabsComponent = ({
  className,
  micropool,
  beacon,
}: IProviderTabsProps) => {
  const classes = useProviderTabsStyles();

  const [value, setValue] = useState(Tabs.micropool);

  return (
    <div className={classNames(classes.component, className)}>
      <ul className={classes.list}>
        {TABS.map(tab => (
          <li className={classes.item}>
            <NavLink
              className={classNames(
                classes.tab,
                value === tab.value && classes.activeTab,
              )}
              to={tab.link}
              onClick={() => setValue(tab.value)}
            >
              {t(tab.label)}
              {'\u00A0'}
              {tab.value === Tabs.micropool &&
                micropool !== undefined &&
                micropool.length > 0 &&
                `(${micropool.length})`}
              {tab.value === Tabs.beacon &&
                beacon !== undefined &&
                beacon.length > 0 &&
                `(${beacon.length})`}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ProviderTabs = connect(
  (state: IStoreState): IProviderTabsStoreProps => {
    return {
      micropool: MICRO_POOL_DATA,
      beacon: BEACON_NODE_DATA,
    };
  },
  {},
)(ProviderTabsComponent);

import * as React from 'react';
import { useProviderDashboardStyles } from './ProviderDashboardStyles';
import { MicropoolList } from '../../components/MicropoolList';
import { BeaconList } from '../../components/BeaconList';
import {
  CREATE_PROVIDERS_BEACON_CHAIN_PATH,
  CREATE_PROVIDERS_MICROPOOL_PATH,
  PROVIDER_BEACON_CHAIN_PATH,
  PROVIDER_PATH,
} from '../../../../common/const';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { ProviderTabs } from '../../components/ProviderTabs';
import { t, tHTML } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { Info } from '../../../../components/Info';
import { NavLink } from '../../../../UiKit/Link';
import { MICRO_POOL_DATA } from '../../mock';
import { IMicropoolListItemProps } from '../../components/MicropoolList/types';

interface IProviderAlreadyStoreProps {
  totalStakersInEthereum: number;
  totalStakers: number;
  micropool?: IMicropoolListItemProps[];
}

interface IProviderAlreadyProps extends IProviderAlreadyStoreProps {
  onCreateMicropool?(): void;
}

export const ProviderDashboardComponent = ({
  totalStakersInEthereum,
  totalStakers,
  micropool,
}: IProviderAlreadyProps) => {
  const classes = useProviderDashboardStyles();

  const location = useLocation();

  const info = [
    {
      caption: 'provider.info.totalStakersInEthereum',
      value: tHTML('units.small-eth', { value: totalStakersInEthereum }),
    },
    {
      caption: 'provider.info.totalStakers',
      value: totalStakers,
    },
    {
      caption: 'provider.info.micropools',
      value: micropool ? micropool.length : 0,
    },
  ];

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        {micropool && micropool.length !== 0 && (
          <Info className={classes.info} data={info} small={true} />
        )}
        <div className={classes.navigation}>
          <ProviderTabs className={classes.tabs} />
          {location.pathname === PROVIDER_PATH && !micropool ? (
            <></>
          ) : (
            <NavLink
              className={classes.create}
              href={
                location.pathname === PROVIDER_PATH
                  ? CREATE_PROVIDERS_MICROPOOL_PATH
                  : CREATE_PROVIDERS_BEACON_CHAIN_PATH
              }
              variant="outlined"
              color="primary"
            >
              {t('navigation.create')}
            </NavLink>
          )}
        </div>
        {location.pathname === PROVIDER_PATH && (
          <MicropoolList className={classes.table} />
        )}
        {location.pathname === PROVIDER_BEACON_CHAIN_PATH && (
          <BeaconList className={classes.table} />
        )}
      </Curtains>
    </section>
  );
};

export const ProviderDashboard = connect(
  (state: IStoreState): IProviderAlreadyStoreProps => {
    return {
      totalStakersInEthereum: 64,
      totalStakers: 2,
      micropool: MICRO_POOL_DATA,
    };
  },
  {},
)(ProviderDashboardComponent);

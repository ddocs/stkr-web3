import * as React from 'react';
import { useProviderDashboardStyles } from './ProviderDashboardStyles';
import { MicropoolList } from '../../components/MicropoolList';
import { BeaconList } from '../../components/BeaconList';
import {
  PROVIDER_BEACON_CHAIN_PATH,
  PROVIDER_PATH,
  CREATE_PROVIDERS_MICROPOOL_PATH,
  CREATE_PROVIDERS_BEACON_CHAIN_PATH,
} from '../../../../common/const';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { ProviderTabs } from '../../components/ProviderTabs';
import { t } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { Info } from '../../../../components/Info';
import { NavLink } from '../../../../UiKit/Link';

interface IProviderAlreadyStoreProps {
  totalStakersInEthereum: number;
  totalStakers: number;
  score: number;
}

interface IProviderAlreadyProps extends IProviderAlreadyStoreProps {
  onCreateMicropool?(): void;
}

export const ProviderAlreadyComponent = ({
  totalStakersInEthereum,
  totalStakers,
  score,
}: IProviderAlreadyProps) => {
  const classes = useProviderDashboardStyles();

  const location = useLocation();

  const info = [
    {
      caption: 'provider.info.totalStakersInEthereum',
      value: `${totalStakersInEthereum} ETH`,
    },
    {
      caption: 'provider.info.totalStakers',
      value: totalStakers,
    },
    {
      caption: 'provider.info.score',
      value: score,
    },
  ];

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Info className={classes.info} data={info} />
        <div className={classes.navigation}>
          <ProviderTabs className={classes.tabs} />
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
      score: 58,
    };
  },
  {},
)(ProviderAlreadyComponent);

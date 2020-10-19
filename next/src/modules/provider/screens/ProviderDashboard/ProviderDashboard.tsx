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
import { ProviderTabs } from '../../components/ProviderTabs';
import { t, tHTML } from '../../../../common/utils/intl';
import { Curtains } from '../../../../UiKit/Curtains';
import { Info } from '../../../../components/Info';
import { NavLink } from '../../../../UiKit/Link';
import { IPool } from '../../../../store/apiMappers/poolsApi';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Query } from '@redux-requests/react';
import { useAction } from '../../../../store/redux';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { QueryError } from '../../../../components/QueryError/QueryError';

interface IProviderDashboardStoreProps {
  totalStakersInEthereum: number;
  totalStakers: number;
  micropool?: IPool[];
}

interface IProviderDashboardProps extends IProviderDashboardStoreProps {
  onCreateMicropool?(): void;
}

export const ProviderDashboardComponent = ({
  totalStakersInEthereum,
  totalStakers,
  micropool,
}: IProviderDashboardProps) => {
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
          <MicropoolList className={classes.table} data={micropool} />
        )}
        {location.pathname === PROVIDER_BEACON_CHAIN_PATH && (
          <BeaconList className={classes.table} />
        )}
      </Curtains>
    </section>
  );
};

const alwaysFalse = () => false;

export const ProviderDashboard = () => {
  const dispatchFetchCurrentProviderMicropools = useAction(
    UserActions.fetchCurrentProviderMicropools,
  );

  useInitEffect(() => {
    dispatchFetchCurrentProviderMicropools();
  });

  return (
    <Query<IPool[]>
      errorComponent={QueryError}
      loadingComponent={QueryLoading}
      isDataEmpty={alwaysFalse}
      type={UserActionTypes.FETCH_CURRENT_PROVIDER_MICROPOOLS}
    >
      {({ data }) => (
        <ProviderDashboardComponent
          totalStakersInEthereum={64}
          totalStakers={2}
          micropool={data}
        />
      )}
    </Query>
  );
};

import * as React from 'react';
import { useProviderAlreadyStyles } from './ProviderAlreadyStyles';
import { MicropoolList } from '../../components/MicropoolList';
import { BeaconList } from '../../components/BeaconList';
import { PROVIDER_PATH } from '../../../../common/const';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { ProviderTabs } from '../../components/ProviderTabs';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import { useCallback } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { Info } from '../../../../components/Info';

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
  const classes = useProviderAlreadyStyles();

  const location = useLocation();

  const handleCreateMicropool = useCallback(() => {
    alert('create micropool');
  }, []);

  const handleBeaconNode = useCallback(() => {
    alert('create beacon node');
  }, []);

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
          <Button
            className={classes.create}
            onClick={
              location.pathname === PROVIDER_PATH
                ? handleCreateMicropool
                : handleBeaconNode
            }
            variant="outlined"
            color="primary"
          >
            {t('navigation.create')}
          </Button>
        </div>
        {location.pathname === PROVIDER_PATH && (
          <MicropoolList className={classes.table} />
        )}
        {location.pathname === `${PROVIDER_PATH}/beacon` && (
          <BeaconList className={classes.table} />
        )}
      </Curtains>
    </section>
  );
};

export const ProviderAlready = connect(
  (state: IStoreState): IProviderAlreadyStoreProps => {
    return {
      totalStakersInEthereum: 64,
      totalStakers: 2,
      score: 58,
    };
  },
  {},
)(ProviderAlreadyComponent);

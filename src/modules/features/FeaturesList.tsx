import cn from 'classnames';
import React, { useState } from 'react';
import {
  ENABLE_AVA,
  ENABLE_DOT,
  ENABLE_KSM,
  PROVIDER_PATH,
  STAKER_AVALANCHE_PATH,
  STAKER_BNB_PATH,
  STAKER_PATH,
  STAKER_STAKE_DOT_ROUTE,
} from '../../common/const';
import { t } from '../../common/utils/intl';
import { ReactComponent as BnbIcon } from './assets/bnb.svg';
import { ReactComponent as EthereumIcon } from './assets/ethereum.svg';
import { ReactComponent as KSMIcon } from './assets/ksm.svg';
import { ReactComponent as PolkadotIcon } from './assets/polkadot.svg';
import { ReactComponent as ProviderIcon } from './assets/provider.svg';
import { ReactComponent as StakeAvalancheIcon } from './assets/stake-avax.svg';
import { FeatureListVerticalItem } from './components/FeatureListVerticalItem/FeatureListVerticalItem';
import { useFeaturesListStyles } from './FeaturesListStyles';

type ActionType = 'Staking' | 'Providing';

export const FeaturesList = () => {
  const classes = useFeaturesListStyles();
  const [currentAction, setCurrentAction] = useState<ActionType>('Staking');

  const handleCurrentActionChange = (newAction: ActionType) => () => {
    setCurrentAction(newAction);
  };

  return (
    <section>
      <div className={classes.toggler}>
        {(['Staking', 'Providing'] as ActionType[]).map(action => (
          <div
            key={action}
            onClick={handleCurrentActionChange(action)}
            className={cn(classes.togglerButton, {
              [classes.activeTogglerButton]: action === currentAction,
            })}
          >
            {action}
          </div>
        ))}
      </div>
      {currentAction === 'Staking' && (
        <div className={classes.container}>
          <FeatureListVerticalItem
            Icon={EthereumIcon}
            title={t('features-list.header.stake-eth')}
            features={[
              t('features-list.list-item.stake-eth.1'),
              t('features-list.list-item.stake-eth.2'),
              t('features-list.list-item.stake-eth.3'),
            ]}
            buttonText={t('features-list.action.stake-eth.mainnet')}
            onClickTo={STAKER_PATH}
          />
          <FeatureListVerticalItem
            Icon={BnbIcon}
            title={t('features-list.header.stake-bnb')}
            features={[
              t('features-list.list-item.stake-bnb.1'),
              t('features-list.list-item.stake-bnb.2'),
              t('features-list.list-item.stake-bnb.3'),
            ]}
            buttonText={t('features-list.action.start-staking')}
            onClickTo={STAKER_BNB_PATH}
          />
          {ENABLE_AVA && (
            <FeatureListVerticalItem
              Icon={StakeAvalancheIcon}
              title={t('features-list.header.stake-avax')}
              features={[
                t('features-list.list-item.stake-avax.1'),
                t('features-list.list-item.stake-avax.2'),
                t('features-list.list-item.stake-avax.3'),
              ]}
              buttonText={t('features-list.action.start-staking')}
              onClickTo={STAKER_AVALANCHE_PATH}
              isNew
            />
          )}
          {ENABLE_DOT && (
            <FeatureListVerticalItem
              Icon={PolkadotIcon}
              title={t('features-list.header.stake-polkadot')}
              features={[]}
              buttonText={t('features-list.action.start-staking')}
              onClickTo={STAKER_STAKE_DOT_ROUTE}
            />
          )}
          {ENABLE_KSM && (
            <FeatureListVerticalItem
              Icon={KSMIcon}
              title={t('features-list.header.stake-ksm')}
              features={[
                t('features-list.list-item.stake-ksm.1'),
                t('features-list.list-item.stake-ksm.2'),
                t('features-list.list-item.stake-ksm.3'),
                t('features-list.list-item.stake-ksm.4'),
              ]}
              buttonText={t('features-list.action.start-staking')}
              onClickTo={''}
            />
          )}
        </div>
      )}
      {currentAction === 'Providing' && (
        <div className={classes.container}>
          <FeatureListVerticalItem
            Icon={ProviderIcon}
            title={t('features-list.header.provider')}
            features={[
              t('features-list.list-item.provider.1'),
              t('features-list.list-item.provider.2'),
              t('features-list.list-item.provider.3'),
            ]}
            buttonText={t('features-list.action.provider')}
            onClickTo={PROVIDER_PATH}
          />
        </div>
      )}
    </section>
  );
};

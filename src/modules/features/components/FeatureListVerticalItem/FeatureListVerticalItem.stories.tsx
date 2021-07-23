import React from 'react';
import { ReactComponent as StakeAvalancheIcon } from '../../assets/stake-avax.svg';
import { FeatureListVerticalItem } from './FeatureListVerticalItem';

export const FeaturesListExample = () => (
  <FeatureListVerticalItem
    Icon={StakeAvalancheIcon}
    title="Stake AVAX"
    features={[
      'Stake any amount of BNB (minimum 1 BNB) to earn staking rewards.',
      'The rewards will be distributed right to the wallet.',
      'Staking BNB directly contributes to the security of the entire network.',
    ]}
    buttonText="Start staking"
    onClickTo=""
  />
);

export default {
  title: 'modules/FeatureListVerticalItem',
};

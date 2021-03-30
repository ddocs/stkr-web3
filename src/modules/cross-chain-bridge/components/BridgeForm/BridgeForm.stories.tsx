/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { BridgeForm, IBridgeFormValues } from './BridgeForm';

export default {
  title: 'modules/CrossChainBridge/components/BridgeForm',
};

export const Default = () => {
  const onSubmit = (values: IBridgeFormValues) => {
    console.log(values);
  };

  return <BridgeForm onSubmit={onSubmit} balance="5.3" />;
};

export const DisabledSubmit = () => {
  const onSubmit = (values: IBridgeFormValues) => {
    console.log(values);
  };

  return (
    <BridgeForm
      onSubmit={onSubmit}
      additionalText={t('transaction-completed.notice')}
      submitDisabled
    />
  );
};

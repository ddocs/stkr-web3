/* eslint-disable import/no-anonymous-default-export */
import BigNumber from 'bignumber.js';
import React from 'react';
import { ClaimForm } from '../ClaimForm';
import { ClaimDialog } from './ClaimDialog';

export default {
  title: 'modules/AvaxStaking/components/ClaimDialog',
};

const DefaultStory = () => {
  const onClose = () => {
    console.log('close');
  };
  const onSubmit = () => {
    console.log('onSubmit');
  };
  return (
    <ClaimDialog isOpened={true} onClose={onClose}>
      <ClaimForm
        loading={false}
        amount={new BigNumber(2)}
        onSubmit={onSubmit}
      />
    </ClaimDialog>
  );
};

export const Default = () => <DefaultStory />;

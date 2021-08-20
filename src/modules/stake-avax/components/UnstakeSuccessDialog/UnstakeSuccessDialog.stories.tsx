/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { UnstakeSuccessDialog } from './UnstakeSuccessDialog';

export default {
  title: 'modules/AvaxStaking/components/UnstakeSuccessDialog',
};

const DefaultStory = () => {
  const onClose = () => {
    console.log('close');
  };
  return <UnstakeSuccessDialog onClose={onClose} isOpened={true} />;
};

export const Default = () => <DefaultStory />;

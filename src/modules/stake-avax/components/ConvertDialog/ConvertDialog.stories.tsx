/* eslint-disable import/no-anonymous-default-export */
import { Button } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import { Curtains } from '../../../../UiKit/Curtains';
import { ConvertDialog, IConvertFormValues } from './ConvertDialog';

export default {
  title: 'modules/AvaxStaking/components/ConvertDialog',
};

export const Default = () => {
  const [isOpened, setIsOpened] = useState(true);

  const onUnstakeClick = () => {
    setIsOpened(true);
  };

  const onCloseClick = () => {
    setIsOpened(false);
  };

  const onSubmit = (values: IConvertFormValues) => {
    console.log(values);
  };

  const isLoading = false;

  return (
    <section>
      <Curtains>
        <Button color="primary" onClick={onUnstakeClick}>
          Convert
        </Button>

        <ConvertDialog
          isBalanceLoading={false}
          balance={new BigNumber('23.5678715432314234213')}
          onSubmit={onSubmit}
          isOpened={isOpened}
          onClose={onCloseClick}
          submitDisabled={isLoading}
          isLoading={isLoading}
        />
      </Curtains>
    </section>
  );
};

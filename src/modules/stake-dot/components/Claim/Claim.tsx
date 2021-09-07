import { useQuery } from '@redux-requests/react';
import React, { useState } from 'react';
import { getBalance, IBalance } from '../../actions/getBalance';
import { ClaimDialog } from '../ClaimDialog';
import { ClaimComponent } from './ClaimComponent';

export const Claim = () => {
  const [isOpened, setIsOpened] = useState(false);

  const { data } = useQuery<IBalance | null>({
    type: getBalance,
  });

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleSubmit = (values: any) => {
    console.log({ values });
  };

  return (
    <>
      <ClaimComponent
        amount={data?.claimable}
        isLoading={false}
        onClaimClick={handleOpen}
      />

      <ClaimDialog
        isOpened={isOpened}
        onClose={handleClose}
        onSubmit={handleSubmit}
        balance={data?.claimable}
      />
    </>
  );
};

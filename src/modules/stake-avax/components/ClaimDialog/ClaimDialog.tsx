import { Box, Dialog, IconButton, Typography } from '@material-ui/core';
import { Mutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useMutationStatus } from '../../../../common/hooks/useMutationStatus';
import { t } from '../../../../common/utils/intl';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { IClaimPayload } from '../../../avalanche-sdk/types';
import { ClaimForm } from '../ClaimForm';
import { useClaimDialogStyles } from './ClaimDialogStyles';

interface IClaimDialogProps {
  amount: BigNumber;
  children?: ReactNode;
}

export const ClaimDialog = ({ children, amount }: IClaimDialogProps) => {
  const classes = useClaimDialogStyles();
  const dispatch = useRequestDispatch();
  const { success } = useMutationStatus(AvalancheActions.claimAAvaxB as any);

  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleClose = useCallback((forceClose = false) => {
    setIsOpened(false);
  }, []);

  useEffect(() => {
    success && handleClose();
  }, [success, handleClose]);

  const element = React.isValidElement(children)
    ? React.cloneElement(children, { onClick: handleOpen })
    : null;

  const handleSubmit = useCallback(
    (payload: IClaimPayload) => {
      dispatch(AvalancheActions.claimAAvaxB(payload)).then(data => {
        if (!data.error) {
          dispatch(AvalancheActions.checkWallet());
        }
        handleClose();
      });
    },
    [dispatch, handleClose],
  );

  return (
    <>
      {element}
      <Dialog
        open={isOpened}
        onClose={handleClose}
        scroll="body"
        fullWidth={true}
        maxWidth="md"
        PaperProps={{ square: false }}
        classes={{ paper: classes.root }}
      >
        <IconButton className={classes.close} onClick={handleClose}>
          <CancelIcon size="xmd" />
        </IconButton>
        <Box mb={5} width={700} m="auto">
          <Typography variant="h2" align="center">
            {t('stake-avax.claim.title')}
          </Typography>
        </Box>
        <MutationErrorHandler type={AvalancheActions.claimAAvaxB.toString()} />
        <Mutation type={AvalancheActions.claimAAvaxB.toString()}>
          {({ loading }) => {
            return (
              <ClaimForm
                loading={loading}
                amount={amount}
                onSubmit={handleSubmit}
              />
            );
          }}
        </Mutation>
      </Dialog>
    </>
  );
};

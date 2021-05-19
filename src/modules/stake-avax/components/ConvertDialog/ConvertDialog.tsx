import { Box, Dialog, IconButton, Typography } from '@material-ui/core';
import React, { ReactNode, useCallback, useState } from 'react';
import { t } from '../../../../common/utils/intl';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { useConvertDialogStyles } from './ConvertDialogStyles';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { Mutation } from '@redux-requests/react';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { ConvertForm } from '../ConvertForm';
import {
  IConvertEstimates,
  IConvertPayload,
} from '../../../avalanche-sdk/types';
import BigNumber from 'bignumber.js';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';

interface IConvertDialogProps {
  amount: BigNumber;
  onReceivedEstimates: (estimates: IConvertEstimates) => void;
  children?: ReactNode;
}

export const ConvertDialog = ({
  children,
  amount,
  onReceivedEstimates,
}: IConvertDialogProps) => {
  const classes = useConvertDialogStyles();
  const dispatch = useRequestDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  const element = React.isValidElement(children)
    ? React.cloneElement(children, { onClick: handleOpen })
    : null;

  const handleSubmit = useCallback(
    (payload: IConvertPayload) => {
      dispatch(AvalancheActions.estimateConvert(payload)).then(data => {
        if (!data.error) {
          onReceivedEstimates(data.data);
          handleClose();
        }
      });
    },
    [dispatch, handleClose, onReceivedEstimates],
  );

  return (
    <>
      {element}
      <Dialog
        open={isOpened}
        onClose={handleClose}
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
            {t('stake-avax.convert.title')}
          </Typography>
        </Box>
        <MutationErrorHandler
          type={AvalancheActions.estimateConvert.toString()}
        />
        <Mutation type={AvalancheActions.estimateConvert.toString()}>
          {({ loading }) => {
            return (
              <ConvertForm
                loading={loading}
                maxAmount={amount}
                onSubmit={handleSubmit}
              />
            );
          }}
        </Mutation>
      </Dialog>
    </>
  );
};

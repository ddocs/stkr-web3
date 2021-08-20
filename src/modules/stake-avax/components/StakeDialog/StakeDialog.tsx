import { Box, Dialog, IconButton, Typography } from '@material-ui/core';
import { Mutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { ReactNode, useCallback, useState } from 'react';
import { t } from '../../../../common/utils/intl';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { StakeForm } from '../StakeForm';
import { useStakeDialogStyles } from './StakeDialogStyles';

interface IStakeDialogProps {
  amount: BigNumber;
  children?: ReactNode;
  onSuccess: () => void;
}

export interface IStakePayload {
  amount: number;
}

export const StakeDialog = ({
  children,
  amount,
  onSuccess,
}: IStakeDialogProps) => {
  const classes = useStakeDialogStyles();
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
    (payload: IStakePayload) => {
      dispatch(AvalancheActions.stake(payload)).then(data => {
        if (!data.error) {
          onSuccess();
          setIsOpened(false);
        }
      });
    },
    [dispatch, onSuccess],
  );

  return (
    <>
      {element}
      <Dialog
        open={isOpened}
        onClose={handleClose}
        fullWidth={true}
        scroll="body"
        maxWidth="md"
        PaperProps={{ square: false }}
        classes={{ paper: classes.root }}
      >
        <IconButton className={classes.close} onClick={handleClose}>
          <CancelIcon size="xmd" />
        </IconButton>
        <Box mb={5}>
          <Typography variant="h2" align="center">
            {t('stake-avax.stake.title')}
          </Typography>
        </Box>
        <MutationErrorHandler type={AvalancheActions.stake.toString()} />
        <Mutation type={AvalancheActions.stake.toString()}>
          {({ loading }) => {
            return (
              <StakeForm
                onSubmit={handleSubmit}
                maxAmount={amount}
                loading={loading}
              />
            );
          }}
        </Mutation>
      </Dialog>
    </>
  );
};

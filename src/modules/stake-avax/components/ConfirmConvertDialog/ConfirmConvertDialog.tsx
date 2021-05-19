import { Box, Button, Dialog, IconButton, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { t } from '../../../../common/utils/intl';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { Mutation } from '@redux-requests/react';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { useMutationStatus } from '../../../../common/hooks/useMutationStatus';
import { IConvertPayload } from '../../../avalanche-sdk/types';
import { useConfirmConvertDialogStyles } from './ConfirmConvertDialogStyles';
import { Form, FormRenderProps } from 'react-final-form';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';

interface IConfirmConvertDialogProps {
  estimate: string;
  amount: BigNumber;
  address: string;
  onSubmit: () => void;
}

export const ConfirmConvertDialog = ({
  estimate,
  amount,
  address,
  onSubmit,
}: IConfirmConvertDialogProps) => {
  const classes = useConfirmConvertDialogStyles();
  const dispatch = useRequestDispatch();
  const [isOpened, setIsOpened] = useState(true);
  const { success } = useMutationStatus(
    AvalancheActions.estimateConvert as any,
  );

  const handleSubmit = useCallback(
    (payload: IConvertPayload) => {
      dispatch(AvalancheActions.convert(payload)).then(data => {
        onSubmit();
        if (!data.error) {
          AvalancheActions.connect();
        }
      });
    },
    [dispatch, onSubmit],
  );

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  useEffect(() => {
    success && handleClose();
  }, [success, handleClose]);

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.body}>
          <div className={classes.wrapper}>
            <Box mb={5} width={700} m="auto">
              <Typography variant="h2" align="center">
                {t('stake-avax.convert.estimate', { amount, estimate })}
              </Typography>
            </Box>
            <Typography variant="body2" align="center">
              {t('stake-avax.convert.estimate-note')}
            </Typography>
            <input name="amount" type="hidden" />
            <input name="address" type="hidden" />
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
            <MutationErrorHandler type={AvalancheActions.convert.toString()} />
            <Mutation type={AvalancheActions.convert.toString()}>
              {({ loading }) => {
                return (
                  <Button
                    color="primary"
                    size="large"
                    className={classes.submit}
                    type="submit"
                    disabled={loading}
                  >
                    {t('stake-avax.convert.confirm')}
                  </Button>
                );
              }}
            </Mutation>
          </div>
        </div>
      </form>
    );
  };

  return (
    <>
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
        <Box mb={5} width={700} m="auto"></Box>
        <Form
          onSubmit={handleSubmit}
          render={renderForm}
          initialValues={{
            address,
            amount: amount.toNumber(),
          }}
        />
      </Dialog>
    </>
  );
};

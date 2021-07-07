import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import React, { useCallback } from 'react';
import { useConnectPokadotDialog } from './useConnectPokadotDialogStyles';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { WalletListItem } from '../../../stake-bnb/screens/WalletListBnb/components/WalletListItem';
import { t } from '../../../../common/utils/intl';
import { fetchPolkadotWalletsAction } from '../../actions/fetchPolkadotWalletsAction';
import { ResponseData } from '../../../../common/types/ResponseData';
import { Queries } from '../../../../components/Queries/Queries';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../../../store/reducers';
import { polkadotSlice } from '../../reducers/polkadotSlice';
import { connectPolkadotAction } from '../../actions/connectPolkadotAction';
import { Mutation, useDispatchRequest } from '@redux-requests/react';

export const ConnectPokadotDialog = () => {
  const dispatch = useDispatch();
  const dispatchRequest = useDispatchRequest();
  const classes = useConnectPokadotDialog();
  const step = useSelector((state: IStoreState) => {
    return state.polkadot.step;
  });

  const handleClose = useCallback(() => {
    dispatch(polkadotSlice.actions.setStep(undefined));
  }, [dispatch]);

  const handleConnect = useCallback(
    (address: string) => {
      dispatchRequest(connectPolkadotAction(address));
      dispatchRequest(polkadotSlice.actions.setStep({ step: 'connection' }));
    },
    [dispatchRequest],
  );

  return (
    <Dialog
      open={step === 'init'}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="md"
      PaperProps={{ square: false }}
    >
      <IconButton className={classes.close} onClick={handleClose}>
        <CancelIcon size="xmd" />
      </IconButton>
      <DialogContent className={classes.content}>
        <Typography variant="h3">
          {t('connect-polkadot-dialog.title')}
        </Typography>
        <Box maxWidth={455} width="100%" mt={13}>
          <Queries<ResponseData<typeof fetchPolkadotWalletsAction>>
            requestActions={[fetchPolkadotWalletsAction]}
          >
            {({ data }) =>
              data?.accounts?.map(item => (
                <Box mb={2}>
                  <WalletListItem
                    name={item.name}
                    address={item.address}
                    onClick={handleConnect}
                  />
                </Box>
              ))
            }
          </Queries>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

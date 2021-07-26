import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Mutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
// import { ConvertDialog } from '../ConvertDialog';
import { DEFAULT_FIXED } from '../../../../common/const';
import { BlockchainNetworkId } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
// import { getStakingSession } from '../../../avalanche-sdk/utils';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
// import { ConvertDialog } from '../ConvertDialog';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { Headline3, Headline5 } from '../../../../UiKit/Typography';
import {
  IConvertEstimates,
  IWalletStatus,
  StakingStep,
} from '../../../avalanche-sdk/types';
import { ConfirmConvertDialog } from '../ConfirmConvertDialog';
import { useConvertStyles } from './ConvertStyles';

interface IConvertProps {
  amount: BigNumber;
  network: BlockchainNetworkId;
  onSuccess: () => void;
  isClaimAvailable: boolean;
}

export const Convert = ({
  amount,
  onSuccess,
  isClaimAvailable,
}: IConvertProps) => {
  const classes = useConvertStyles();
  const [convertEstimates, setConvertEstimates] = useState<
    IConvertEstimates | undefined
  >();
  const [successDialogOpen, openSuccessDialog] = useState(false);

  const dispatchRequest = useRequestDispatch();

  const { data: wallet } = useQuery<IWalletStatus | null>({
    type: AvalancheActions.checkWallet.toString(),
  });

  const handleWithdraw = useCallback(() => {
    if (wallet?.step === StakingStep.WithdrawalAAvaxB) {
      dispatchRequest(AvalancheActions.withdrawAAvaxB(wallet)).then(data => {
        if (data.error) {
          dispatchRequest(AvalancheActions.checkWallet());
        }
        onSuccess();
      });
    }
  }, [dispatchRequest, onSuccess, wallet]);

  // const handleReceivedEstimates = useCallback(
  //   (estimates: IConvertEstimates) => {
  //     setConvertEstimates(estimates);
  //   },
  //   [],
  // );

  const handleSuccessDialogClose = useCallback(() => {
    openSuccessDialog(false);
    // clearStakingSession();
    dispatchRequest(AvalancheActions.checkWallet());
  }, [dispatchRequest]);

  const handleConvertSubmit = useCallback(() => {
    openSuccessDialog(true);
    setConvertEstimates(undefined);
  }, []);

  const renderButtons = useCallback(() => {
    if (isClaimAvailable) {
      return (
        <>
          <MutationErrorHandler
            type={AvalancheActions.withdrawAAvaxB.toString()}
          />
          <Mutation type={AvalancheActions.withdrawAAvaxB.toString()}>
            {({ loading }) => (
              <Button
                color="primary"
                size="large"
                className={classes.button}
                onClick={handleWithdraw}
                disabled={loading}
              >
                {t('stake-avax.convert.finish-claim')}
              </Button>
            )}
          </Mutation>
        </>
      );
    }

    return (
      <Box display="flex" alignItems="center">
        <Tooltip title={t('coming-soon')}>
          <Box display="inline-block">
            <Button
              color="primary"
              size="large"
              className={classes.button}
              disabled
            >
              {t('stake-avax.convert.convert')}
            </Button>
          </Box>
        </Tooltip>

        <Tooltip title={t('stake-avax.convert.claim-summary')}>
          <IconButton className={classes.question}>
            <QuestionIcon size="xs" />
          </IconButton>
        </Tooltip>
      </Box>
    );

    // return (
    //   <Mutation type={AvalancheActions.estimateConvert.toString()}>
    //     {({ loading }) => {
    //       return (
    //         <ConvertDialog
    //           amount={amount}
    //           onReceivedEstimates={handleReceivedEstimates}
    //         >
    //           <Button
    //             color="primary"
    //             size="large"
    //             className={classes.button}
    //             disabled={loading}
    //           >disabled={true}
    //             {t('stake-avax.convert.convert')}
    //           </Button>
    //         </ConvertDialog>
    //       );
    //     }}
    //   </Mutation>
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Paper variant="outlined" square={false} classes={{ root: classes.root }}>
      {!isClaimAvailable && (
        <Typography variant="body1" className={classes.header}>
          {t('stake-avax.dashboard.aavaxb-balance')}
        </Typography>
      )}

      <div className={classes.footer}>
        <Grid container spacing={3} alignItems="center">
          {!isClaimAvailable && amount && (
            <Grid item xs={12} sm="auto">
              <Typography variant="h2">
                {amount.toFixed(DEFAULT_FIXED)}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} sm>
            {renderButtons()}
          </Grid>
        </Grid>
      </div>

      {convertEstimates && (
        <ConfirmConvertDialog
          onSubmit={handleConvertSubmit}
          amount={convertEstimates.amount}
          address={convertEstimates.address}
          estimate={convertEstimates.estimate}
        />
      )}

      <Dialog
        open={successDialogOpen}
        onClose={handleSuccessDialogClose}
        fullWidth={true}
        maxWidth="md"
        PaperProps={{ square: false }}
        classes={{ paper: classes.dialogRoot }}
      >
        <IconButton
          className={classes.close}
          onClick={handleSuccessDialogClose}
        >
          <CancelIcon size="xmd" />
        </IconButton>
        <Box mb={5} width={700} m="auto">
          <Headline3 classes={{ root: classes.title }}>
            {t('stake-avax.convert.convert-success')}
          </Headline3>
          <Headline5 classes={{ root: classes.title }}>
            {t('stake-avax.convert.convert-summary')}
          </Headline5>
        </Box>
        <div className={classes.dialogFooter}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
            <Button
              color="primary"
              size="large"
              className={classes.button}
              onClick={handleSuccessDialogClose}
            >
              {t('stake-avax.convert.ok')}
            </Button>
          </div>
        </div>
      </Dialog>
    </Paper>
  );
};

import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { useConvertStyles } from './ConvertStyles';
import { t } from '../../../../common/utils/intl';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import BigNumber from 'bignumber.js';
// import { ConvertDialog } from '../ConvertDialog';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { Mutation } from '@redux-requests/react';
import { ConfirmConvertDialog } from '../ConfirmConvertDialog';
import { IConvertEstimates } from '../../../avalanche-sdk/types';
// import { getStakingSession } from '../../../avalanche-sdk/utils';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Body2, Headline3, Headline5 } from '../../../../UiKit/Typography';
import classNames from 'classnames';
// import { ConvertDialog } from '../ConvertDialog';
import { useClaimState } from '../../hooks/useClaimState';

interface IConvertProps {
  amount: BigNumber;
  network: string;
  onSuccess: () => void;
}

export const Convert = ({ amount, onSuccess }: IConvertProps) => {
  const classes = useConvertStyles();
  const [convertEstimates, setConvertEstimates] = useState<
    IConvertEstimates | undefined
  >();
  const [successDialogOpen, openSuccessDialog] = useState(false);

  const dispatchRequest = useRequestDispatch();

  const {
    isPendingClaim,
    isInProgress,
    isValidRecipient: isCorrectAccountConnected,
    recipient,
  } = useClaimState();

  const handleWithdraw = useCallback(() => {
    dispatchRequest(AvalancheActions.withdrawAAvaxB()).then(data => {
      if (data.error) {
        dispatchRequest(AvalancheActions.checkWallet());
      }
      onSuccess();
    });
  }, [dispatchRequest, onSuccess]);

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
    if (isPendingClaim) {
      if (isCorrectAccountConnected) {
        return (
          <Mutation type={AvalancheActions.withdrawAAvaxB.toString()}>
            {({ loading }) => (
              <Button
                color="primary"
                size="large"
                className={classes.button}
                onClick={handleWithdraw}
                disabled={loading || isInProgress}
              >
                {t('stake-avax.convert.finish-claim')}
              </Button>
            )}
          </Mutation>
        );
      }

      return (
        <Body2 className={classes.warning} color="secondary" component="p">
          {t('stake-avax.error.to-address')}
          <Body2 color="textPrimary" component="span">
            &nbsp;
            {recipient}
          </Body2>
        </Body2>
      );
    }

    return (
      <div>
        <Tooltip title={t('coming-soon')}>
          <Box display="inline-block">
            <Button
              color="primary"
              size="large"
              className={classes.button}
              disabled={true}
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
      </div>
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
  }, [isPendingClaim]);
  return (
    <Paper variant="outlined" square={false} classes={{ root: classes.root }}>
      <Typography variant="body1" className={classes.header}>
        {t('stake-avax.dashboard.aavaxb-balance')}
      </Typography>
      <div className={classes.footer}>
        {amount && <Typography variant="h2">{amount.toFixed(4)}</Typography>}
        <Box display="flex" alignItems="center">
          {renderButtons()}
        </Box>
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

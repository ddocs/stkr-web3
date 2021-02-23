import React, { ReactNode, useCallback, useState } from 'react';
import { useAnkrInstructionsVideoDialogStyles } from './ClaimDialogStyles';
import {
  Box,
  Button,
  Dialog,
  Divider,
  Hidden,
  IconButton,
  Typography,
} from '@material-ui/core';
import { CancelIcon } from '../../../../../../UiKit/Icons/CancelIcon';
import { t } from '../../../../../../common/utils/intl';
import { AEthIcon } from '../../../../../../UiKit/Icons/AEthIcon';
import BigNumber from 'bignumber.js';
import { DEFAULT_FIXED } from '../../../../../../common/const';
import { UserActions } from '../../../../../../store/actions/UserActions';
import { useRequestDispatch } from '../../../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../../../components/MutationErrorHandler/MutationErrorHandler';
import { FEthIcon } from '../../../../../../UiKit/Icons/FEthIcon';
import { useMutation } from '@redux-requests/react';
import { useFeaturesAvailable } from '../../../../../../common/hooks/useFeaturesAvailable';

interface IClaimDialogProps {
  children?: ReactNode;
  aETHBalance: BigNumber;
  fETHBalance: BigNumber;
}

export const ClaimDialog = ({
  children,
  aETHBalance,
  fETHBalance,
}: IClaimDialogProps) => {
  const classes = useAnkrInstructionsVideoDialogStyles();

  const dispatch = useRequestDispatch();

  const { isAEthClaimAlwaysAvailable } = useFeaturesAvailable();

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

  const handleClaimFEth = useCallback(() => {
    dispatch(UserActions.claimFETH()).then(({ error }) => {
      if (!error) {
        setIsOpened(false);
      }
    });
  }, [dispatch]);

  const handleClaimAEth = useCallback(() => {
    dispatch(UserActions.claimAETH()).then(({ error }) => {
      if (!error) {
        setIsOpened(false);
      }
    });
  }, [dispatch]);
  const { loading: isClaimAETHLoading } = useMutation({
    type: UserActions.claimAETH.toString(),
  });
  const { loading: isClaimFETHLoading } = useMutation({
    type: UserActions.claimFETH.toString(),
  });

  const isLoading = isClaimAETHLoading || isClaimFETHLoading;

  return (
    <>
      {element}
      <MutationErrorHandler
        type={UserActions.claimAETH.toString()}
        resetOnShow={false}
      />
      <MutationErrorHandler
        type={UserActions.claimFETH.toString()}
        resetOnShow={false}
      />
      <Dialog
        open={isOpened}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        PaperProps={{ square: false }}
      >
        <IconButton className={classes.close} onClick={handleClose}>
          <CancelIcon size="xmd" />
        </IconButton>
        <Box mb={5}>
          <Typography variant="h2" align="center">
            {t('claim-dialog.title')}
          </Typography>
        </Box>
        <Divider className={classes.divider} />
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', sm: '1fr 1px 1fr' }}
          gridGap={32}
          mb={-5.5}
        >
          <div className={classes.column}>
            <Box mb={3} display="flex" justifyContent="center">
              <Typography variant="h4" className={classes.tokenTitle}>
                <AEthIcon size="xl" />
                <Box ml={1}>{t('claim-dialog.token-name.aETH')}</Box>
              </Typography>
            </Box>

            <Typography variant="body2" className={classes.text}>
              {t('claim-dialog.description.aETH')}
            </Typography>

            <Box mt="auto" maxWidth={280} width="100%" ml="auto" mr="auto">
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth={true}
                onClick={handleClaimAEth}
                disabled={
                  (aETHBalance.isLessThanOrEqualTo(0) &&
                    !isAEthClaimAlwaysAvailable) ||
                  isLoading
                }
              >
                {isAEthClaimAlwaysAvailable
                  ? t('claim-dialog.submit.claim-aETH')
                  : t('claim-dialog.submit.aETH', {
                      value: aETHBalance
                        .decimalPlaces(DEFAULT_FIXED)
                        .toNumber(),
                    })}
              </Button>
            </Box>
          </div>
          <Hidden xsDown>
            <Divider orientation="vertical" />
          </Hidden>
          <Hidden smUp>
            <Divider orientation="horizontal" />
          </Hidden>
          <div className={classes.column}>
            <Box mb={3} display="flex" justifyContent="center">
              <Typography variant="h4" className={classes.tokenTitle}>
                <FEthIcon size="xl" />
                <Box ml={1}>{t('claim-dialog.token-name.fETH')}</Box>
              </Typography>
            </Box>

            <Typography variant="body2" className={classes.text}>
              {t('claim-dialog.description.fETH')}
            </Typography>

            <Box mt="auto" maxWidth={280} width="100%" ml="auto" mr="auto">
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth={true}
                onClick={handleClaimFEth}
                disabled={fETHBalance.isLessThanOrEqualTo(0) || isLoading}
              >
                {t('claim-dialog.submit.fETH', {
                  value: fETHBalance.decimalPlaces(DEFAULT_FIXED).toNumber(),
                })}
              </Button>
            </Box>
          </div>
        </Box>
      </Dialog>
    </>
  );
};

import React, { useCallback } from 'react';
import { useRulesDialogStyles } from './RulesDialogStyles';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { t } from '../../../../common/utils/intl';
import { NavLink } from 'react-router-dom';
import {
  ANKR_DEPOSIT_LINK,
  GOVERNANCE_CREATE_PROJECT_PATH,
  isMainnet,
} from '../../../../common/const';
import { ReactComponent as InfoIcon } from '../../assets/info.svg';
import { UserActions } from '../../../../store/actions/UserActions';
import { useDispatch } from 'react-redux';

interface IRulesDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  hasEnoughBalance: boolean;
}

export const RulesDialog = ({
  isOpened,
  handleClose,
  hasEnoughBalance,
}: IRulesDialogProps) => {
  const classes = useRulesDialogStyles();

  const dispatch = useDispatch();

  const handleDeposit = useCallback(() => {
    dispatch(UserActions.faucet());
  }, [dispatch]);

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
      classes={{ paper: classes.dialogPaper }}
      BackdropProps={{
        children: (
          <IconButton className={classes.close} onClick={handleClose}>
            <CancelIcon size="xmd" />
          </IconButton>
        ),
      }}
    >
      <DialogContent>
        <Box mb={2.5}>
          <Typography variant="h2" align="center">
            {t('rules-dialog.title')}
          </Typography>
        </Box>
        <Box mb={6.5}>
          <Typography variant="body2" align="center" color="textSecondary">
            {t('rules-dialog.subtitle')}
          </Typography>
        </Box>
        <ul className={classes.list}>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('rules-dialog.item.1')}
          </Typography>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('rules-dialog.item.2')}
          </Typography>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('rules-dialog.item.3')}
          </Typography>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('rules-dialog.item.4')}
          </Typography>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('rules-dialog.item.5')}
          </Typography>
        </ul>
        {!hasEnoughBalance && (
          <div className={classes.tip}>
            <InfoIcon className={classes.icon} />
            <Typography variant="body2">{t('rules-dialog.tip')}</Typography>
          </div>
        )}
        <Box maxWidth={276} margin="0 auto">
          {hasEnoughBalance ? (
            <Button
              component={NavLink}
              to={GOVERNANCE_CREATE_PROJECT_PATH}
              size="large"
              fullWidth={true}
              color="primary"
            >
              {t('rules-dialog.submit')}
            </Button>
          ) : (
            <>
              {isMainnet ? (
                <Button size="large" fullWidth={true} color="primary">
                  <a
                    href={ANKR_DEPOSIT_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.link}
                  >
                    {t('rules-dialog.buy-ankr')}
                  </a>
                </Button>
              ) : (
                <Button
                  size="large"
                  fullWidth={true}
                  color="primary"
                  onClick={handleDeposit}
                >
                  {t('rules-dialog.buy-ankr')}
                </Button>
              )}
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

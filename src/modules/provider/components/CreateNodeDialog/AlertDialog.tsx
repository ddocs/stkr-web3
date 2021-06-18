import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from '@material-ui/core';
import { t } from '../../../../common/utils/intl';
import { OpenedFromName } from '../../screens/ProviderDashboard/ProviderDashboard';
import { useAlertDialogStyles } from './AlertDialogStyles';
import { ReactComponent as CloseImage } from './asserts/close.svg';
import { ReactComponent as AlertImage } from './asserts/alert.svg';

interface IAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  openedFrom: OpenedFromName;
}

export const AlertDialog = ({
  isOpen,
  onClose,
  openedFrom,
}: IAlertDialogProps) => {
  const classes = useAlertDialogStyles();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.header}>
          <CloseImage className={classes.iconClose} onClick={onClose} />
        </Box>
        <Box className={classes.content}>
          <AlertImage className={classes.iconAlert} />
          <Typography variant="h4" className={classes.title}>
            {t('provider-dashboard.capacity-alert')}
          </Typography>
          <Typography variant="subtitle1">
            {t(
              `provider-dashboard.create-node-options.${openedFrom}.alert-message`,
            )}
          </Typography>
        </Box>
        <Box className={classes.footer}>
          <Divider className={classes.divider} orientation="horizontal" />
          <Box className={classes.buttonContainer}>
            <Button
              className={classes.buttonClose}
              color="primary"
              size="large"
              onClick={onClose}
              fullWidth={true}
            >
              {t('provider-dashboard.close')}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

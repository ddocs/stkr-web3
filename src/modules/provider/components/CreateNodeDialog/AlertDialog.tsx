import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Link,
  Typography,
} from '@material-ui/core';
import { t } from '../../../../common/utils/intl';
import { useAlertDialogStyles } from './AlertDialogStyles';
import { ReactComponent as CloseImage } from './asserts/close.svg';
import { ReactComponent as AlertImage } from './asserts/alert.svg';
import { ANKR_DEPLOY_PATH } from '../../const';

interface IAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertDialog = ({ isOpen, onClose }: IAlertDialogProps) => {
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
          <Typography variant="subtitle1" className={classes.description}>
            {t('provider-dashboard.ankr-provider-node')}
          </Typography>
        </Box>
        <Box className={classes.footer}>
          <Divider className={classes.divider} orientation="horizontal" />
          <Box className={classes.buttonContainer}>
            <Link href={ANKR_DEPLOY_PATH} target="_blank">
              <Button
                className={classes.buttonContinue}
                color="primary"
                size="large"
                variant="outlined"
                onClick={() => console.log(111, 'button')}
                fullWidth={true}
              >
                {t('provider-dashboard.continue-anyway')}
              </Button>
            </Link>
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

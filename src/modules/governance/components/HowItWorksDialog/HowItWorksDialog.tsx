import React from 'react';
import { useHowItWorksDialogStyles } from './HowItWorksDialogStyles';
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

interface IHowItWorksDialogProps {
  isOpened: boolean;
  handleClose: () => void;
}

export const HowItWorksDialog = ({
  isOpened,
  handleClose,
}: IHowItWorksDialogProps) => {
  const classes = useHowItWorksDialogStyles();

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
            {t('how-it-works-dialog.title')}
          </Typography>
        </Box>
        <ul className={classes.list}>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('how-it-works-dialog.item.1')}
          </Typography>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('how-it-works-dialog.item.2')}
          </Typography>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('how-it-works-dialog.item.3')}
          </Typography>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('how-it-works-dialog.item.4')}
          </Typography>
          <Typography variant="body2" component="li" className={classes.item}>
            {t('how-it-works-dialog.item.5')}
          </Typography>
        </ul>
        <Box maxWidth={276} margin="0 auto">
          <Button
            size="large"
            fullWidth={true}
            color="primary"
            onClick={handleClose}
          >
            {t('how-it-works-dialog.submit')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

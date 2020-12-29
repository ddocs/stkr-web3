import React from 'react';
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
import { GOVERNANCE_CREATE_PROJECT_PATH } from '../../../../common/const';

interface IRulesDialogProps {
  isOpened: boolean;
  handleClose: () => void;
}

export const RulesDialog = ({ isOpened, handleClose }: IRulesDialogProps) => {
  const classes = useRulesDialogStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
      classes={{ paper: classes.dialogPaper }}
      BackdropProps={{
        children: (
          <IconButton className={classes.close}>
            <CancelIcon onClick={handleClose} size="xmd" />
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
            {t('For any proposal, the following rules have been defined')}
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
        <Box maxWidth={276} margin="0 auto">
          <Button
            component={NavLink}
            to={GOVERNANCE_CREATE_PROJECT_PATH}
            size="large"
            fullWidth={true}
            color="primary"
          >
            {t('rules-dialog.submit')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

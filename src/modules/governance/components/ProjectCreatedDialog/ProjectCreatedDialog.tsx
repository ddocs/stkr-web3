import React from 'react';
import { useProjectCreatedDialogStyles } from './ProjectCreatedDialogStyles';
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
import { GOVERNANCE_PROJECT_LIST_PATH } from '../../../../common/const';

interface IProjectCreatedProps {
  isOpened: boolean;
  handleClose: () => void;
}

export const ProjectCreatedDialog = ({
  isOpened,
  handleClose,
}: IProjectCreatedProps) => {
  const classes = useProjectCreatedDialogStyles();

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
            {t('project-created-dialog.title')}
          </Typography>
        </Box>
        <Box mb={6.5}>
          <Typography variant="body2" align="center" color="textSecondary">
            {t('project-created-dialog.subtitle')}
          </Typography>
        </Box>
        <Box maxWidth={276} margin="0 auto">
          <Button
            component={NavLink}
            to={GOVERNANCE_PROJECT_LIST_PATH}
            size="large"
            fullWidth={true}
            color="primary"
          >
            {t('project-created-dialog.submit')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

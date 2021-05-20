import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { PROVIDER_CREATE_NODE_PATH } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { CloseIcon } from '../../../../UiKit/Icons/CloseIcon';
import { useCreateNodeDialogStyles } from './CreateNodeDialogStyles';

const ANKR_ITEMS = [
  t('provider-dashboard.create-node-options.ankr.zero-slashing'),
  t('provider-dashboard.create-node-options.ankr.no-hardware'),
  t('provider-dashboard.create-node-options.ankr.few-clicks'),
];

const OWN_NODE_ITEMS = [
  t('provider-dashboard.create-node-options.own-node.configure-manually'),
  t('provider-dashboard.create-node-options.own-node.manage-yourself'),
  t('provider-dashboard.create-node-options.own-node.slashing'),
];

interface ICreateNodeDialogProps {
  isOpened: boolean;
  handleClose: () => void;
  handleAlertOpen: () => void;
}

export const CreateNodeDialog = ({
  isOpened,
  handleClose,
  handleAlertOpen,
}: ICreateNodeDialogProps) => {
  const classes = useCreateNodeDialogStyles();

  const renderButton = useCallback(
    (action?) => (
      <Button
        color="primary"
        size="large"
        onClick={action}
        fullWidth={true}
        className={classes.button}
      >
        {t('provider-dashboard.continue')}
      </Button>
    ),
    [classes.button],
  );

  return (
    <>
      <Dialog
        open={isOpened}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        scroll="body"
        classes={{ paper: classes.dialogPaper }}
        BackdropProps={{
          children: (
            <IconButton
              className={classNames(classes.close, classes.closeTabletUp)}
              onClick={handleClose}
            >
              <CancelIcon size="xmd" />
            </IconButton>
          ),
        }}
      >
        <DialogContent className={classes.root}>
          <div className={classes.side}>
            <Typography variant="h3">
              {t('provider-dashboard.deploy-with-ankr')}
            </Typography>

            <ul className={classes.items}>
              {ANKR_ITEMS.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {renderButton(() => {
              handleAlertOpen();
            })}
          </div>

          <div className={classes.separator} />

          <div className={classes.side}>
            <Typography variant="h3">
              {t('provider-dashboard.configure-own-node')}
            </Typography>

            <ul className={classes.items}>
              {OWN_NODE_ITEMS.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <NavLink to={PROVIDER_CREATE_NODE_PATH}>
              {renderButton(() => {
                handleClose();
              })}
            </NavLink>
          </div>

          <IconButton
            className={classNames(classes.close, classes.closeMobile)}
            onClick={handleClose}
          >
            <CloseIcon size="sm" />
          </IconButton>
        </DialogContent>
      </Dialog>
    </>
  );
};

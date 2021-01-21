import React, { useCallback } from 'react';
import { useCreateNodeDialogStyles } from './CreateNodeDialogStyles';
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  Typography,
} from '@material-ui/core';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { t } from '../../../../common/utils/intl';
import { NavLink } from 'react-router-dom';
import { PROVIDER_CREATE_NODE_PATH } from '../../../../common/const';
import { ANKR_DEPLOY_PATH } from '../../const';

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
}

export const CreateNodeDialog = ({
  isOpened,
  handleClose,
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
    <Dialog
      open={isOpened}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="lg"
      classes={{ paper: classes.dialogPaper }}
      BackdropProps={{
        children: (
          <IconButton className={classes.close} onClick={handleClose}>
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
          <Link href={ANKR_DEPLOY_PATH} target="_blank">
            {renderButton()}
          </Link>
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
      </DialogContent>
    </Dialog>
  );
};

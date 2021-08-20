import { Container, Dialog, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { useUnstakeSuccessDialogStyles } from './useUnstakeSuccessDialogStyles';

interface IUnstakeSuccessDialogProps {
  maxTimeLeft?: string;
  isOpened?: boolean;
  onClose?: () => void;
}

export const UnstakeSuccessDialog = ({
  maxTimeLeft = t('time.days', { days: 1 }),
  isOpened = false,
  onClose,
}: IUnstakeSuccessDialogProps) => {
  const classes = useUnstakeSuccessDialogStyles();

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ square: false }}
      classes={{ paper: classes.root }}
      scroll="body"
    >
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.title}>
          {t('stake-avax.unstake-success.title', {
            time: maxTimeLeft,
          })}
        </Typography>

        <Typography color="textSecondary" variant="body2">
          {t('stake-avax.unstake-success.descr')}
        </Typography>
      </Container>

      <div className={classes.footer}>
        <Container className={classes.container}>
          <Button
            className={classes.btn}
            size="large"
            color="primary"
            fullWidth
            onClick={onClose}
          >
            {t('stake-avax.unstake-success.btn')}
          </Button>
        </Container>
      </div>

      <IconButton className={classes.closeBtn} onClick={onClose}>
        <CancelIcon size="xmd" />
      </IconButton>
    </Dialog>
  );
};

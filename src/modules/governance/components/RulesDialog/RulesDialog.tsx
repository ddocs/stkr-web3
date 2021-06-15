import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { uid } from 'react-uid';
import {
  ANKR_DEPOSIT_LINK,
  GOVERNANCE_CREATE_PROJECT_PATH,
  isMainnet,
} from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { CloseIcon } from '../../../../UiKit/Icons/CloseIcon';
import { ReactComponent as InfoIcon } from '../../assets/info.svg';
import { useRulesDialogStyles } from './RulesDialogStyles';
import { useQuery } from '@redux-requests/react';

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

  const { data: minimumDeposit } = useQuery({
    type: UserActionTypes.FETCH_MINIMUM_DEPOSIT,
  });
  useEffect(() => {
    dispatch(UserActions.fetchMinimumDeposit());
  }, [dispatch]);

  const handleDeposit = useCallback(() => {
    dispatch(UserActions.faucet());
  }, [dispatch]);

  const paragraphs = useMemo(
    () => [
      t('rules-dialog.item.1'),
      t('rules-dialog.item.2', { value: minimumDeposit }),
      t('rules-dialog.item.3'),
      t('rules-dialog.item.4'),
      t('rules-dialog.item.5'),
    ],
    [minimumDeposit],
  );

  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
      scroll="body"
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogContent className={classes.dialogContent}>
        <Box mb={2.5}>
          <Typography variant="h2" align="center" className={classes.title}>
            {t('rules-dialog.title')}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          className={classes.text}
        >
          {t('rules-dialog.subtitle')}
        </Typography>

        <ul
          className={classNames(
            classes.list,
            hasEnoughBalance && classes.listBigOffset,
          )}
        >
          {paragraphs.map(text => (
            <Typography
              variant="body2"
              component="li"
              className={classes.item}
              key={uid(text)}
            >
              {text}
            </Typography>
          ))}
        </ul>

        {!hasEnoughBalance && (
          <div className={classes.warning}>
            <InfoIcon className={classes.warningIcon} />

            <Typography variant="body2" color="textPrimary">
              {t('rules-dialog.tip')}
            </Typography>
          </div>
        )}

        <Box className={classes.btnWrap}>
          {hasEnoughBalance ? (
            <Button
              component={NavLink}
              to={GOVERNANCE_CREATE_PROJECT_PATH}
              size="large"
              fullWidth={true}
              color="primary"
              onClick={handleClose}
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
                    onClick={handleClose}
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

        <IconButton className={classes.close} onClick={handleClose}>
          <CloseIcon size="sm" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

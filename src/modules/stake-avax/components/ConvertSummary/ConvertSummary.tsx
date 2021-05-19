import { Hidden, IconButton, Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { CloseIcon } from '../../../../UiKit/Icons/CloseIcon';
import { InputField } from '../../../../UiKit/InputField';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { useConvertSummaryStyles } from './ConvertSummaryStyles';

export const MAX_AMOUNT = 32;

export interface IStakePayload {
  amount: number;
  agreement: boolean;
}

export interface IConvertSummaryProps {
  onSubmit: (payload: IStakePayload) => void;
  onCancel: () => void;
}

export const ConvertSummary = ({
  onSubmit,
  onCancel,
}: IConvertSummaryProps) => {
  const classes = useConvertSummaryStyles();

  const validateStakeForm = useCallback(
    ({ amount }: IStakePayload) => ({}),
    [],
  );
  const renderForm = ({
    handleSubmit,
    values: { amount },
  }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.body}>
          <div className={classes.wrapper}>
            <Headline2 classes={{ root: classes.title }}>
              {t('stake-avax.convert.summary')}
            </Headline2>
            <Typography className={classes.subSummary}>
              {t('stake-avax.convert.sub-summary')}
            </Typography>
          </div>
        </div>

        <div className={classes.footer}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
            <Button
              color="primary"
              size="large"
              className={classes.submit}
              type="submit"
            >
              {t('stake-avax.convert.continue')}
            </Button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <section className={classes.root}>
      <Curtains classes={{ root: classes.container }}>
        <Paper className={classes.box} variant="outlined" square={false}>
          <Form
            onSubmit={onSubmit}
            render={renderForm}
            validate={validateStakeForm}
          />

          <IconButton
            disableTouchRipple={false}
            focusRipple={false}
            disableFocusRipple={false}
            disableRipple={false}
            className={classes.cancel}
            onClick={onCancel}
          >
            <Hidden smUp>
              <CloseIcon size="sm" />
            </Hidden>

            <Hidden xsDown>
              <CancelIcon size="xmd" />
            </Hidden>
          </IconButton>
        </Paper>
      </Curtains>
    </section>
  );
};

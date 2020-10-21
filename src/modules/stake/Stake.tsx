import React from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { useStakeStyles } from './StakeStyles';
import { Body2, Headline2, Headline3, Headline6 } from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { CancelIcon } from '../../UiKit/Icons/CancelIcon';
import { BackgroundColorProvider } from '../../UiKit/BackgroundColorProvider';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { QuestionIcon } from '../../UiKit/Icons/QuestionIcon';
import { SliderField } from '../../UiKit/RangeField';
import { StkrSdk } from '../api';

const MIN_AMOUNT = 0.5;
const MAX_AMOUNT = 32;
const INIT_AMOUNT = 10;

export const Stake = () => {
  const classes = useStakeStyles({});
  const renderForm = ({
    handleSubmit,
    values: { amount },
  }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <BackgroundColorProvider className={classes.content}>
          <IconButton
            disableTouchRipple={false}
            focusRipple={false}
            disableFocusRipple={false}
            disableRipple={false}
            className={classes.cancel}
          >
            <CancelIcon size="md" />
          </IconButton>
          <Headline2 align="center" className={classes.header}>
            Ankr pool 3
          </Headline2>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Headline2>{t('stake.i-want')}</Headline2>
            <Headline2>{t('units.eth', { value: amount })}</Headline2>
          </Box>
          <Box mb={2}>
            <Field
              component={SliderField}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              name="amount"
            />
            <FormHelperText error={true} className={classes.amountError}>
              {t('stake.validation.balance-exceed')}
            </FormHelperText>
          </Box>

          <Box mb={6} display="flex" justifyContent="space-between">
            <Typography className={classes.label}>
              {t('stake.staking-period')}
              <Tooltip title={t('stake.staking-period-tooltip')}>
                <IconButton className={classes.question}>
                  <QuestionIcon size="xs" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Headline6>{t('units.~months', { value: 12 })}</Headline6>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            mb={1}
          >
            <Typography>
              {t('stake.yearly-earning')}
              <Tooltip title={t('stake.yearly-earning-tooltip')}>
                <IconButton className={classes.question}>
                  <QuestionIcon size="xs" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Headline3>{t('units.~eth', { value: 14.339 })}</Headline3>
          </Box>
          <Box>
            <Body2 color="textSecondary">{t('stake.yearly-earning-tip')}</Body2>
          </Box>
        </BackgroundColorProvider>
        <Divider />
        <BackgroundColorProvider className={classes.footer}>
          <Button
            fullWidth={true}
            color="secondary"
            size="large"
            className={classes.submit}
            type="submit"
          >
            {t('stake.stake')}
          </Button>
        </BackgroundColorProvider>
      </form>
    );
  };

  return (
    <section className={classes.component}>
      <Curtains classes={{ root: classes.wrapper }}>
        <Form
          onSubmit={async values => {
            /* TODO: "fix me with actions" */
            const { amount } = values;
            const sdk = StkrSdk.getLastInstance();
            const txHash = await sdk.stake(`${amount}`);
            console.log(`tx hash is ${txHash}`);
          }}
          render={renderForm}
          initialValues={{ amount: INIT_AMOUNT }}
        />
        <Typography color="textSecondary" className={classes.note}>
          {t('stake.note')}
        </Typography>
      </Curtains>
    </section>
  );
};

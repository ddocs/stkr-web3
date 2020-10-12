import React from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { useStakeStyles } from './StakeStyles';
import {
  Body2,
  Headline1,
  Headline2,
  Headline3,
  Headline6,
} from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import { Box, Button, IconButton, Tooltip } from '@material-ui/core';
import { CancelIcon } from '../../UiKit/Icons/CancelIcon';
import { BackgroundColorProvider } from '../../UiKit/BackgroundColorProvider';
import { Range } from '../../components/Range/Range';
import { TwitterIcon } from '../../UiKit/Icons/TwitterIcon';
import { CopyIcon } from '../../UiKit/Icons/CopyIcon';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { QuestionIcon } from '../../UiKit/Icons/QuestionIcon';
import { InputField } from '../../UiKit/InputField';

export const Stake = () => {
  const classes = useStakeStyles({});
  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
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
          <Box display="flex" justifyContent="center" mb={4}>
            <Headline2 align="center" className={classes.header}>
              Ankr pool 3
              <Body2 className={classes.brand}>{t('stake.ankr')}</Body2>
            </Headline2>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Body2>{t('stake.range-name')}</Body2>
            <Body2 color="textSecondary">
              {t('stake.out-of-ETH', { value: 3.35, of: 32 })}
            </Body2>
          </Box>
          <Box mb={6}>
            <Range value={50} />
          </Box>
          <Box mb={7.5} display="flex" justifyContent="space-between">
            <Headline1>{t('stake.i-want')}</Headline1>
            <Field
              InputProps={{
                classes: { input: classes.input },
              }}
              component={InputField}
              name="number"
              color="primary"
            />
          </Box>
          <Box mb={7.5} display="flex" justifyContent="space-between">
            <Headline6>
              {t('stake.staking-period')}
              <Tooltip title={t('stake.staking-period-tooltip')}>
                <IconButton className={classes.question}>
                  <QuestionIcon size="xs" />
                </IconButton>
              </Tooltip>
            </Headline6>
            <Headline6>{t('units.~months', { value: 12 })}</Headline6>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            mb={2}
          >
            <Headline6>
              {t('stake.yearly-earning')}
              <Tooltip title={t('stake.yearly-earning-tooltip')}>
                <IconButton className={classes.question}>
                  <QuestionIcon size="xs" />
                </IconButton>
              </Tooltip>
            </Headline6>
            <Headline3>{t('units.~eth', { value: 14.339 })}</Headline3>
          </Box>
          <Box>
            <Body2 color="textSecondary">{t('stake.yearly-earning-tip')}</Body2>
          </Box>
        </BackgroundColorProvider>
        <Box className={classes.footer}>
          <Box display="flex" justifyContent="space-between" mb={4}>
            <Body2 color="textSecondary" className={classes.note}>
              {t('stake.note')}
            </Body2>
            <Button
              fullWidth={true}
              color="primary"
              size="large"
              className={classes.submit}
              type="submit"
            >
              {t('stake.stake')}
            </Button>
          </Box>

          <div className={classes.socials}>
            <Button variant="outlined" color="secondary">
              <TwitterIcon />
              {t('stake.tweet')}
            </Button>
            <Button variant="outlined" color="secondary">
              <CopyIcon />
              {t('stake.copy')}
            </Button>
          </div>
        </Box>
      </form>
    );
  };

  return (
    <section className={classes.component}>
      <Curtains className={classes.wrapper}>
        <Form onSubmit={() => alert('Submit')} render={renderForm} />
      </Curtains>
    </section>
  );
};

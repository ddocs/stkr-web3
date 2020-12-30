import * as React from 'react';
import { useCallback } from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { t, tHTML } from '../../common/utils/intl';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Paper,
  Tooltip,
  Typography,
  ValueLabelProps,
} from '@material-ui/core';
import { useProjectStyles } from './ProjectStyles';
import { ModerationStatusLed } from './components/ModerationStatusLed';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { SliderField } from '../../UiKit/RangeField';
import { FormErrors } from '../../common/types/FormErrors';
import { useDialog } from '../../store/dialogs/selectors';
import { DIALOG_GOVERNANCE_HOW_IT_WORKS } from '../../store/dialogs/actions';
import { HowItWorksDialog } from './components/HowItWorksDialog';
import { CancelIcon } from '../../UiKit/Icons/CancelIcon';
import { Link as RouterLink } from 'react-router-dom';
import { GOVERNANCE_PROJECT_LIST_PATH } from '../../common/const';

interface IVoteValue {
  amount: number;
}

function validateCreateProjectForm(data: IVoteValue) {
  const errors: FormErrors<IVoteValue> = {};

  return errors;
}

function SliderLabel({ value, children, open }: ValueLabelProps) {
  const classes = useProjectStyles();
  return (
    <>
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        open={open}
        enterTouchDelay={0}
        title={
          <Typography variant="h3">
            {t('units.number-value', { value })}
          </Typography>
        }
        placement="top"
      >
        {children}
      </Tooltip>
    </>
  );
}

export const Project = () => {
  const classes = useProjectStyles();

  const { isOpened, handleClose, handleOpen } = useDialog(
    DIALOG_GOVERNANCE_HOW_IT_WORKS,
  );

  const onSubmit = useCallback((payload: IVoteValue) => {
    console.log('onSubmit', payload);
  }, []);

  const onHowItWorksClick = useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  const renderForm = ({ handleSubmit, form }: FormRenderProps<IVoteValue>) => {
    const { amount } = form.getState().values;

    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <Box display="flex" className={classes.amount}>
          <Button
            variant="outlined"
            classes={{
              root: classes.voteButton,
              label: classes.voteButtonLabel,
            }}
          >
            {t('project.support')}
            <Typography color="textSecondary" className={classes.voteCount}>
              {t('units.vote-value', { value: '670000' })}
            </Typography>
          </Button>
          <Field
            component={SliderField}
            min={1}
            max={30}
            name="amount"
            step={1}
            valueLabelDisplay="on"
            ValueLabelComponent={SliderLabel}
            classes={{ root: classes.slider }}
          />
          <Button
            variant="outlined"
            classes={{
              root: classes.voteButton,
              label: classes.voteButtonLabel,
            }}
          >
            {t('project.against')}
            <Typography color="textSecondary" className={classes.voteCount}>
              {t('units.vote-value', { value: '670000' })}
            </Typography>
          </Button>
        </Box>

        <Box maxWidth={298} width="100%" margin="0 auto" mb={3}>
          <Button color="primary" type="submit" size="large" fullWidth={true}>
            {t('project.submit', { value: amount })}
          </Button>
        </Box>
        <Link
          color="textSecondary"
          align="center"
          underline="none"
          onClick={onHowItWorksClick}
          display="block"
        >
          {t('project.how-does-it-work')}
        </Link>
      </form>
    );
  };

  return (
    <>
      <HowItWorksDialog isOpened={isOpened} handleClose={handleClose} />
      <section className={classes.root}>
        <Curtains className={classes.content}>
          <RouterLink to={GOVERNANCE_PROJECT_LIST_PATH}>
            <IconButton className={classes.close}>
              <CancelIcon onClick={handleClose} size="xmd" />
            </IconButton>
          </RouterLink>
          <Paper variant="outlined" square={false} className={classes.paper}>
            <ModerationStatusLed
              status="live"
              variant="contained"
              classes={{ root: classes.led }}
            />
            <Box mb={2.5}>
              <Typography variant="h2">{t('project.project-name')}</Typography>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              className={classes.time}
            >
              {tHTML('project.time-left')}
            </Typography>

            <Divider className={classes.divider} />

            <Form
              render={renderForm}
              validate={validateCreateProjectForm}
              onSubmit={onSubmit}
              initialValues={{ amount: 1 }}
            />
          </Paper>
          <Paper variant="outlined" square={false} className={classes.paper}>
            <Box>
              <Typography className={classes.details}>
                {t('project.details')}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Box>
          </Paper>
        </Curtains>
      </section>
    </>
  );
};

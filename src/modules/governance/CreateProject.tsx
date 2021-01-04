import * as React from 'react';
import { useCallback } from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { Headline2 } from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import { Box, Divider, Paper, Tooltip, Typography, ValueLabelProps, } from '@material-ui/core';
import { useCreateProjectStyles } from './CreateProjectStyles';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { InputField } from '../../UiKit/InputField';
import { Button } from '../../UiKit/Button';
import { FormErrors } from '../../common/types/FormErrors';
import { SliderField } from '../../UiKit/RangeField';
import { useDialog } from '../../store/dialogs/selectors';
import { DIALOG_GOVERNANCE_PROJECT_CREATED } from '../../store/dialogs/actions';
import { ProjectCreatedDialog } from './components/ProjectCreatedDialog';
import { useDispatch } from 'react-redux';
import { GovernanceActions, GovernanceActionTypes, } from '../../store/actions/GovernanceActions';
import { Mutation } from '@redux-requests/react';
import { MutationErrorHandler } from '../../components/MutationErrorHandler/MutationErrorHandler';

const SECONDS_IN_DAY = 60 * 60 * 24;

function SliderLabel({ value, children, open }: ValueLabelProps) {
  const classes = useCreateProjectStyles();
  return (
    <>
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        open={open}
        enterTouchDelay={0}
        title={t('units.day-value', { value })}
        placement="top"
      >
        {children}
      </Tooltip>
    </>
  );
}

interface ICreateProjectValue {
  topic: string;
  content: string;
  timeSpanDays: number;
}

function validateCreateProjectForm(data: ICreateProjectValue) {
  const errors: FormErrors<ICreateProjectValue> = {};

  if (!data.topic) {
    errors.topic = t('validation.required');
  }

  if (!data.content) {
    errors.content = t('validation.required');
  }

  return errors;
}

export const CreateProject = () => {
  const classes = useCreateProjectStyles();
  const dispatch = useDispatch();

  const { isOpened, handleClose, handleOpen } = useDialog(
    DIALOG_GOVERNANCE_PROJECT_CREATED,
  );

  const onSubmit = useCallback(
    ({ timeSpanDays, topic, content }: ICreateProjectValue) => {
      handleOpen();
      dispatch(
        GovernanceActions.createProject(
          timeSpanDays * SECONDS_IN_DAY,
          topic,
          content,
        ),
      );
    },
    [dispatch, handleOpen],
  );

  const renderForm = ({
    handleSubmit,
  }: FormRenderProps<ICreateProjectValue>) => {
    return (
      <form onSubmit={handleSubmit}>
        <Box mb={5}>
          <Field
            component={InputField}
            name="topic"
            label={t('create-project.label.name')}
            fullWidth={true}
          />
        </Box>
        <Box mb={8.5}>
          <Field
            component={InputField}
            name="content"
            label={t('create-project.label.description')}
            fullWidth={true}
          />
        </Box>

        <Divider className={classes.divider} />

        <Box mb={2}>
          <Typography className={classes.label} align="center">
            {t('create-project.label.timing')}
          </Typography>
        </Box>
        <Box mb={11}>
          <Typography variant="body2" color="textSecondary" align="center">
            {t('create-project.description.timing')}
          </Typography>
        </Box>

        <Box mb={6}>
          <Field
            component={SliderField}
            min={3}
            max={7}
            name="timeSpanDays"
            step={1}
            valueLabelDisplay="on"
            ValueLabelComponent={SliderLabel}
          />
        </Box>

        <Box maxWidth={280} width="100%" margin="0 auto">
          <MutationErrorHandler type={GovernanceActionTypes.CREATE_PROJECT} />
          <Mutation type={GovernanceActionTypes.CREATE_PROJECT}>
            {({ loading }) => (
              <Button
                color="primary"
                size="large"
                variant="contained"
                submit
                aria-label={t('create-project.submit')}
                fullWidth={true}
                disabled={loading}
              >
                {t('create-project.submit')}
              </Button>
            )}
          </Mutation>
        </Box>
      </form>
    );
  };

  return (
    <>
      <ProjectCreatedDialog isOpened={isOpened} handleClose={handleClose} />
      <section className={classes.root}>
        <Curtains className={classes.content}>
          <Box mb={4}>
            <Headline2 align="center" component="h2">
              {t('create-project.title')}
            </Headline2>
          </Box>
          <Paper variant="outlined" square={false} className={classes.paper}>
            <Form
              render={renderForm}
              validate={validateCreateProjectForm}
              onSubmit={onSubmit}
            />
          </Paper>
        </Curtains>
      </section>
    </>
  );
};

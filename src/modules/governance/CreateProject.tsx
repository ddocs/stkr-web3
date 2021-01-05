import * as React from 'react';
import { useCallback } from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { Headline2 } from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  ValueLabelProps,
} from '@material-ui/core';
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
import {
  GovernanceActions,
  GovernanceActionTypes,
} from '../../store/actions/GovernanceActions';
import { Mutation } from '@redux-requests/react';
import { MutationErrorHandler } from '../../components/MutationErrorHandler/MutationErrorHandler';
import { Link as RouterLink } from 'react-router-dom';
import { GOVERNANCE_PROJECT_LIST_PATH } from '../../common/const';
import { CancelIcon } from '../../UiKit/Icons/CancelIcon';

const SECONDS_IN_DAY = 60 * 60 * 24;

const DEFAULT_TIME_SPAN = 3;

function SliderLabel({ value, children, open }: ValueLabelProps) {
  const classes = useCreateProjectStyles();
  return (
    <>
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        open={open}
        enterTouchDelay={0}
        title={t('unit.day-value', { value })}
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

  if (!data.timeSpanDays) {
    errors.timeSpanDays = t('validation.required');
  }

  return errors;
}

export const CreateProject = () => {
  const classes = useCreateProjectStyles();
  const dispatch = useDispatch();

  const { isOpened, handleClose } = useDialog(
    DIALOG_GOVERNANCE_PROJECT_CREATED,
  );

  const onSubmit = useCallback(
    ({ timeSpanDays, topic, content }: ICreateProjectValue) => {
      dispatch(
        GovernanceActions.createProject(
          timeSpanDays * SECONDS_IN_DAY,
          topic,
          content,
        ),
      );
    },
    [dispatch],
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
            min={DEFAULT_TIME_SPAN}
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
                {loading
                  ? t('create-project.processing')
                  : t('create-project.submit')}
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
          <RouterLink to={GOVERNANCE_PROJECT_LIST_PATH}>
            <IconButton className={classes.close} onClick={handleClose}>
              <CancelIcon size="xmd" />
            </IconButton>
          </RouterLink>
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
              initialValues={{ timeSpanDays: DEFAULT_TIME_SPAN }}
            />
          </Paper>
        </Curtains>
      </section>
    </>
  );
};

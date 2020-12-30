import * as React from 'react';
import { useCallback } from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { Headline2 } from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import {
  Box,
  Divider,
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
import { useDispatch } from 'react-redux';
import { useDialog } from '../../store/dialogs/selectors';
import {
  closeModalAction,
  DIALOG_GOVERNANCE_PROJECT_CREATED,
  openGovernanceProjectCreatedModal,
} from '../../store/dialogs/actions';
import { ProjectCreatedDialog } from './components/ProjectCreatedDialog';

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
  name: string;
  description: string;
}

function validateCreateProjectForm(data: ICreateProjectValue) {
  const errors: FormErrors<ICreateProjectValue> = {};

  if (!data.name) {
    errors.name = t('validation.required');
  }

  if (!data.description) {
    errors.description = t('validation.required');
  }

  return errors;
}

export const CreateProject = () => {
  const classes = useCreateProjectStyles();

  const dispatch = useDispatch();

  const isOpened = useDialog(DIALOG_GOVERNANCE_PROJECT_CREATED);

  const handleClose = useCallback(() => {
    dispatch(closeModalAction());
  }, [dispatch]);

  const onSubmit = useCallback(
    (payload: ICreateProjectValue) => {
      dispatch(openGovernanceProjectCreatedModal());
      console.log('onSubmit', payload);
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
            name="name"
            label={t('create-project.label.name')}
            fullWidth={true}
          />
        </Box>
        <Box mb={8.5}>
          <Field
            component={InputField}
            name="description"
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
            min={1}
            max={30}
            name="timing"
            step={1}
            valueLabelDisplay="on"
            ValueLabelComponent={SliderLabel}
          />
        </Box>

        <Box maxWidth={280} width="100%" margin="0 auto">
          <Button
            color="primary"
            size="large"
            variant="contained"
            submit
            aria-label={t('create-project.submit')}
            fullWidth={true}
          >
            {t('create-project.submit')}
          </Button>
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

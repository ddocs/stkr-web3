import * as React from 'react';
import { useCallback, useEffect } from 'react';
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
import { useParams } from 'react-router';
import { GOVERNANCE_PROJECT_LIST_PATH } from '../../common/const';
import { useDispatch } from 'react-redux';
import {
  GovernanceActions,
  GovernanceActionTypes,
} from '../../store/actions/GovernanceActions';
import { VoteStatus } from '@ankr.com/stkr-jssdk';
import { IUserInfo } from '../../store/apiMappers/userApi';
import { UserActionTypes } from '../../store/actions/UserActions';
import { QueryError } from '../../components/QueryError/QueryError';
import {
  QueryLoading,
  QueryLoadingCentered,
} from '../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../components/QueryEmpty/QueryEmpty';
import { Mutation, Query } from '@redux-requests/react';
import { IProject } from './types';
import { getProject } from './utils/getProject';
import { MutationErrorHandler } from '../../components/MutationErrorHandler/MutationErrorHandler';
import { VoteField } from './components/VoteField';
import { convertToDuration } from '../../common/utils/convertToDuration';

interface IVoteValue {
  amount: number;
  voteStatus: VoteStatus;

  yes: number;
  no: number;
}

function validateCreateProjectForm(data: IVoteValue) {
  const errors: FormErrors<IVoteValue> = {};

  if (!data.voteStatus) {
    errors.voteStatus = t('validation.required');
  }

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
            {t('unit.number-value', { value })}
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
  const dispatch = useDispatch();

  const { isOpened, handleClose, handleOpen } = useDialog(
    DIALOG_GOVERNANCE_HOW_IT_WORKS,
  );

  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    dispatch(GovernanceActions.getAnkrGovernanceAllowance());
  }, [dispatch]);

  const onSubmit = useCallback(
    (payload: IVoteValue) => {
      // TODO pass amount
      dispatch(GovernanceActions.vote(projectId, payload.voteStatus));
    },
    [dispatch, projectId],
  );

  const onHowItWorksClick = useCallback(() => {
    handleOpen();
  }, [handleOpen]);

  const renderForm = ({
    handleSubmit,
    form,
    initialValues,
  }: FormRenderProps<IVoteValue>) => {
    const state = form.getState();
    const { amount } = state.values;

    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <input type="hidden" name="voteStatus" />
        <Box display="flex" className={classes.amount}>
          <Field
            name="voteStatus"
            component={VoteField}
            yes={initialValues.yes}
            no={initialValues.no}
          >
            <Field
              component={SliderField}
              min={1}
              max={initialValues.amount}
              name="amount"
              step={1}
              valueLabelDisplay="on"
              ValueLabelComponent={SliderLabel}
              classes={{ root: classes.slider }}
            />
          </Field>
        </Box>

        <Box maxWidth={298} width="100%" margin="0 auto" mb={3}>
          <MutationErrorHandler type={GovernanceActionTypes.VOTE} />
          <Mutation type={GovernanceActionTypes.VOTE}>
            {({ loading }) => {
              return (
                <Button
                  color="primary"
                  type="submit"
                  size="large"
                  fullWidth={true}
                  disabled={loading}
                >
                  {loading
                    ? t('project.processing')
                    : t('project.submit', {
                        value: t('unit.number-value', { value: amount }),
                      })}
                </Button>
              );
            }}
          </Mutation>
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
            <IconButton onClick={handleClose} className={classes.close}>
              <CancelIcon size="xmd" />
            </IconButton>
          </RouterLink>
          <Query<IProject[] | null>
            type={GovernanceActionTypes.FETCH_PROJECTS}
            errorComponent={QueryError}
            loadingComponent={QueryLoadingCentered}
            showLoaderDuringRefetch={false}
          >
            {({ data }) => {
              if (!data) {
                return null;
              }

              const project = getProject(data, projectId);

              if (!project) {
                return null;
              }

              return (
                <>
                  <Paper
                    variant="outlined"
                    square={false}
                    className={classes.paper}
                  >
                    <ModerationStatusLed
                      status={project.status}
                      variant="contained"
                      classes={{ root: classes.led }}
                    />
                    <Box mb={2.5}>
                      <Typography variant="h2">{project.topic}</Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={classes.time}
                    >
                      {tHTML('project.time-left', {
                        value: convertToDuration(new Date(), project.endTime),
                      })}
                    </Typography>

                    <Divider className={classes.divider} />

                    <Query<IUserInfo | null>
                      type={UserActionTypes.FETCH_ACCOUNT_DATA}
                      errorComponent={QueryError}
                      loadingComponent={QueryLoading}
                      noDataMessage={<QueryEmpty />}
                      showLoaderDuringRefetch={false}
                    >
                      {({ data }) => (
                        <Form
                          render={renderForm}
                          validate={validateCreateProjectForm}
                          onSubmit={onSubmit}
                          initialValues={{
                            amount: data?.ankrBalance.toNumber(),
                            yes: project.yes,
                            no: project.no,
                          }}
                        />
                      )}
                    </Query>
                  </Paper>
                  <Paper
                    variant="outlined"
                    square={false}
                    className={classes.paper}
                  >
                    <Box width="100%">
                      <Typography className={classes.details}>
                        {t('project.details')}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {project.content}
                      </Typography>
                    </Box>
                  </Paper>
                </>
              );
            }}
          </Query>
        </Curtains>
      </section>
    </>
  );
};

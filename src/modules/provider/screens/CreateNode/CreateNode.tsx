import {
  Box,
  FormControlLabel,
  Hidden,
  IconButton,
  Paper,
  Radio,
  Tooltip,
} from '@material-ui/core';
import { success } from '@redux-requests/core';
import { Mutation } from '@redux-requests/react';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { useHistory } from 'react-router';
import {
  PROVIDER_MAIN_PATH,
  PROVIDER_NODE_LIST_PATH,
} from '../../../../common/const';
import { IRequestActionPromiseData } from '../../../../common/types';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t, tHTML } from '../../../../common/utils/intl';
import { isNodeNameValid } from '../../../../common/utils/isNodeNameValid';
import { isValidUrl } from '../../../../common/utils/isValidUrl';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { CloseIcon } from '../../../../UiKit/Icons/CloseIcon';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { InputField } from '../../../../UiKit/InputField';
import { RadioGroupField } from '../../../../UiKit/RadioGroupField';
import { Body2, Headline4 } from '../../../../UiKit/Typography';
import { useCreateNodeStyles } from './CreateNodeStyles';

enum Choice {
  yes = 'yes',
  no = 'no',
}

export interface ICreateNodeValue {
  name: string;
  eth1Url: string;
  eth2Url: string;
  isBeaconAvailable: Choice;
}

function validateCreateNodeForm(data: ICreateNodeValue) {
  const errors: FormErrors<ICreateNodeValue> = {};

  if (!data.name) {
    errors.name = t('validation.required');
  } else if (!isNodeNameValid(data.name)) {
    errors.name = t('validation.alpha-numerical-and-underscore');
  }

  if (!data.eth1Url) {
    errors.eth1Url = t('validation.required');
  } else if (!isValidUrl(data.eth1Url)) {
    errors.eth1Url = t('validation.invalid-address-format');
  }

  if (!data.isBeaconAvailable) {
    errors.isBeaconAvailable = t('validation.required');
  }

  if (data.isBeaconAvailable === Choice.yes) {
    if (!data.eth2Url) {
      errors.eth2Url = t('validation.required');
    } else if (!isValidUrl(data.eth2Url)) {
      errors.eth2Url = t('validation.invalid-address-format');
    }
  }

  return errors;
}

interface ICreateNodePayload {}

interface ICreateNodeProps {
  onSubmit(payload: ICreateNodePayload): void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export const CreateNodeComponent = ({
  onSubmit,
  isLoading,
  onCancel,
}: ICreateNodeProps) => {
  const classes = useCreateNodeStyles();

  const titleText = t('create-node.title');

  const renderForm = ({
    handleSubmit,
    form,
  }: FormRenderProps<ICreateNodeValue>) => {
    const { values } = form.getState();

    return (
      <Paper variant="outlined" square={false} className={classes.paper}>
        <Hidden smUp>
          <Box display="flex" alignItems="flex-start" mb={4}>
            <Headline4 className={classes.title}>{titleText}</Headline4>

            <IconButton className={classes.cancel}>
              <CloseIcon size="sm" onClick={onCancel} />
            </IconButton>
          </Box>
        </Hidden>

        <form onSubmit={handleSubmit} className={classes.form}>
          <Field
            classes={{ root: classes.space }}
            component={InputField}
            name="name"
            label={
              <>
                {t('create-node.label.node-name')}

                <Tooltip title={t('create-node.hint.node-name')}>
                  <IconButton className={classes.question}>
                    <QuestionIcon size="xs" />
                  </IconButton>
                </Tooltip>
              </>
            }
          />

          <Field
            component={InputField}
            name="eth1Url"
            label={
              <>
                {t('create-node.label.eth-node')}

                <Tooltip title={t('create-node.hint.eth1Url')}>
                  <IconButton className={classes.question}>
                    <QuestionIcon size="xs" />
                  </IconButton>
                </Tooltip>
              </>
            }
            palceholder={t('create-node.placeholder.eth-node')}
          />

          <Body2 className={classNames(classes.space, classes.note)}>
            {tHTML('create-node.note.eth-node')}
          </Body2>

          <Box display="none">
            <Field
              classes={{ root: classes.space }}
              component={RadioGroupField}
              name="isBeaconAvailable"
              label={t('create-node.label.eth-node')}
            >
              <FormControlLabel
                value={Choice.yes}
                control={<Radio />}
                label={t('create-node.option.i-have')}
              />

              {values.isBeaconAvailable === Choice.yes && (
                <Field component={InputField} name="eth2Url" />
              )}

              <FormControlLabel
                value={Choice.no}
                control={<Radio />}
                label={t('create-node.option.i-dont-have')}
              />
            </Field>
          </Box>

          <Button
            color="primary"
            size="large"
            variant="contained"
            submit
            aria-label={t('create-node.create')}
            disabled={isLoading}
          >
            {t('create-node.create')}
          </Button>
        </form>
      </Paper>
    );
  };

  return (
    <section className={classes.root}>
      <Curtains>
        <Hidden xsDown>
          <Box display="flex" justifyContent="flex-end">
            <IconButton className={classes.cancel}>
              <CancelIcon size="xmd" onClick={onCancel} />
            </IconButton>
          </Box>

          <Headline4 align="center" className={classes.title}>
            {titleText}
          </Headline4>
        </Hidden>

        <Form
          render={renderForm}
          validate={validateCreateNodeForm}
          onSubmit={onSubmit}
          initialValues={{ isBeaconAvailable: Choice.no }}
        />
      </Curtains>
    </section>
  );
};

export const CreateNode = () => {
  const dispatch = useRequestDispatch();
  const history = useHistory();

  const handleCancel = useCallback(() => {
    history.push(PROVIDER_MAIN_PATH);
  }, [history]);

  const actionType = UserActionTypes.CREATE_SIDECAR;

  const handleSubmit = useCallback(
    (data: ICreateNodeValue) => {
      dispatch(UserActions.createSidecar(data)).then(
        (data: IRequestActionPromiseData) => {
          if (data.action.type === success(actionType)) {
            history.replace(PROVIDER_NODE_LIST_PATH);
          }
        },
      );
    },
    [dispatch, history, actionType],
  );

  return (
    <>
      <MutationErrorHandler type={actionType} />

      <Mutation type={actionType}>
        {({ loading }) => (
          <CreateNodeComponent
            onSubmit={handleSubmit}
            isLoading={loading}
            onCancel={handleCancel}
          />
        )}
      </Mutation>
    </>
  );
};

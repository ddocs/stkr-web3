import React, { useCallback } from 'react';
import { useCreateNodeStyles } from './CreateNodeStyles';
import { t, tHTML } from '../../../../common/utils/intl';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { Button } from '../../../../UiKit/Button';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Mutation } from '@redux-requests/react';
import { success } from '@redux-requests/core';
import { useHistory } from 'react-router';
import { PROVIDER_NODES_PATH } from '../../../../common/const';
import { IRequestActionPromiseData } from '../../../../common/types';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
} from '@material-ui/core';
import { Curtains } from '../../../../UiKit/Curtains';
import { Body1, Headline4 } from '../../../../UiKit/Typography';
import { InputField } from '../../../../UiKit/InputField';
import { RadioGroupField } from '../../../../UiKit/RadioGroupField';
import classNames from 'classnames';
import { FormErrors } from '../../../../common/types/FormErrors';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { isNodeNameValid } from '../../../../common/utils/isNodeNameValid';
import { isValidUrl } from '../../../../common/utils/isValidUrl';

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
  disabled?: boolean;
}

export const CreateNodeComponent = ({
  onSubmit,
  disabled,
}: ICreateNodeProps) => {
  const classes = useCreateNodeStyles();

  const renderForm = ({
    handleSubmit,
    form,
  }: FormRenderProps<ICreateNodeValue>) => {
    const { values } = form.getState();

    return (
      <Paper variant="outlined" square={false}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Field
            classes={{ root: classes.space }}
            component={InputField}
            name="name"
            label={t('create-node.label.node-name')}
          />
          <Field
            component={InputField}
            name="eth1Url"
            label={t('create-node.label.eth-node')}
            palceholder={t('create-node.placeholder.eth-node')}
          />
          <Body1 className={classNames(classes.space, classes.note)}>
            {tHTML('create-node.note.eth-node')}
          </Body1>
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
            aria-label={t('navigation.create')}
            disabled={disabled}
          >
            {t('navigation.create')}
          </Button>
        </form>
      </Paper>
    );
  };

  return (
    <Form
      render={renderForm}
      validate={validateCreateNodeForm}
      onSubmit={onSubmit}
      initialValues={{ isBeaconAvailable: Choice.no }}
    />
  );
};

export const CreateNode = () => {
  const dispatch = useRequestDispatch();
  const classes = useCreateNodeStyles();
  const history = useHistory();

  const handleCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    (data: ICreateNodeValue) => {
      dispatch(UserActions.createSidecar(data)).then(
        (data: IRequestActionPromiseData) => {
          if (data.action.type === success(UserActionTypes.CREATE_SIDECAR)) {
            history.replace(PROVIDER_NODES_PATH);
          }
        },
      );
    },
    [dispatch, history],
  );

  return (
    <section>
      <Curtains maxWidth="sm" className={classes.root}>
        <MutationErrorHandler type={UserActionTypes.CREATE_SIDECAR} />
        <Headline4 align="center" className={classes.title}>
          {t('create-node.title')}
          <IconButton className={classes.cancel}>
            <CancelIcon onClick={handleCancel} />
          </IconButton>
        </Headline4>
        <Mutation type={UserActionTypes.CREATE_SIDECAR}>
          {({ loading }) => (
            <CreateNodeComponent onSubmit={handleSubmit} disabled={loading} />
          )}
        </Mutation>
      </Curtains>
    </section>
  );
};

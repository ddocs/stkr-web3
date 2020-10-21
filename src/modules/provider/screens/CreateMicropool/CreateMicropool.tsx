import React, { useCallback } from 'react';
import { useCreateMicropoolStyles } from './CreateMicropoolStyles';
import classNames from 'classnames';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import { CreateMicropoolForm } from './CreateMicropoolForm';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Mutation } from '@redux-requests/react';
import { Curtains } from '../../../../UiKit/Curtains';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { CreateMicropoolProgress } from './CreateMicropoolProgress';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import { IRequestActionPromiseData } from '../../../../common/types';
import { success } from '@redux-requests/core';
import { PROVIDER_MICROPOOL_LIST_PATH } from '../../../../common/const';
import { useRequestDispatch } from '../../../../common/utils/useRequestDispatch';
import { isAlphanumeric } from '../../../../common/utils/isAlphanumeric';
import { FormErrors } from '../../../../common/types/FormErrors';
import { t } from '../../../../common/utils/intl';

const MICROPOOL_NAME_MAX_LENGTH = 32;

interface ICreateMicropoolPayload {
  name: string;
}

function validateCreateMicropoolForm({ name }: ICreateMicropoolPayload) {
  const errors: FormErrors<ICreateMicropoolPayload> = {};

  if (!name) {
    errors.name = t('validation.required');
  } else if (!isAlphanumeric(name)) {
    errors.name = t('validation.alphanumeric');
  } else if (name.length > MICROPOOL_NAME_MAX_LENGTH) {
    errors.name = t('validation.min-length', {
      size: MICROPOOL_NAME_MAX_LENGTH,
    });
  }

  return errors;
}

interface ICreateMicropoolProps {
  onSubmit(x: ICreateMicropoolPayload): void;
  onClose?(): void;
}

export const CreateMicropoolComponent = ({
  onSubmit,
  onClose,
}: ICreateMicropoolProps) => {
  const classes = useCreateMicropoolStyles();

  return (
    <div className={classes.component}>
      <IconButton className={classes.close} onClick={onClose}>
        <CancelIcon />
      </IconButton>
      <Form
        render={formProps => <CreateMicropoolForm {...formProps} />}
        onSubmit={onSubmit}
        validate={validateCreateMicropoolForm}
      />
    </div>
  );
};

export const CreateMicropoolImp = () => {
  const classes = useCreateMicropoolStyles();
  const history = useHistory();
  const dispatch = useRequestDispatch();

  const handleSubmit = useCallback(
    (payload: ICreateMicropoolPayload) => {
      dispatch(UserActions.createMicropool(payload)).then(
        (data: IRequestActionPromiseData) => {
          if (data.action.type === success(UserActionTypes.CREATE_MICROPOOL)) {
            history.replace(PROVIDER_MICROPOOL_LIST_PATH);
          }
        },
      );
    },
    [dispatch, history],
  );

  const handleClose = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <section className={classNames(classes.section)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <BackgroundColorProvider className={classes.content}>
          <Mutation type={UserActionTypes.CREATE_MICROPOOL}>
            {({ loading }) =>
              loading ? (
                <CreateMicropoolProgress />
              ) : (
                <CreateMicropoolComponent
                  onSubmit={handleSubmit}
                  onClose={handleClose}
                />
              )
            }
          </Mutation>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};

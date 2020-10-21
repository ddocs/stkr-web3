import React, { useCallback } from 'react';
import { useCreateMicropoolStyles } from './CreateMicropoolStyles';
import classNames from 'classnames';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import { CreateMicropoolForm } from './CreateMicropoolForm';
import { useAction } from '../../../../store/redux';
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
import { IReduxRequestActionResponse } from '../../../../common/types';
import { success } from '@redux-requests/core';
import { PROVIDER_MICROPOOL_LIST_PATH } from '../../../../common/const';

interface ICreateMicropoolPayload {
  name: string;
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
      />
    </div>
  );
};

export const CreateMicropoolImp = () => {
  const classes = useCreateMicropoolStyles();
  const history = useHistory();
  const dispatchCreateMicropool = useAction(UserActions.createMicropool);

  const handleSubmit = useCallback(
    (payload: ICreateMicropoolPayload) => {
      dispatchCreateMicropool(payload).then(
        (data: IReduxRequestActionResponse) => {
          if (data.action.type === success(UserActionTypes.CREATE_MICROPOOL)) {
            history.replace(PROVIDER_MICROPOOL_LIST_PATH);
          }
        },
      );
    },
    [dispatchCreateMicropool, history],
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

import React, { useCallback } from 'react';
import { useCreateMicropoolStyles } from './CreateMicropoolStyles';
import classNames from 'classnames';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import { RenderForm } from './RenderForm';
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
        render={formProps => <RenderForm {...formProps} />}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export const CreateMicropoolImp = () => {
  const classes = useCreateMicropoolStyles();

  const dispatchCreateMicropool = useAction(UserActions.createMicropool);

  const handleSubmit = useCallback(
    ({ name }: ICreateMicropoolPayload) => {
      // TODO: add name field to the form. Ask designers
      dispatchCreateMicropool({ name: name || 'micropool' });
    },
    [dispatchCreateMicropool],
  );

  const history = useHistory();
  const handleClose = useCallback(() => {
    history.goBack();
  }, []);

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

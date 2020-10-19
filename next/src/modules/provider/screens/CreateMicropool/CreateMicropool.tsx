import React, { useCallback } from 'react';
import { useCreateMicropoolStyles } from './CreateMicropoolStyles';
import classNames from 'classnames';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import { RenderForm } from './RenderForm';
import { NavLink } from '../../../../UiKit/Link';
import { PROVIDER_PATH } from '../../../../common/const';
import { useAction } from '../../../../store/redux';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Mutation } from '@redux-requests/react';
import { Curtains } from '../../../../UiKit/Curtains';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { CreateMicropoolProgress } from './CreateMicropoolProgress';

interface ICreateMicropoolPayload {
  name: string;
}

interface ICreateMicropoolProps {
  onSubmit(x: ICreateMicropoolPayload): void;
}

export const CreateMicropoolComponent = ({
  onSubmit,
}: ICreateMicropoolProps) => {
  const classes = useCreateMicropoolStyles();

  return (
    <div className={classes.component}>
      <NavLink className={classes.close} color="primary" href={PROVIDER_PATH}>
        <CancelIcon />
      </NavLink>
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

  return (
    <section className={classNames(classes.section)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <BackgroundColorProvider className={classes.content}>
          <Mutation type={UserActionTypes.CREATE_MICROPOOL}>
            {({ loading }) =>
              loading ? (
                <CreateMicropoolProgress />
              ) : (
                <CreateMicropoolComponent onSubmit={handleSubmit} />
              )
            }
          </Mutation>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};

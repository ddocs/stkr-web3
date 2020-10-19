import React, { useCallback, useMemo } from 'react';
import { useCreateMicropoolStyles } from './CreateMicropoolStyles';
import classNames from 'classnames';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import { ISelectOption } from '../../../../UiKit/SelectField/SelectField';
import { RenderForm } from './RenderForm';
import { NavLink } from '../../../../UiKit/Link';
import { PROVIDER_PATH } from '../../../../common/const';
import { useAction } from '../../../../store/redux';
import { UserActions, UserActionTypes, } from '../../../../store/actions/UserActions';
import { Mutation, useQuery } from '@redux-requests/react';
import { SidecarReply } from '../../../api/gateway';
import { Curtains } from '../../../../UiKit/Curtains';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { CreateMicropoolProgress } from '../../components/CreateMicropoolProgress';

interface ICreateMicropoolStoreProps {
  beacons: ISelectOption[];
}

interface ICreateMicropoolProps extends ICreateMicropoolStoreProps {
  onSubmit(x: any): void;
}

export const CreateMicropoolComponent = ({
  beacons,
  onSubmit,
}: ICreateMicropoolProps) => {
  const classes = useCreateMicropoolStyles();

  const initialValues = useMemo(
    () => ({
      'beacon-node': beacons?.[0].value,
    }),
    [beacons],
  );

  return (
    <div className={classes.component}>
      <NavLink className={classes.close} color="primary" href={PROVIDER_PATH}>
        <CancelIcon />
      </NavLink>
      <Form
        render={formProps => <RenderForm beacons={beacons} {...formProps} />}
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </div>
  );
};

export const CreateMicropoolImp = () => {
  const classes = useCreateMicropoolStyles();

  const { data: sidecars } = useQuery<SidecarReply[]>({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
  });

  const beacons = useMemo(
    () =>
      (sidecars || []).map(b => ({
        value: b.id,
        label: b.id,
      })),
    [sidecars],
  );

  const dispatchCreateMicropool = useAction(UserActions.createMicropool);

  const handleSubmit = useCallback(
    ({ name }: Record<string, string>) => {
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
                <CreateMicropoolComponent
                  onSubmit={handleSubmit}
                  beacons={beacons}
                />
              )
            }
          </Mutation>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};

import React, { useCallback, useMemo } from 'react';
import { useStage6Styles } from './CreateMicropoolStage1Styles';
import classNames from 'classnames';
import { IStageProps } from '../../types';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { CancelIcon } from '../../../../UiKit/Icons/CancelIcon';
import { Form } from 'react-final-form';
import { ISelectOption } from '../../../../UiKit/SelectField/SelectField';
import { RenderForm } from './RenderForm';
import { NavLink } from '../../../../UiKit/Link';
import { PROVIDER_PATH } from '../../../../common/const';
import { useAction } from '../../../../store/redux';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { useQuery } from '@redux-requests/react';
import { SidecarReply } from '../../../api/gateway';

export interface ICreateMicropoolStage1StoreProps {
  beacon: ISelectOption[];
}

interface ICreateMicropoolStage1Props
  extends ICreateMicropoolStage1StoreProps,
    IStageProps {
  disabled?: boolean;
  error?: any;

  nextStep(x: any): void;
}

export const CreateMicropoolStage1Component = ({
  className,
  beacon,
  disabled,
  nextStep,
  error,
}: ICreateMicropoolStage1Props) => {
  const classes = useStage6Styles();

  const initialValues = useMemo(
    () => ({
      'beacon-node': beacon[0].value,
    }),
    [beacon],
  );

  return (
    <div className={classNames(classes.component, className)}>
      <NavLink className={classes.close} color="primary" href={PROVIDER_PATH}>
        <CancelIcon />
      </NavLink>
      <Form
        render={formProps => (
          <RenderForm
            disabled={disabled}
            beacon={beacon}
            {...formProps}
            error={error}
          />
        )}
        onSubmit={nextStep}
        initialValues={initialValues}
      />
    </div>
  );
};

const Stage6Imp = ({ className }: IStageProps) => {
  const { moveForward, data } = useFlowControl<{ error: any }>();

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

  const handleNextStep = useCallback(
    ({ name }: Record<string, string>) => {
      // TODO: add name field to the form. Ask designers
      dispatchCreateMicropool({ name: name || 'micropool' });
      moveForward();
    },
    [moveForward, dispatchCreateMicropool],
  );

  return (
    <CreateMicropoolStage1Component
      className={className}
      nextStep={handleNextStep}
      beacon={beacons}
      error={data.error}
    />
  );
};

export const CreateMicropoolStage1 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage6Imp,
});

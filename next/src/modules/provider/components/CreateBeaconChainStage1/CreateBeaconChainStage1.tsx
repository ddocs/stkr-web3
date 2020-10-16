import React, { useCallback } from 'react';
import { useCreateBeaconChainStage1Styles } from './CreateBeaconChainStage1Styles';
import classNames from 'classnames';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { IStageProps } from '../../types';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Icon } from './Icon';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { InputField } from '../../../../UiKit/InputField';
import { Button } from '../../../../UiKit/Button';
import { useAction } from '../../../../store/redux';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { useQuery } from '@redux-requests/react';
import { CreateBeaconChainStage2Component } from '../CreateBeaconChainStage2/CreateBeaconChainStage2';

interface ICreateNodePayload {
  name: string;
}

interface ICreateBeaconChainStage1Props extends IStageProps {
  disabled?: boolean;

  onSubmit(x: ICreateNodePayload): void;
}

export const CreateBeaconChainStage1Component = ({
  className,
  disabled,
  onSubmit,
}: ICreateBeaconChainStage1Props) => {
  const classes = useCreateBeaconChainStage1Styles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <Headline2 component="span" color="primary" className={classes.title}>
          {t('provider.create.create-beacon-chain-stage-1.title')}
        </Headline2>
        <Field
          className={classes.input}
          component={InputField}
          name="name"
          type="text"
          label={t('navigation.node-name')}
        />
        <Body2 component="span" color="secondary" className={classes.text}>
          {t('provider.create.create-beacon-chain-stage-1.description')}
        </Body2>
        <Button
          className={classes.button}
          color="primary"
          size="large"
          variant="contained"
          submit
          disabled={disabled}
          aria-label="submit"
        >
          {t('navigation.create')}
        </Button>
      </form>
    );
  };

  const { loading } = useQuery({ type: UserActionTypes.CREATE_SIDECAR });

  if (loading) {
    return <CreateBeaconChainStage2Component />;
  }

  return (
    <div className={classNames(classes.component, className)}>
      <Form render={renderForm} onSubmit={onSubmit} />
      <Icon className={classes.image} />
    </div>
  );
};

const CreateBeaconChainStage1Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  const dispatchCreateSidecar = useAction(UserActions.createSidecar);

  const handleNextStep = useCallback(() => {
    // TODO: add function
    // moveForward();
    dispatchCreateSidecar();
  }, [moveForward]);

  return (
    <CreateBeaconChainStage1Component
      className={className}
      onSubmit={handleNextStep}
    />
  );
};

export const CreateBeaconChainStage1 = defineFlowStep<{}, {}, IStageProps>({
  Body: CreateBeaconChainStage1Imp,
});

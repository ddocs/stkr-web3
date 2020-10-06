import React from 'react';
import { useStage1Styles } from './Stage1Styles';
import classNames from 'classnames';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { IStageProps } from '../../types';
import { Body1, Headline1 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { validateEmail } from '../../../../common/utils/validation';
import { isRequestInProgress } from '../../../../common/utils/requestStatus';
import { Form, Field, FormRenderProps } from 'react-final-form';
import { useTrackedOperation } from '../../../../common/hooks/useTrackedOperation';
import { InputField } from './InputField';

interface IEmailPayload {
  email: string;
}

interface IStage1Props extends IStageProps {
  disabled?: boolean;

  onSubmit(x: IEmailPayload): void;
}

const validation = (data: IEmailPayload) => {
  const errors: Partial<{ [key in keyof IEmailPayload]: string }> = {};
  const email = data.email;

  if (!validateEmail(email)) {
    errors.email = t('validation.email-error');
  }

  return errors;
};

export const Stage1Component = ({
  className,
  onSubmit,
  disabled,
}: IStage1Props) => {
  const classes = useStage1Styles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form
        className={classNames(classes.component, className)}
        onSubmit={handleSubmit}
      >
        <Field
          component={InputField}
          name="email"
          type="email"
          placeholder={t('navigation.email')}
        />
        <Button
          className={classes.submit}
          variant="contained"
          submit={true}
          disabled={disabled}
        >
          {t('navigation.next')}
        </Button>
      </form>
    );
  };

  return (
    <div className={classNames(classes.component, className)}>
      <span>{t('provider.create.stage-1.introduction')}</span>
      <Headline1>{t('provider.create.stage-1.three-steps')}</Headline1>
      <Body1>{t('provider.create.stage-1.three-steps-description')}</Body1>
      <Form
        render={renderForm}
        // @ts-ignore
        onSubmit={onSubmit}
        validate={validation}
      />
    </div>
  );
};

export const apiPostEmail = (payload: IEmailPayload) => {
  return fetch('', {
    method: 'POST',
    body: JSON.stringify({ ...payload, subject: '' }),
  });
};

const Stage1Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  const { submit, status } = useTrackedOperation(apiPostEmail, moveForward);

  const handleSubmit = (data: IEmailPayload) => {
    return submit(data);
  };

  return (
    <Stage1Component
      className={className}
      onSubmit={handleSubmit}
      disabled={isRequestInProgress(status)}
    />
  );
};

export const Stage1 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage1Imp,
});

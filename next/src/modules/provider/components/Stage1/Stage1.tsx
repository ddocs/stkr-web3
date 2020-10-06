import React from 'react';
import { useStage1Styles } from './Stage1Styles';
import classNames from 'classnames';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { IStageProps } from '../../types';
import { Body1, Headline1, Headline6 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { isRequestInProgress } from '../../../../common/utils/requestStatus';
import { Form, Field, FormRenderProps } from 'react-final-form';
import { useTrackedOperation } from '../../../../common/hooks/useTrackedOperation';
import { InputField } from './InputField';
import { Icon } from './Icon';
import { IEmailPayload } from './types';
import { apiPostEmail, validation } from './utils';

interface IStage1Props extends IStageProps {
  disabled?: boolean;

  onSubmit(x: IEmailPayload): void;
}

export const Stage1Component = ({
  className,
  onSubmit,
  disabled,
}: IStage1Props) => {
  const classes = useStage1Styles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <Field
          className={classes.input}
          component={InputField}
          name="email"
          type="email"
          placeholder={t('navigation.email')}
        />
        <Button
          className={classes.submit}
          color="primary"
          size="large"
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
      <Headline6 className={classes.message} color="primary" component="span">
        {t('provider.create.stage-1.introduction')}
      </Headline6>
      <Headline1 className={classes.title} color="primary" component="span">
        {tHTML('provider.create.stage-1.three-steps')}
      </Headline1>
      <Body1 className={classes.text} color="secondary" component="p">
        {t('provider.create.stage-1.three-steps-description')}
      </Body1>
      <Form render={renderForm} onSubmit={onSubmit} validate={validation} />
      <Icon className={classes.image} />
    </div>
  );
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

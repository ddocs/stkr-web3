import React, { useCallback } from 'react';
import { useStage1Styles } from './Stage1Styles';
import classNames from 'classnames';
import { useFlowControl } from '../../../../components/Flow/hooks';
import { defineFlowStep } from '../../../../components/Flow/definition';
import { IStageProps } from '../../types';
import { Body2, Headline1, Headline6 } from '../../../../UiKit/Typography';
import { t, tHTML } from '../../../../common/utils/intl';
import { Icon } from './Icon';
import { SubscribeForm } from '../../../../components/SubscribeForm';
import { IEmailPayload } from '../../../../common/types';

interface IStage1Props extends IStageProps {
  disabled?: boolean;

  onSubmit(x: IEmailPayload): void;
}

export const Stage1Component = ({ className, onSubmit }: IStage1Props) => {
  const classes = useStage1Styles();

  return (
    <div className={classNames(classes.component, className)}>
      <Headline6 className={classes.message} color="primary" component="span">
        {t('provider.create.stage-1.introduction')}
      </Headline6>
      <Headline1 className={classes.title} color="primary" component="span">
        {tHTML('provider.create.stage-1.three-steps')}
      </Headline1>
      <Body2 className={classes.text} color="secondary" component="p">
        {t('provider.create.stage-1.three-steps-description')}
      </Body2>
      <SubscribeForm
        className={classes.form}
        onSubmit={onSubmit}
        buttonCaption={t('navigation.next')}
        buttonSize={170}
      />
      <Icon className={classes.image} />
    </div>
  );
};

const Stage1Imp = ({ className }: IStageProps) => {
  const { moveForward } = useFlowControl();

  const handleNextStep = useCallback(() => {
    // TODO: add function
    moveForward();
  }, [moveForward]);

  return <Stage1Component className={className} onSubmit={handleNextStep} />;
};

export const Stage1 = defineFlowStep<{}, {}, IStageProps>({
  Body: Stage1Imp,
});

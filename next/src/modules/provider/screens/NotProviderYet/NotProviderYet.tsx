import React, { useState } from 'react';
import { useNotProviderYetStyles } from './NotProviderYetStyles';
import { uid } from 'react-uid';
import { Flow } from '../../../../components/Flow';
import { defineFlow } from '../../../../components/Flow/definition';
import { Stage1 } from '../../components/Stage1';
import { Stage2 } from '../../components/Stage2';
import { Stage3 } from '../../components/Stage3';
import { Stage4 } from '../../components/Stage4';
import { Stage6 } from '../../components/Stage6';
import { Stage7 } from '../../components/Stage7';
import { Stage5 } from '../../components/Stage5';
import classNames from 'classnames';
import { Curtains } from '../../../../UiKit/Curtains';
import { t } from '../../../../common/utils/intl';
import { SubTitle1 } from '../../../../UiKit/Typography';

interface INotProviderYetProps {
  className?: string;
}

const getCaptionByStage = (stage: number) => {
  switch (stage) {
    case 1:
      return 'navigation.apply-as-provider';
    case 2:
      return undefined;
    case 3:
      return 'navigation.create-beacon-chain';
    case 4:
      return undefined;
    case 5:
      return 'navigation.create-micropool';
    case 6:
      return undefined;
    case 7:
      return 'navigation.become-provider';
  }
  return undefined;
};

const STEPS = defineFlow(
  Stage1,
  Stage2,
  Stage3,
  Stage4,
  Stage5,
  Stage6,
  Stage7,
);

export const NotProviderYet = ({ className }: INotProviderYetProps) => {
  const classes = useNotProviderYetStyles();

  const [steps] = useState(STEPS);

  return (
    <section className={classNames(classes.component, className)}>
      <Flow key={uid(steps)} steps={steps} onComplete={() => null}>
        {(body, { currentStep, isLastStep, steps, moveBack, moveForward }) => {
          return (
            <>
              <div className={classes.header}>
                <Curtains className={classes.breadcrumbs}>
                  <ul className={classes.list}>
                    {steps.map((step, index) => {
                      const caption = getCaptionByStage(index + 1);
                      const isLoadingStage =
                        index === 1 || index === 3 || index === 5;
                      const isLastStage = index === steps.length - 1;
                      return (
                        <SubTitle1
                          key={uid(step)}
                          className={classNames(
                            classes.item,
                            currentStep === index && classes.activeStage,
                            isLastStage && classes.lastStage,
                            isLoadingStage && classes.loadingStage,
                          )}
                          component="li"
                        >
                          {caption !== undefined && t(caption)}
                        </SubTitle1>
                      );
                    })}
                  </ul>
                </Curtains>
              </div>
              <div className={classes.content}>
                <Curtains className={classes.wrapper}>{body!}</Curtains>
              </div>
            </>
          );
        }}
      </Flow>
    </section>
  );
};

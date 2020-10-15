import React, { useState } from 'react';
import classNames from 'classnames';
import { useMarketingStyles } from './MarketingStyles';
import { uid } from 'react-uid';
import { Success } from '../Success';
import { Subscribe } from '../Subscribe';
import { defineFlow } from '../../../../components/Flow/definition';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Flow } from '../../../../components/Flow';
import { Curtains } from '../../../../UiKit/Curtains';

interface IMarketingProps {
  className?: string;
}

const STEPS = defineFlow(Subscribe, Success);

export const Marketing = ({ className }: IMarketingProps) => {
  const classes = useMarketingStyles();

  const [steps] = useState(STEPS);

  return (
    <section className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <BackgroundColorProvider component="div" className={classes.content}>
          <Flow key={uid(steps)} steps={steps} onComplete={() => null}>
            {body => body}
          </Flow>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};

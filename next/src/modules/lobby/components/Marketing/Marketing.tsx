import React, { useState } from 'react';
import classNames from 'classnames';
import { useMarketingStyles } from './MarketingStyles';
import { uid } from 'react-uid';
import { Success } from '../Success';
import { Subscribe } from '../Subscribe';
import { defineFlow } from '../../../../components/Flow/definition';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Flow } from '../../../../components/Flow';

interface IMarketingProps {
  className?: string;
  enterprise?: boolean;
}

const STEPS = defineFlow(Subscribe, Success);

export const Marketing = ({ className, enterprise }: IMarketingProps) => {
  const classes = useMarketingStyles();

  const [steps] = useState(STEPS);

  return (
    <BackgroundColorProvider
      className={classNames(classes.component, className)}
      component="div"
    >
      <Flow key={uid(steps)} steps={steps} onComplete={() => null}>
        {body => body}
      </Flow>
    </BackgroundColorProvider>
  );
};

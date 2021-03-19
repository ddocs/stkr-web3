import React, { ReactNode } from 'react';
import { useStakeDescriptionValueStyles } from './StakeDescriptionValueStyles';
import { Headline5 } from '../../../../UiKit/Typography';

export interface IStakeDescriptionValueProps {
  children: ReactNode;
}

export const StakeDescriptionValue = ({
  children,
}: IStakeDescriptionValueProps) => {
  const classes = useStakeDescriptionValueStyles();

  return (
    <Headline5 classes={{ root: classes.root }} component="dd">
      {children}
    </Headline5>
  );
};

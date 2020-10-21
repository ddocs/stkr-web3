import React, { PropsWithChildren } from 'react';
import { useHeaderStyles } from './HeaderStyles';
import classNames from 'classnames';
import { Curtains } from '../../../../UiKit/Curtains';
import { Logotype } from '../Logotype';

export const HeaderFrame = ({
  children,
  outerClassName,
  innerClassName,
}: PropsWithChildren<{
  outerClassName: string | undefined;
  innerClassName: string | undefined;
}>) => {
  const classes = useHeaderStyles();

  return (
    <header className={classNames(classes.component, outerClassName)}>
      <Curtains classes={{ root: innerClassName }}>
        <Logotype className={classes.logo} />
        {children}
      </Curtains>
    </header>
  );
};

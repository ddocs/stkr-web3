import React, { PropsWithChildren } from 'react';
import { useHeaderStyles } from './HeaderStyles';
import classNames from 'classnames';
import { Curtains } from '../../../../UiKit/Curtains';
import { Logotype } from '../Logotype';
import { Toggle } from '../Toggle';
import { useIsSMDown } from '../../../../common/hooks/useTheme';

export const HeaderFrame = ({
  children,
  outerClassName,
  innerClassName,
}: PropsWithChildren<{
  outerClassName: string | undefined;
  innerClassName: string | undefined;
}>) => {
  const classes = useHeaderStyles();

  const isSMDown = useIsSMDown();

  return (
    <header className={classNames(classes.component, outerClassName)}>
      <Curtains classes={{ root: innerClassName }}>
        <Logotype className={classes.logo} />
        {isSMDown ? <Toggle /> : children}
      </Curtains>
    </header>
  );
};

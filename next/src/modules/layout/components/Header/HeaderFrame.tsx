import React, { PropsWithChildren } from 'react';
import { useHeaderStyles } from './HeaderStyles';
import classNames from 'classnames';
import { Curtains } from '../../../../UiKit/Curtains';
import { Logotype } from '../Logotype';
import { WithStyles } from '@material-ui/core';
import { headerFrameStyles } from './HeaderFrameStyles';

export const HeaderFrame = ({
  children,
  classes,
}: PropsWithChildren<{} & WithStyles<typeof headerFrameStyles>>) => {
  const innerClasses = useHeaderStyles();

  return (
    <header className={classNames(innerClasses.component, classes.root)}>
      <Curtains className={classes.curtains}>
        <Logotype className={innerClasses.logo} />
        {children}
      </Curtains>
    </header>
  );
};

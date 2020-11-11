import React, { ReactElement } from 'react';
import { Fade, Slide } from '@material-ui/core';

export const Transition = React.forwardRef(function Transition(
  { children, ...props }: { children?: ReactElement<any, any> },
  ref,
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      children={children}
      {...props}
      timeout={600}
    />
  );
});

export const TransitionOpacity = React.forwardRef(function Transition(
  { children, ...props }: { children?: ReactElement<any, any> },
  ref,
) {
  return <Fade ref={ref} children={children} {...props} timeout={600} />;
});

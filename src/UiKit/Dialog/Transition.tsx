import React, { ReactElement } from 'react';
import { Fade } from '@material-ui/core';

export const Transition = React.forwardRef(function Transition(
  { children, ...props }: { children?: ReactElement<any, any> },
  ref,
) {
  return <Fade ref={ref} children={children} {...props} timeout={600} />;
});

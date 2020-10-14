import React from 'react';
import { Container, ContainerProps } from '@material-ui/core';

export const Curtains = React.forwardRef<
  HTMLElement,
  ContainerProps & { component?: React.ElementType; children: React.ReactNode }
>(({ children, className, component = 'div', ...props }, ref) => (
  <Container className={className} component={component} {...props} ref={ref}>
    {children}
  </Container>
));

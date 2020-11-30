import React from 'react';
import { ContainerProps, Paper } from '@material-ui/core';

// TODO Remove
export const BackgroundColorProvider = ({
  component,
  ...props
}: ContainerProps & {
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}) => {
  return <Paper component={component} {...props} />;
};

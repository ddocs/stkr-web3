import { ContainerProps, Paper, PaperProps } from '@material-ui/core';
import React from 'react';

interface IBackgroundColorProviderProps {
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

// TODO Remove
export const BackgroundColorProvider = ({
  component,
  ...props
}: IBackgroundColorProviderProps & ContainerProps & PaperProps) => {
  return <Paper component={component} {...props} />;
};

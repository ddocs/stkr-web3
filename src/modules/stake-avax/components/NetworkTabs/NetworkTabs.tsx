import { Box, BoxProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useNetworkTabsStyles } from './useNetworkTabsStyles';

interface INetworkTabsProps extends BoxProps {}

export const NetworkTabs = ({ className, children }: INetworkTabsProps) => {
  const classes = useNetworkTabsStyles();

  return <Box className={classNames(classes.root, className)}>{children}</Box>;
};

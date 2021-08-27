import { Box, BoxProps, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useBalanceTitleStyles } from './useBalanceTitleStyles';

interface IBalanceTitleProps extends BoxProps {
  icon?: ReactNode;
  title: string;
}

export const BalanceTitle = ({
  icon,
  title,
  ...restProps
}: IBalanceTitleProps) => {
  const classes = useBalanceTitleStyles();

  return (
    <Box {...restProps} display="flex" alignItems="center">
      {icon && (
        <Box mr={1} component="i" display="flex">
          {icon}
        </Box>
      )}

      <Typography variant="body1" className={classes.title}>
        {title}
      </Typography>
    </Box>
  );
};

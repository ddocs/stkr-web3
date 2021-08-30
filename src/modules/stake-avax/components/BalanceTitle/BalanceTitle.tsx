import {
  Box,
  BoxProps,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { ReactNode } from 'react';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { useBalanceTitleStyles } from './useBalanceTitleStyles';

interface IBalanceTitleProps extends BoxProps {
  icon?: ReactNode;
  title: string;
  tooltip?: string;
}

export const BalanceTitle = ({
  icon,
  title,
  tooltip,
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

      {tooltip && (
        <Tooltip title={tooltip}>
          <IconButton>
            <QuestionIcon size="xs" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

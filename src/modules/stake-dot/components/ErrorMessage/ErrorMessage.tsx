import { Box, Paper, PaperProps, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { Button } from '../../../../UiKit/Button';
import { useErrorMessageStyles } from './useErrorMessageStyles';

interface IErrorMessageProps extends PaperProps {
  title?: string;
  text?: string;
  onClick?: () => void;
  btnText?: string;
  isLoading?: boolean;
}

export const ErrorMessage = ({
  className,
  title,
  text,
  btnText,
  onClick,
  children,
  isLoading = false,
  ...restProps
}: IErrorMessageProps) => {
  const classes = useErrorMessageStyles();

  return (
    <Paper
      variant="outlined"
      square={false}
      className={classNames(classes.root, className)}
      {...restProps}
    >
      {title && (
        <Typography className={classes.title} variant="h2">
          {title}
        </Typography>
      )}

      {text && <Typography>{text}</Typography>}

      {children}

      {typeof onClick === 'function' && (
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            size="large"
            isLoading={isLoading}
          >
            {btnText || 'Try to reload'}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

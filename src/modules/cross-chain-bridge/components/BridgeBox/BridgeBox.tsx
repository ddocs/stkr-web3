import { IconButton, Paper, PaperProps } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { CloseIcon } from '../../../../UiKit/Icons/CloseIcon';
import { useBridgeBoxStyles } from './BridgeBoxStyles';

interface IBridgeBoxProps extends PaperProps {
  onCloseClick?: () => void;
}

export const BridgeBox = ({
  className,
  children,
  onCloseClick,
  ...props
}: IBridgeBoxProps) => {
  const classes = useBridgeBoxStyles();
  const withCloseBtn = !!onCloseClick;

  return (
    <Paper
      {...props}
      className={classNames(
        classes.root,
        className,
        withCloseBtn && classes.rootPadding,
      )}
      variant="outlined"
      square={false}
    >
      {children}

      {withCloseBtn && (
        <IconButton className={classes.close} onClick={onCloseClick}>
          <CloseIcon size="sm" />
        </IconButton>
      )}
    </Paper>
  );
};

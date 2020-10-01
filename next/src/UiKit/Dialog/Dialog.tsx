import React from 'react';
import classNames from 'classnames';
import { Dialog as MuiDialog, IconButton } from '@material-ui/core';
import { useDialogStyles } from './DialogStyles';
import { FocusOn } from 'react-focus-on';
import { Transition } from './Transition';
import { BackgroundColorProvider } from '../BackgroundColorProvider';
import { useIsXSDown } from '../../common/hooks/useTheme';
import { CancelIcon } from '../Icons/CancelIcon';

type MaxWidthType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IDialogProps {
  open: boolean;
  children?: React.ReactNode | any;
  onClose: () => void;
  maxWidth?: MaxWidthType;
  minHeight?: number;
  largeCloseIcon?: boolean;
  overflowHidden?: boolean;
}

const getMaxWidthComponent = (width: MaxWidthType) => {
  switch (width) {
    case 'xs':
      return 444;
    case 'sm':
      return 700;
    case 'md':
      return 960;
    case 'lg':
      return 1280;
    case 'xl':
      return 1920;
  }
};

export const Dialog = ({
  onClose,
  open,
  maxWidth = 'sm',
  minHeight,
  overflowHidden,
  children,
}: IDialogProps) => {
  const width = getMaxWidthComponent(maxWidth);

  const classes = useDialogStyles({
    maxWidth: width,
    minHeight,
  });

  const isXSDown = useIsXSDown();

  return (
    <MuiDialog
      open={open}
      TransitionComponent={Transition}
      onEscapeKeyDown={onClose}
      onBackdropClick={onClose}
      disableAutoFocus={true}
      fullScreen={isXSDown}
      maxWidth={!isXSDown && false}
      classes={{
        paper: classes.component,
      }}
    >
      <FocusOn
        className={classNames(
          classes.wrapper,
          overflowHidden && classes.wrapperOverflowHidden,
        )}
        enabled={open}
        onEscapeKey={onClose}
        onClickOutside={onClose}
      >
        <BackgroundColorProvider
          className={classes.content}
          tabIndex={-1}
          component="div"
        >
          {children}
        </BackgroundColorProvider>
        <IconButton className={classes.close} onClick={onClose}>
          <CancelIcon />
        </IconButton>
      </FocusOn>
    </MuiDialog>
  );
};

import React from 'react';
import { Dialog, IconButton } from '@material-ui/core';
import { useCustomDialogStyles } from './CustomDialogStyles';
import { FocusOn } from 'react-focus-on';
import { Transition, TransitionOpacity } from './Transition';
import classNames from 'classnames';
import { CancelIcon } from '../../UiKit/Icons/CancelIcon';
import { useIsXSDown } from '../../common/hooks/useTheme';

type MaxWidthType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ICustomDialogProps {
  open: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  maxWidth?: MaxWidthType;
  minHeight?: number;
  largeCloseIcon?: boolean;
  overflowHidden?: boolean;
  withoutCloseButton?: boolean;
  transitionOpacity?: boolean;
}

const getMaxWidthComponent = (width: MaxWidthType) => {
  switch (width) {
    case 'xs':
      return 444;
    case 'sm':
      return 600;
    case 'md':
      return 960;
    case 'lg':
      return 1280;
    case 'xl':
      return 1920;
  }
};

export const CustomDialog = ({
  onClose,
  open,
  maxWidth = 'sm',
  minHeight,
  largeCloseIcon,
  overflowHidden,
  withoutCloseButton,
  transitionOpacity,
  children,
}: ICustomDialogProps) => {
  const width = getMaxWidthComponent(maxWidth);

  const classes = useCustomDialogStyles({
    maxWidth: width,
    minHeight,
    largeCloseIcon,
  });

  const isXSDown = useIsXSDown();

  return (
    <Dialog
      open={open}
      TransitionComponent={!transitionOpacity ? Transition : TransitionOpacity}
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
        focusLock={false}
      >
        <div className={classes.content} tabIndex={-1}>
          {children}
        </div>
        {!withoutCloseButton && (
          <IconButton className={classes.close} onClick={onClose}>
            <CancelIcon />
          </IconButton>
        )}
      </FocusOn>
    </Dialog>
  );
};

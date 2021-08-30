import React from 'react';
import cn from 'classnames';

import { useStyles } from './Styles';

interface ModalProps {
  onToggle: () => void;
  isVisible: boolean;
  hideAll?: boolean;
  children: React.ReactNode;
}
const Modal = ({
  onToggle,
  isVisible,
  hideAll = true,
  children,
}: ModalProps) => {
  const classes = useStyles();

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList[0]?.includes('container')) {
      onToggle();
    }
  };

  return (
    <div
      className={cn(classes.container, {
        [classes.containerVisible]: isVisible,
        [classes.containerHideAll]: isVisible && hideAll,
      })}
      onClick={handleClose}
    >
      {children}
    </div>
  );
};

export default Modal;

import { Dialog } from '@material-ui/core';
import React, { ReactNode, useCallback, useState } from 'react';
import { StakeDot as StakeDotModalContent } from '../../../stake/screens/StakeDot';
import { useStakeDialogStyles } from './StakeDialogStyles';

interface IStakeDialogProps {
  children?: ReactNode;
}

export const StakeDialog = ({ children }: IStakeDialogProps) => {
  const classes = useStakeDialogStyles();

  const [isOpened, setIsOpened] = useState(false);
  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  const element = React.isValidElement(children)
    ? React.cloneElement(children, { onClick: handleOpen })
    : null;

  return (
    <>
      {element}
      <Dialog
        open={isOpened}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ square: false }}
        classes={{ paper: classes.root }}
      >
        <StakeDotModalContent onCancel={handleClose} />
      </Dialog>
    </>
  );
};

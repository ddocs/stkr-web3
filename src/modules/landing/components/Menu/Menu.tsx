import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import cn from 'classnames';

import { useStyles } from './Styles';

interface MenuProps {
  onClose: () => void;
  isVisible: boolean;
}
const Menu = ({ onClose, isVisible }: MenuProps) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if ((e.target.classList[0] as string).includes('container')) {
      onClose();
    }
  };

  return (
    <div
      className={cn(classes.container, {
        [classes.containerVisible]: isVisible,
      })}
      onClick={handleClose}
    >
      <div className={classes.content}>
        <div className={classes.menuItem}>Main</div>
        <div className={classes.menuItem}>Community</div>
        <div className={classes.menuItem}>Docs</div>
        <div className={classes.menuItem}>About</div>
      </div>
      <div className={classes.social}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isMobile ? 'Tw' : 'Twitter'}
        </a>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isMobile ? 'Tg' : 'Telegram'}
        </a>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isMobile ? 'Me' : 'Medium'}
        </a>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isMobile ? 'Di' : 'Discord'}
        </a>
      </div>
    </div>
  );
};

export default Menu;

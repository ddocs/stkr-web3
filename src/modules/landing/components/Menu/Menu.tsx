import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import { useStyles } from './Styles';
import Modal from '../Modal/Modal';

interface MenuProps {
  onMenuToggle: () => void;
  isVisible: boolean;
}
const Menu = ({ onMenuToggle, isVisible }: MenuProps) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:960px)');

  return (
    <Modal isVisible={isVisible} onToggle={onMenuToggle} hideAll={false}>
      <div className={classes.content}>
        <div className={classes.menuItem}>
          <a href="/" target="_blank" rel="noreferrer">
            Main
          </a>
        </div>
        <div className={classes.menuItem}>
          <a href="https://t.me/ankrnetwork" target="_blank" rel="noreferrer">
            Community
          </a>
        </div>
        <div className={classes.menuItem}>
          <a
            href="https://ankr.gitbook.io/staking-docs/"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </div>
      </div>
      <div className={classes.social}>
        <a
          href="https://twitter.com/ankr?s=20"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isDesktop ? 'Twitter' : 'Tw'}
        </a>
        <a
          href="https://t.me/ankrnetwork"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isDesktop ? 'Telegram chat' : 'Tg chat'}
        </a>
        <a
          href="https://t.me/anrknetworkann"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isDesktop ? 'Telegram announcements' : 'Tg ann'}
        </a>
        <a
          href="https://discord.gg/R9mzypfZb8"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isDesktop ? 'Discord' : 'Di'}
        </a>
        <a
          href="https://www.reddit.com/r/Ankrofficial/"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isDesktop ? 'Reddit' : 'Re'}
        </a>
        <a
          href="https://medium.com/ankr-network"
          target="_blank"
          rel="noreferrer"
          className={classes.socialLink}
        >
          {isDesktop ? 'Medium' : 'Me'}
        </a>
      </div>
    </Modal>
  );
};

export default Menu;

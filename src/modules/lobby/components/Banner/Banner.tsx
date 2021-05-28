import classNames from 'classnames';
import React from 'react';
import { useBannerStyles } from './BannerStyles';
import { ReactComponent as Panel2 } from './assets/panel_2.svg';
import Panel1 from './assets/panel_1.png';
import Panel3 from './assets/panel_3.png';

export const Banner = () => {
  const classes = useBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classNames(classes.panel, 'panel_1')}>
        <img src={Panel1} width="376" height="206" alt="" />
      </div>
      <div className={classNames(classes.panel, 'panel_2')}>
        <Panel2 />
      </div>
      <div className={classNames(classes.panel, 'panel_3')}>
        <img src={Panel3} width="215" height="128" alt="" />
      </div>
    </div>
  );
};

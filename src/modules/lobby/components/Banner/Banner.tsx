import { ArrowForward } from '@material-ui/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_AETH_PATH } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { InView } from '../../../../components/InView';
import { Button } from '../../../../UiKit/Button';
import { Curtains } from '../../../../UiKit/Curtains';
import { useBannerStyles } from './BannerStyles';
import { ReactComponent as Panel1 } from './assets/panel_1.svg';
import { ReactComponent as Panel2 } from './assets/panel_2.svg';
import { ReactComponent as Panel3 } from './assets/panel_3.svg';

export const Banner = () => {
  const classes = useBannerStyles();

  return (
    <div className={classes.root}>
      <div className={classNames(classes.panel, 'panel_1')}>
        <Panel1 />
      </div>
      <div className={classNames(classes.panel, 'panel_2')}>
        <Panel2 />
      </div>
      <div className={classNames(classes.panel, 'panel_3')}>
        <Panel3 />
      </div>
    </div>
  );
};

import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Promo } from './Promo';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const PromoStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Promo />
    </div>
  );
};

export const PromoExample = () => <PromoStory />;

export default {
  title: 'modules/Lobby/component/Promo',
};

import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Info } from './Info';

const useStyles = makeStyles<Theme>(theme => ({
  block: {},
}));

const LIST = [
  {
    caption: 'about.total',
    value: '$1,233,234',
  },
  {
    caption: 'about.providers',
    value: '342',
  },
  {
    caption: 'about.stakers',
    value: '2500',
  },
];

const InfoStory = () => {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Info data={LIST} />
    </div>
  );
};

export const InfoExample = () => <InfoStory />;

export default {
  title: 'components/Info',
};

import React from 'react';

import { useStyles } from './Styles';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

const BgVideo = () => {
  const classes = useStyles();

  return (
    <SectionWrapper needTimeout={false}>
      <div className={classes.bgVideo}>
        <video width="100%" height="100%" autoPlay loop muted playsInline>
          <source src="/landing/bgVideo.mp4" type="video/mp4" />
        </video>
        <div className={classes.gradient} />
      </div>
    </SectionWrapper>
  );
};

export default BgVideo;

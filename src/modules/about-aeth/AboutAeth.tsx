import React from 'react';
import { DISABLE_VIDEO } from '../../common/const';
import { Services } from '../../components/Services';
import { useAboutAethStyles } from './AboutAethStyles';
import { Advantages } from './components/Advantages';
import { ItWorks } from './components/ItWorks';
import { Promo } from './components/Promo';
import { Rewards } from './components/Rewards';
import { Start } from './components/Start';
import { VideoTutorial } from './components/VideoTutorial';

export const AboutAeth = () => {
  const classes = useAboutAethStyles();
  return (
    <>
      <Promo />
      {!DISABLE_VIDEO && <VideoTutorial />}
      <Rewards />
      <Advantages />
      <Services className={classes.services} />
      <ItWorks />
      <Start />
    </>
  );
};

export default AboutAeth;

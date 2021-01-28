import React from 'react';
import { DEV_ONLY } from '../../common/const';
import { Advantages } from './components/Advantages';
import { ItWorks } from './components/ItWorks';
import { Promo } from './components/Promo';
import { Rewards } from './components/Rewards';
import { Services } from './components/Services';
import { Start } from './components/Start';
import { VideoTutorial } from './components/VideoTutorial';

export const AboutAeth = () => {
  return (
    <>
      <Promo />
      {DEV_ONLY && <VideoTutorial />}
      <Rewards />
      <Advantages />
      <Services />
      <ItWorks />
      <Start />
    </>
  );
};

export default AboutAeth;

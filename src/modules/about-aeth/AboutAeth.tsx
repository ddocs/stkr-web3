import React from 'react';
import { VideoTutorial } from './components/VideoTutorial';
import { Promo } from './components/Promo';
import { Rewards } from './components/Rewards';
import { Advantages } from './components/Advantages';
import { Services } from './components/Services';
import { ItWorks } from './components/ItWorks';
import { Start } from './components/Start';

export const AboutAeth = () => {
  return (
    <>
      <Promo />
      <VideoTutorial />
      <Rewards />
      <Advantages />
      <Services />
      <ItWorks />
      <Start />
    </>
  );
};

export default AboutAeth;

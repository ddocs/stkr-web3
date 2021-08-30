import React from 'react';
import InfoItem from '../InfoItem/InfoItem';
import { useStyles } from './Styles';

const Info = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <InfoItem value={82522} startValue={50000}>
          <span>Crowdsourced&nbsp;</span>
          <img src="/landing/icons/dot.svg" />
          <span>&nbsp;DOT by Ankr</span>
        </InfoItem>

        <InfoItem value={1233}>
          Number of listed projects on Ankr Crowdloan marketplace
        </InfoItem>

        <InfoItem value={123456} startValue={100000}>
          Estimated USD amount of rewards to be distributed by Ankr Multisig
          Escrow Wallet
        </InfoItem>
      </div>
    </div>
  );
};

export default Info;

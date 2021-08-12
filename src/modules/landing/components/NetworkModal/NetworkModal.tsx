import React from 'react';

import { useStyles } from './Styles';
import Modal from '../Modal/Modal';
import NetworkCard from '../NetworkCard/NetworkCard';

const CARDS = [
  {
    logo: '/landing/icons/ksm.svg',
    title: 'Kusama',
    url: '/parachain-bonds/ksm/crowdloans',
  },
  {
    logo: '/landing/icons/polkadot.svg',
    title: 'Polkadot',
    url: '/parachain-bonds/dot/crowdloans',
  },
  {
    logo: '/landing/icons/westend.svg',
    title: 'Westend',
    description: 'There is no ongoing crowdloan on Westend at the moment',
    disabled: true,
    url: '/',
  },
  {
    logo: '/landing/icons/rococo.svg',
    title: 'Rococo',
    description: 'There is no ongoing crowdloan on Westend at the moment',
    disabled: true,
    url: '/',
  },
];

interface MenuProps {
  onToggle: () => void;
  isVisible: boolean;
}
const NetworkModal = ({ onToggle, isVisible }: MenuProps) => {
  const classes = useStyles();

  return (
    <Modal isVisible={isVisible} onToggle={onToggle}>
      <div className={classes.container}>
        <div className={classes.close} onClick={onToggle}>
          Close
        </div>
        <div className={classes.content}>
          <div className={classes.title}>Please select network</div>
          <div className={classes.cards}>
            {CARDS.map(card => (
              <NetworkCard {...card} key={card.title} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NetworkModal;

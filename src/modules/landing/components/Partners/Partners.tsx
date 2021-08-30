import React from 'react';

import { useStyles } from './Styles';
import PartnerCard from '../PartnerCard/PartnerCard';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

const partners = [
  {
    title: 'Bounce',
    iconUrl: '/landing/icons/bounce.svg',
    advantages: [
      {
        text: 'Claim your parachain bond rewards',
        isReady: true,
      },
      {
        text: 'Crowdloan Marketplace',
        isReady: true,
      },
      {
        text: 'Parachain Bond Auction',
        isReady: false,
      },
    ],
    link: 'https://bounce.finance/',
  },
  {
    title: 'Clover',
    iconUrl: '/landing/icons/clover.svg',
    advantages: [
      {
        text: 'Claim your parachain bond rewards',
        isReady: true,
      },
      {
        text: 'Crowdloan Marketplace',
        isReady: true,
      },
    ],
    link: 'https://clover.finance/',
  },
  {
    title: 'OnX',
    iconUrl: '/landing/icons/onx.svg',
    advantages: [
      {
        text: 'Claim your parachain bond rewards',
        isReady: true,
      },
      {
        text: 'Parachain Bond Lending',
        isReady: true,
      },
    ],
    link: 'https://onx.finance/',
  },
];

const Products = () => {
  const classes = useStyles();

  return (
    <SectionWrapper>
      <div className={classes.container}>
        <div className={classes.sectionName}>Trusted</div>
        <div className={classes.title}>Partners.</div>
        <div className={classes.productsContainer}>
          <div className={classes.products}>
            {partners.map(partner => (
              <PartnerCard {...partner} key={partner.title} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Products;

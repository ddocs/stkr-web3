import React from 'react';

import { useStyles } from './Styles';
import ProductCard, { ProductCardProps } from '../ProductCard/ProductCard';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

const products = [
  {
    title: 'Khala Network',
    description:
      'Khala Network will join the Kusama slot auction when the second slot auction opens.',
    time: '2d 12h 10m',
    iconUrl: '/landing/icons/khala.svg',
    tokenName: 'PHA',
    info: {
      totalRaised: 'N/A',
      raisedAnkr: 'N/A',
      initialReward: 'N/A',
      dailyReward: 'N/A',
    },
  },
  {
    title: 'Crust Network',
    description:
      'CRUST provides a decentralized storage network of Web3.0 ecosystem. It supports multiple storage layer protocols such as IPFS, and exposes storage interfaces to application layer.',
    time: '3d 7h 32m',
    iconUrl: '/landing/icons/crust.svg',
    tokenName: 'CRU',
    info: {
      totalRaised: 'N/A',
      raisedAnkr: 'N/A',
      initialReward: 'N/A',
      dailyReward: 'N/A',
    },
  },
  {
    title: 'Darwinia',
    description:
      'Darwinia Network is a decentralized cross-chain bridge network building on Substrate, which is the "Golden Gate Bridge" of the cross-chain ecology.',
    time: '2d 12h 10m',
    iconUrl: '/landing/icons/darwina.svg',
    tokenName: 'RING',
    info: {
      totalRaised: 'N/A',
      raisedAnkr: 'N/A',
      initialReward: 'N/A',
      dailyReward: 'N/A',
    },
  },
] as ProductCardProps[];

const Products = () => {
  const classes = useStyles();

  return (
    <SectionWrapper>
      <div className={classes.container}>
        <div className={classes.sectionName}>Products</div>
        <div className={classes.title}>Crowdloan Marketplace</div>
        <div className={classes.productsContainer}>
          <div className={classes.products}>
            {products.map(product => (
              <ProductCard {...product} key={product.title} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Products;

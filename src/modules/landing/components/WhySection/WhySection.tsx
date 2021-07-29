import React from 'react';
import { useStyles } from './Styles';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

const WhySection = () => {
  const classes = useStyles();

  return (
    <SectionWrapper>
      <div className={classes.container}>
        <div className={classes.title}>Why StakeFi?</div>
        <table cellPadding={0} cellSpacing={0} className={classes.table}>
          <tbody>
            <tr className={classes.tableRow}>
              <td className={classes.tableKey}>Enable Liquidity</td>
              <td className={classes.tableValue}>
                On bonded DOT from Parachain Slot Auction through Auction
                Marketplace and Borrowing
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableKey}>High Yield</td>
              <td className={classes.tableValue}>
                On Polkadot tokens from winning Parachain Slot Auction projects
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableKey}>
                Become a Parachain Bond Market Maker
              </td>
              <td className={classes.tableValue}>
                Trade Parachain Bonds below or above your target price
              </td>
            </tr>
            <tr className={classes.tableRow}>
              <td className={classes.tableKey}>
                Leverage Parachain Bond rewards
              </td>
              <td className={classes.tableValue}>
                Borrowing DOT, without leveraging DOT market risk
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
};

export default WhySection;

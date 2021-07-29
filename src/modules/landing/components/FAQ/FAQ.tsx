import React from 'react';

import FAQItem from '../FAQItem/FAQ';
import { useStyles } from './Styles';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

const questions = [
  {
    question:
      'Will I get rewards for the bonded DOT after claiming a Parachain bond?',
    answer: (
      <span>
        Yes, you will get rewards for the bonded DOT depending on the project
        you supported. The rewards will be claimable to the Parachain bond
        holder. If you swap your Parachain bond with someone else, the buyer of
        the Parachain bond will receive future rewards.
      </span>
    ),
  },
  {
    question: 'How will I receive my Parachain Bond rewards?',
    answer: (
      <span>
        Parachain Bond rewards will be claimable on Ankr StakeFi to Parachain
        Bond holders on Ethereum network. Rewarded tokens will be ERC-20 tokens.
      </span>
    ),
  },
  {
    question: 'How much fee does Ankr take?',
    answer: (
      <span>
        Ankr takes 5% from the rewards as a fee. 2% will be used for Ankr
        Corporate Treasury, 3% will be used to run an Ankr Buyback program.
      </span>
    ),
  },
  {
    question: 'Why should I get a Parachain bond?',
    answer: (
      <span>
        <u>Liquidity</u>: Parachain bonds enable liquidity on bonded DOT through
        a dedicated auction marketplace on Bounce Finance.
        <br />
        <br />
        <u>High Yield</u>: Furthermore, it integrates rewards from projects
        winning Parachain Slot Auctions, meaning that Parachain Bonds are like
        High Yield Bonds, which should offer a superior yield than the upcoming
        Polkadot Internet Bonds (receiving staking rewards).
        <br />
        <br />
        <u>Lending/Borrowing</u>: Collateralize your Parachain Bond on Onx
        Finance and borrow DOT, which can be used to free up liquidity, or buy
        more Parachain Bonds on Bounce Finance.
        <br />
        <br />
        <u>Become a Parachain Bond Market Maker</u>: What is the fair price of a
        Parachain Bond? That depends on your individual risk tolerance. We can
        define the price of 1 Parachain Bonds as the following:
        <img src="/landing/formula.png" width="100%" alt="formula" />
        <br />
        <br />
        Depending on the risk premium required by buyers/sellers of Parachain
        Bonds, it is likely that Parachain Bonds will be traded at a premium vs.
        DOT, unless the rewarded token price decreases significantly and/or the
        required risk premium of some buyers is very high.
      </span>
    ),
  },
  {
    question: 'Which projects will be supported?',
    answer: (
      <span>
        All projects rewarding DOT lenders in ERC-20 tokens can be supported.
      </span>
    ),
  },
  {
    question: 'What is the minimum staking requirement?',
    answer: <span>1 Dot / 1 KSM</span>,
  },
  {
    question: 'Will projects on Kusama Parachain crowdloans be supported?',
    answer: (
      <span>
        Ankr StakeFi also plans to support Kusama Parachain crowdloans, but the
        priority number 1 will be supporting Polkadot Parachain crowdloans
        initially.
      </span>
    ),
  },
  {
    question: 'How can I participate in the Parachain crowdloans?',
    answer: (
      <span>
        You can participate in the Parachain crowdloans by visiting{' '}
        <a
          href="https://stakefi-parachain.ankr.com/"
          target="_blank"
          rel="noreferrer"
        >
          https://stakefi-parachain.ankr.com/
        </a>
      </span>
    ),
  },
  {
    question: 'Should I use Polkadot.js in parallel to StakeFi?',
    answer: (
      <span>
        There is no need to run Polkadot.js as Ankr StakeFi will collect the
        DOT/KSM tokens and participate in the Polkadot crowdloans on Polkadot.js
        wallet on behalf of Ankr StakeFi users. As such, we will be able to
        collect rewards from winning Parachain Slot Auction projects, and
        distribute those rewards to Parachain Bond holders.
      </span>
    ),
  },
  {
    question: 'Are my bonded DOT in Parachain crowdloans also staked?',
    answer: (
      <span>
        No, Parachain Slot Auction design is made in a way that bonded DOT
        cannot be staked. However, projects crowdsourcing your DOT and
        participating in Polkadot Parachain Slot Auctions will rewards the
        community with their own tokens.
      </span>
    ),
  },
  {
    question:
      'Will projects participating in Parachain Slot Auction without ERC-20 tokens be supported on Ankr StakeFi?',
    answer: (
      <span>
        According to our estimate, approximately 80% of the projects that plan
        to participate in Parachain Slot Auction have ERC-20 tokens. Therefore,
        Ankr StakeFi will focus first on projects rewarded ERC-20 tokens, but
        does not exclude the possibility to support other projects without
        ERC-20 tokens in the future.
      </span>
    ),
  },
  {
    question:
      'Are Ankr tokens required to use StakeFi Parachain Crowdloans and Parachain Bonds?',
    answer: (
      <span>
        No, Ankr tokens are not required to use StakeFi Parachain Crowdloans and
        Parachain Bonds.
      </span>
    ),
  },
];

const FAQ = () => {
  const classes = useStyles();

  return (
    <SectionWrapper>
      <div className={classes.container}>
        <div className={classes.title}>FAQ</div>
        <div className={classes.content}>
          {questions.map(({ question, answer }) => (
            <FAQItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQ;

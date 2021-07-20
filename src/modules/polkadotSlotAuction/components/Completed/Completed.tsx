import React from 'react';
import { uid } from 'react-uid';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import { useCompletedStyles } from './CompletedStyles';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../Table';
import { CaptionType } from '../Table/types';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { ICrowdloanType } from '@ankr.com/stakefi-polkadot';
import { useCrowdloansWithBalances } from '../../hooks/useCrowdloans';
import { Body2 } from '../../../../UiKit/Typography';

interface ICompletedProps {}

export const Completed = ({}: ICompletedProps) => {
  const classes = useCompletedStyles();

  const { slotAuctionSdk, polkadotAccount } = useSlotAuctionSdk();

  const captions: CaptionType[] = [
    {
      label: t('polkadot-slot-auction.header.project'),
    },
    {
      label: t('polkadot-slot-auction.header.status'),
    },
    {
      label: t('polkadot-slot-auction.header.lease-duration'),
      tip: t('polkadot-slot-auction.header.lease-duration-tip'),
    },
    {
      label: t('polkadot-slot-auction.header.raised-on-ankr'),
    },
    {
      label: '',
      align: 'right',
    },
  ];

  const { crowdloans, balances } = useCrowdloansWithBalances(
    slotAuctionSdk,
    'SUCCEEDED',
    polkadotAccount,
  );

  const handleClaimRewardTokens = async (item: ICrowdloanType) => {
    await slotAuctionSdk.claimRewardPoolTokens(polkadotAccount, item.loanId);
  };

  const renderClaimButton = (item: ICrowdloanType) => {
    const balance = balances[item.loanId];
    if (!balance) {
      return (
        <Button variant="outlined" className={classes.button} disabled={true}>
          {t('polkadot-slot-auction.buy-adotp-button')}
        </Button>
      );
    }
    if (!balance.claimable.isZero()) {
      return (
        <Button
          color="primary"
          className={classes.button}
          onClick={() => handleClaimRewardTokens(item)}
        >
          {t('polkadot-slot-auction.claim-dot-button', {
            value: balance ? balance.claimable.toString(10) : '0',
          })}
        </Button>
      );
    }
    return (
      <Body2>
        {t('polkadot-slot-auction.my-balance', {
          value: balance.total
            .plus(balance.onchain)
            .plus(balance.claimable)
            .toString(10),
        })}
      </Body2>
    );
  };

  return (
    <Table
      customCell="3fr 2fr 3fr 2fr 3fr"
      columnsCount={captions.length}
      paddingCollapse
    >
      <TableHead>
        {captions.map(cell => (
          <TableHeadCell
            key={uid(cell)}
            label={cell.label}
            align={cell.align}
          />
        ))}
      </TableHead>
      <TableBody>
        {crowdloans.map(item => (
          <TableRow key={uid(item)}>
            <TableBodyCell>{item.name}</TableBodyCell>
            <TableBodyCell>
              {item.status === 'SUCCEEDED' && 'Active'}
            </TableBodyCell>
            <TableBodyCell>
              {new Date(item.startTime * 1000).toLocaleDateString()} –{' '}
              {new Date(item.endTime * 1000).toLocaleDateString()}
            </TableBodyCell>
            <TableBodyCell>
              {item.alreadyContributed.toString(10)}&nbsp;/&nbsp;
              {item.totalRaiseTarget.toString(10)}&nbsp;DOT
              <br />
              <Body2 color="secondary">
                {item.stakeFiContributed.toString(10)}&nbsp;DOT
              </Body2>
            </TableBodyCell>
            <TableBodyCell align="right">
              {renderClaimButton(item)}
            </TableBodyCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

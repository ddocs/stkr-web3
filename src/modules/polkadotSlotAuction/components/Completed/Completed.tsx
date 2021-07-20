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
  const customCell = `2fr 2fr 2fr 2fr 2fr`;

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
          Buy aDOTp
        </Button>
      );
    }
    if (!balance.claimable.isZero()) {
      return (
        <Button
          variant="contained"
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
      <div>
        <p>My balance:</p>
        <br />
        {balance.total
          .plus(balance.onchain)
          .plus(balance.claimable)
          .toString(10)}
        &nbsp;aDOTp
      </div>
    );
  };

  return (
    <Table
      customCell={customCell}
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
            <TableBodyCell>{item.status}</TableBodyCell>
            <TableBodyCell>
              {new Date(item.startTime).toLocaleDateString()}-
              {new Date(item.endTime).toLocaleDateString()}
            </TableBodyCell>
            <TableBodyCell>
              {item.alreadyContributed.toString(10)}&nbsp;/&nbsp;
              {item.totalRaiseTarget.toString(10)}&nbsp;DOT
              <br />
              <p className={classes.subText}>
                {item.stakeFiContributed.toString(10)}&nbsp;DOT
              </p>
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

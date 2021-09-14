import React, { useState } from 'react';
import { uid } from 'react-uid';
import { Button } from '../../../../UiKit/Button';
import { t } from '../../../../common/utils/intl';
import { useMyRewardsStyles } from './MyRewardsStyles';
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
import { useCrowdloanBalances, useCrowdloans } from '../../hooks/useCrowdloans';
import { SlotAuctionActions } from '../../actions/SlotAuctionActions';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { Box } from '@material-ui/core';
import {
  QueryLoading,
  QueryLoadingCentered,
} from '../../../../components/QueryLoading/QueryLoading';
import { Query } from '@redux-requests/react';
import { useRewards } from '../../hooks/useRewards';
import { useDispatch } from 'react-redux';
import { DEFAULT_FIXED } from '../../../../common/const';

const captions: CaptionType[] = [
  {
    label: t('polkadot-slot-auction.header.parachain-bond'),
  },
  {
    label: t('polkadot-slot-auction.header.date'),
  },
  {
    label: t('polkadot-slot-auction.header.claimable-rewards'),
  },
  {
    label: t('polkadot-slot-auction.header.future-rewards'),
  },
  {
    label: t('polkadot-slot-auction.header.total-rewards'),
  },
  {
    label: '',
  },
];

export const MyRewards = () => {
  const classes = useMyRewardsStyles();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { slotAuctionSdk, polkadotAccount } = useSlotAuctionSdk();

  const { crowdloans } = useCrowdloans(slotAuctionSdk, 'SUCCEEDED');

  const { balances } = useCrowdloanBalances();

  const { claimableStakingRewards } = useRewards(slotAuctionSdk);

  const hasStakingRewards = (myLoanId: number) => {
    const currentClaimableRewards = claimableStakingRewards?.find(
      csr => csr.loanId === myLoanId,
    );

    return currentClaimableRewards && !currentClaimableRewards.amount.isZero();
  };

  const handleClaim = async (myLoanId: number) => {
    setLoading(true);
    await dispatch(
      SlotAuctionActions.claimStakingRewards(
        slotAuctionSdk,
        polkadotAccount,
        myLoanId,
      ),
    );
    await dispatch(SlotAuctionActions.fetchCrowdloanBalances(polkadotAccount));
    setLoading(false);
  };

  return (
    <Table
      customCell="2fr 1fr 2fr 1fr 1fr 2fr"
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
        <Query
          type={SlotAuctionActions.fetchCrowdloansByStatus}
          errorComponent={QueryError}
          loadingComponent={() => (
            <Box mt={5}>
              <QueryLoadingCentered />
            </Box>
          )}
        >
          {() =>
            crowdloans.map(item => {
              const myLoanId = item.loanId;
              const currentBalance = balances[myLoanId];

              return (
                <TableRow key={uid(item)}>
                  <TableBodyCell>
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.projectLogo}
                        alt=""
                        className={classes.img}
                      />
                      {item.projectName}
                    </Box>
                  </TableBodyCell>
                  <TableBodyCell>
                    {new Date(item.endTime * 1000).toLocaleDateString()}
                  </TableBodyCell>
                  <TableBodyCell>
                    {currentBalance
                      ? `${currentBalance.claimableStakingRewards
                          .decimalPlaces(DEFAULT_FIXED)
                          .toString(10)} ${currentBalance.stakingTokenSymbol}`
                      : '0'}
                  </TableBodyCell>
                  <TableBodyCell>
                    {currentBalance
                      ? `0 ${currentBalance.stakingTokenSymbol}`
                      : '0'}
                  </TableBodyCell>
                  <TableBodyCell>
                    {currentBalance
                      ? `${currentBalance.total
                          .decimalPlaces(DEFAULT_FIXED)
                          .toString(10)} ${currentBalance.stakingTokenSymbol}`
                      : '0'}
                  </TableBodyCell>
                  <TableBodyCell>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        className={classes.button}
                        onClick={() => handleClaim(myLoanId)}
                        disabled={!hasStakingRewards(myLoanId) || loading}
                      >
                        {t('polkadot-slot-auction.claim-rewards-button')}
                      </Button>
                      {loading && <QueryLoading size={40} />}
                    </Box>
                  </TableBodyCell>
                </TableRow>
              );
            })
          }
        </Query>
      </TableBody>
    </Table>
  );
};

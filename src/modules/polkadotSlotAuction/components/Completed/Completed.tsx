import React, { useState } from 'react';
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
import { useCrowdloanBalances, useCrowdloans } from '../../hooks/useCrowdloans';
import { Body2 } from '../../../../UiKit/Typography';
import { SlotAuctionActions } from '../../actions/SlotAuctionActions';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { Box } from '@material-ui/core';
import {
  QueryLoading,
  QueryLoadingCentered,
} from '../../../../components/QueryLoading/QueryLoading';
import { Query } from '@redux-requests/react';
import { useDispatch } from 'react-redux';

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
  },
];

export const Completed = () => {
  const classes = useCompletedStyles();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { slotAuctionSdk, polkadotAccount, networkType } = useSlotAuctionSdk();

  const { crowdloans } = useCrowdloans(slotAuctionSdk, 'SUCCEEDED');

  const { balances } = useCrowdloanBalances(
    slotAuctionSdk,
    'SUCCEEDED',
    polkadotAccount,
  );

  const handleClaimRewardTokens = async (loanId: number) => {
    setLoading(true);
    await dispatch(
      SlotAuctionActions.claimRewardPoolTokens(
        slotAuctionSdk,
        polkadotAccount,
        loanId,
      ),
    );
    await dispatch(
      SlotAuctionActions.fetchCrowdloanBalances(
        slotAuctionSdk,
        polkadotAccount,
      ),
    );
    setLoading(false);
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
              const loanId = item.loanId;
              const balance = balances[loanId];

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
                    {t(`polkadot-slot-auction.crowdloan-status.${item.status}`)}
                  </TableBodyCell>
                  <TableBodyCell>
                    {new Date(item.startTime * 1000).toLocaleDateString()} –{' '}
                    {new Date(item.endTime * 1000).toLocaleDateString()}
                  </TableBodyCell>
                  <TableBodyCell>
                    <Body2 color="secondary">
                      {item.stakeFiContributed.toString(10)} {networkType}
                    </Body2>
                  </TableBodyCell>
                  <TableBodyCell align="right">
                    {!balance ? (
                      <Button
                        variant="outlined"
                        className={classes.button}
                        disabled
                      >
                        {t('polkadot-slot-auction.buy-tokens-button', {
                          currency: networkType,
                        })}
                      </Button>
                    ) : !balance.claimable.isZero() ? (
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          color="primary"
                          className={classes.button}
                          onClick={() => handleClaimRewardTokens(loanId)}
                          disabled={loading}
                        >
                          {t('polkadot-slot-auction.claim-tokens-button', {
                            value: balance
                              ? balance.claimable.toString(10)
                              : '0',
                            currency: networkType,
                          })}
                        </Button>
                        {loading && <QueryLoading size={40} />}
                      </Box>
                    ) : (
                      <>
                        <span className={classes.myBalance}>
                          {t('polkadot-slot-auction.my-balance')}
                        </span>
                        <Body2>
                          {t('polkadot-slot-auction.tokens-balance', {
                            value: balance.total
                              .plus(balance.onchain)
                              .plus(balance.claimable)
                              .toString(10),
                            currency: networkType,
                          })}
                        </Body2>
                      </>
                    )}
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

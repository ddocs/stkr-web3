import { Box, Grid } from '@material-ui/core';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { uid } from 'react-uid';
import { t } from '../../../../common/utils/intl';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableRow,
} from '../../../../components/TableComponents';
import { Body1, Body2, Headline2 } from '../../../../UiKit/Typography';
import { BlockchainPanel } from '../BlockchainPanel';
import { BridgeBox } from '../BridgeBox';
import { useProgressStyles } from './ProgressStyles';

function createData(name: string, value: string) {
  return { name, value };
}

export interface IProgressProps {
  isCompleted?: boolean;
  subTitle?: string;
  isToEth?: boolean;
  amount: string | number;
  amountType: string;
  address: string;
}

export const Progress = ({
  isCompleted = false,
  subTitle = '~1 min left',
  isToEth = false,
  amount,
  amountType,
  address,
}: IProgressProps) => {
  const classes = useProgressStyles();
  const isToBinance = !isToEth;

  const rows = useMemo(
    () => [
      createData(
        t('cross-chain-bridge.progress.amount'),
        `${amount} ${amountType}`,
      ),
      createData(t('cross-chain-bridge.progress.address'), address),
    ],
    [address, amount, amountType],
  );

  const titleText = t('cross-chain-bridge.progress.title', {
    value: isCompleted
      ? t('cross-chain-bridge.progress.completed')
      : t('cross-chain-bridge.progress.in-progress'),
  });

  return (
    <BridgeBox>
      <Box mb={{ xs: 7, sm: 10 }} textAlign="center">
        <Headline2 component="h2" className={classes.title}>
          {titleText}
        </Headline2>

        <Body1 color="textSecondary">{subTitle}</Body1>
      </Box>

      <Box mb={2}>
        <Grid container spacing={3}>
          <Grid
            className={classNames(isToEth && classes.order1)}
            item
            xs={12}
            sm
          >
            <BlockchainPanel
              icon="eth"
              title={t('cross-chain-bridge.chain-ehthereum')}
              subTitle={
                isToEth
                  ? t('cross-chain-bridge.to')
                  : t('cross-chain-bridge.from')
              }
              disabled
            />
          </Grid>

          <Grid item xs={12} sm>
            <BlockchainPanel
              icon="binance"
              title={t('cross-chain-bridge.chain-binance')}
              subTitle={
                isToBinance
                  ? t('cross-chain-bridge.to')
                  : t('cross-chain-bridge.from')
              }
              disabled
            />
          </Grid>
        </Grid>
      </Box>

      <Table
        columnsCount={2}
        customCell="220px 1fr"
        paddingCollapse
        minWidth={0}
      >
        <TableBody>
          {rows.map((row, i) => {
            const isLastRow = rows.length - 1 === i;
            return (
              <TableRow
                key={uid(row)}
                className={classNames(isLastRow && classes.noBorder)}
              >
                <TableBodyCell
                  className={classNames(isLastRow && classes.noBorder)}
                >
                  <Body2 color="textSecondary">{row.name}:</Body2>
                </TableBodyCell>

                <TableBodyCell
                  align="right"
                  className={classNames(isLastRow && classes.noBorder)}
                >
                  <Body2 color="textSecondary">{row.value}</Body2>
                </TableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </BridgeBox>
  );
};

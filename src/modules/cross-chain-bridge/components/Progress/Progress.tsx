import { Box, Grid } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import { uid } from 'react-uid';
import { Blockchain } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableRow,
} from '../../../../components/TableComponents';
import { Body1, Body2, Headline2 } from '../../../../UiKit/Typography';
import { blockchainsMap } from '../../const';
import { BlockchainPanel } from '../BlockchainPanel';
import { BridgeBox } from '../BridgeBox';
import { useProgressStyles } from './ProgressStyles';

function createData(name: string, value: string) {
  return { name, value };
}

export interface IProgressProps {
  isCompleted?: boolean;
  subTitle?: string;
  fromBlockchain?: Blockchain;
  toBlockchain?: Blockchain;
  amount: string | number;
  amountType: string;
  address: string;
  children?: ReactNode;
  onCloseClick?: () => void;
}

export const Progress = ({
  isCompleted = false,
  subTitle,
  fromBlockchain = Blockchain.ethereum,
  toBlockchain = Blockchain.binance,
  amount,
  amountType,
  address,
  children,
  onCloseClick,
}: IProgressProps) => {
  const classes = useProgressStyles();

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
    <BridgeBox onCloseClick={onCloseClick}>
      <Box mb={{ xs: 7, sm: 10 }} textAlign="center">
        <Headline2 component="h2" className={classes.title}>
          {titleText}
        </Headline2>

        {subTitle && <Body1 color="textSecondary">{subTitle}</Body1>}
      </Box>

      <Box mb={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm>
            <BlockchainPanel
              icon={blockchainsMap[fromBlockchain].icon}
              title={blockchainsMap[fromBlockchain].title}
              subTitle={t('cross-chain-bridge.from')}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm>
            <BlockchainPanel
              icon={blockchainsMap[toBlockchain].icon}
              title={blockchainsMap[toBlockchain].title}
              subTitle={t('cross-chain-bridge.to')}
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

      {children}
    </BridgeBox>
  );
};

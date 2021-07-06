import { Box, IconButton, Tooltip } from '@material-ui/core';
import * as React from 'react';
import { uid } from 'react-uid';
import { useLocaleMemo } from '../../common/hooks/useLocaleMemo';
import { WithUseStyles } from '../../common/types';
import { t } from '../../common/utils/intl';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../TableComponents';
import { AlignType } from '../TableComponents/types';
import { QuestionIcon } from '../../UiKit/Icons/QuestionIcon';
import { NavLink } from '../../UiKit/NavLink';
import { StkrSdk } from '../../modules/api';
import { useHistoryTableStyles } from './HistoryTableStyles';
import { Headline5 } from '../../UiKit/Typography';

function getTxLink(txID: string) {
  try {
    return StkrSdk.getForEnv().createExplorerLink(txID);
  } catch (error) {
    return '';
  }
}

type CaptionType = {
  label: string;
  tip?: string;
  align?: AlignType;
};

interface IHistoryTableProps
  extends Partial<WithUseStyles<typeof useHistoryTableStyles>> {
  className?: string;
  data: Array<Record<string, any>>;
  unitName: string;
}

export const HistoryTable = (props: IHistoryTableProps) => {
  const { data, unitName } = props;
  const classes = useHistoryTableStyles(props);

  const captions: CaptionType[] = useLocaleMemo(
    () => [
      {
        label: t('history-table.column.date'),
      },
      {
        label: t('history-table.column.status'),
        tip: t('history-table.tip.status'),
      },
      {
        label: t('history-table.column.hash'),
      },
      {
        label: t('history-table.column.type'),
      },
      {
        label: t('history-table.column.amount'),
        align: 'right',
      },
    ],
    [],
  );

  const stakingSum = data.reduce((sum, item) => sum + item.stakingAmount, 0);

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between" mt={6} mb={2}>
        <Headline5>{t(`history-table.staking-history`)}</Headline5>
        <Headline5>
          {t(`history-table.total-staked`)}
          {t(`unit.${unitName}-value`, {
            value: stakingSum,
          })}
        </Headline5>
      </Box>
      <Table
        customCell="1fr 1fr 1fr 1fr 1fr"
        columnsCount={captions.length}
        minWidth={0}
        paddingCollapse
      >
        <TableHead>
          {captions.map(cell => (
            <TableHeadCell
              key={cell.label}
              label={
                <>
                  {cell.label}
                  {cell.tip && (
                    <Tooltip title={cell.tip}>
                      <IconButton className={classes.question}>
                        <QuestionIcon size="xs" />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              }
              classes={{ content: classes.headCellContent }}
              align={cell.align}
            />
          ))}
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={uid(item)}>
              <TableBodyCell label={`${captions[0].label}`}>
                {item.stakingDate}
              </TableBodyCell>
              <TableBodyCell label={`${captions[1].label}`}>
                {t(`history-table.status.${item.action}`)}
              </TableBodyCell>
              <TableBodyCell label={`${captions[2].label}`}>
                <NavLink href={getTxLink(item.transactionHash)}>
                  {item.transactionHash}
                </NavLink>
              </TableBodyCell>
              <TableBodyCell label={`${captions[3].label}`}>
                {item.transactionType}
              </TableBodyCell>
              <TableBodyCell align="right" label={`${captions[4].label}`}>
                {t(`unit.${unitName}-value`, {
                  value: item.stakingAmount,
                })}
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

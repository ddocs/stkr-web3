import { IconButton, Tooltip } from '@material-ui/core';
import * as React from 'react';
import { uid } from 'react-uid';
import { useLocaleMemo } from '../../../../common/hooks/useLocaleMemo';
import { WithUseStyles } from '../../../../common/types';
import { t } from '../../../../common/utils/intl';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components/TableComponents';
import { AlignType } from '../../../../components/TableComponents/types';
import { QuestionIcon } from '../../../../UiKit/Icons/QuestionIcon';
import { NavLink } from '../../../../UiKit/NavLink';
import { StkrSdk } from '../../../api';
import { useHistoryTableStyles } from './HistoryTableStyles';
import { getShortTxHash } from '../../api/utils';

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
}

export const HistoryTable = (props: IHistoryTableProps) => {
  const { data } = props;
  const classes = useHistoryTableStyles(props);

  const captions: CaptionType[] = useLocaleMemo(
    () => [
      {
        label: t('stake-avax.dashboard.column.date'),
        tip: t('stake-avax.dashboard.tip.date'),
      },
      {
        label: t('stake-avax.dashboard.column.status'),
        tip: t('stake-avax.dashboard.tip.status'),
      },
      {
        label: t('stake-avax.dashboard.column.hash'),
        tip: t('stake-avax.dashboard.tip.hash'),
      },
      {
        label: t('stake-avax.dashboard.column.type'),
        tip: t('stake-avax.dashboard.tip.type'),
      },
      {
        label: t('stake-avax.dashboard.column.amount'),
        tip: t('stake-avax.dashboard.tip.amount'),
        align: 'right',
      },
    ],
    [],
  );

  return (
    <div className={classes.root}>
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
                {t(`stake-avax.dashboard.status.${item.action}`)}
              </TableBodyCell>
              <TableBodyCell label={`${captions[2].label}`}>
                <NavLink href={getTxLink(item.transactionHash)}>
                  {getShortTxHash(item.transactionHash)}
                </NavLink>
              </TableBodyCell>
              <TableBodyCell label={`${captions[3].label}`}>
                {item.transactionType}
              </TableBodyCell>
              <TableBodyCell align="right" label={`${captions[4].label}`}>
                {t('unit.avax-value', {
                  value: item.stakingAmount?.toString(),
                })}
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

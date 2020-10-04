import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { AlignType, ITablesCaptionProps, ITablesRowProps } from './types';
import { useTableStyles } from './TableStyles';
import { uid } from 'react-uid';
import { HeaderCell } from './TableCell';
import { BodyRow } from './TableRow';
import { useResizeObserver } from '../../common/hooks/useResizeObserver';
import { ScrollBar, VerticalScrollIndicator } from '../StrollerComponents';
import { StrollableContainer } from 'react-stroller';

interface ITableProps {
  className?: string;
  captions: ITablesCaptionProps[];
  rows: ITablesRowProps[];
  customCell?: string;
  defense?: boolean;
  paddingCollapse?: boolean;
  alignCell?: AlignType;
}

export const Table = ({
  className,
  captions,
  rows,
  defense,
  paddingCollapse,
  alignCell,
  customCell,
}: ITableProps) => {
  const count = captions.length;

  const TableScrollBar = () => <ScrollBar />;

  const [tableWidth, setTableWidth] = useState(0);
  const [tableRef, setTableRef] = useState<HTMLElement | null>(null);

  useResizeObserver(
    tableRef,
    useCallback(ref => {
      setTableWidth(ref.clientWidth);
    }, []),
  );

  const classes = useTableStyles({
    count,
    customCell,
    paddingCollapse,
    defense,
  });

  const [tableHeight, setTableHeight] = useState(0);
  const [tableBodyRef, setTableBodyRef] = useState<HTMLElement | null>(null);

  useResizeObserver(
    tableBodyRef,
    useCallback(ref => {
      setTableHeight(ref.clientHeight);
    }, []),
  );

  return (
    <div className={classNames(classes.container, className)}>
      <div className={classes.table} role="grid" ref={setTableRef}>
        <div className={classes.head} role="rowgroup">
          <div className={classes.row} role="row">
            {captions.map(cell => (
              <HeaderCell
                key={cell.key}
                label={cell.label}
                align={cell.align}
                alignCell={alignCell}
                defense={defense}
                paddingCollapse={paddingCollapse}
              />
            ))}
          </div>
        </div>
        {rows && (
          <div className={classes.bodyWrapper}>
            <StrollableContainer
              bar={TableScrollBar}
              draggable={true}
              inBetween={<VerticalScrollIndicator />}
              scrollKey={`${uid(rows)}${tableHeight}`}
            >
              <div
                className={classes.body}
                role="rowgroup"
                ref={setTableBodyRef}
              >
                {rows.map(row => (
                  <BodyRow
                    className={classes.row}
                    captions={captions}
                    href={row.href}
                    key={uid(row)}
                    data={row.data}
                    customCell={customCell}
                    tableWidth={tableWidth}
                    alignCell={alignCell}
                    defense={defense}
                    paddingCollapse={paddingCollapse}
                  />
                ))}
              </div>
            </StrollableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

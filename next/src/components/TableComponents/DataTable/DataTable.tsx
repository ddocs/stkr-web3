import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { AlignType, ITablesCaptionProps, ITablesRowProps } from '../types';
import { useTableStyles } from './DataTableStyles';
import { uid } from 'react-uid';
import { TableBodyCell } from '../TableBodyCell';
import { TableRow } from '../TableRow';
import { useResizeObserver } from '../../../common/hooks/useResizeObserver';
import { TableHead } from '../TableHead';
import { TableBody } from '../TableBody';
import { TableHeadCell } from "../TableHeadCell/TableHeadCell";

type TableContextType = {
  tableWidth: number;
  setTableWidth: (value: number) => void;
  count: number;
} & Pick<
  IDataTableProps,
  'defense' | 'paddingCollapse' | 'customCell' | 'alignCell'
>;

export const TableContext = React.createContext<TableContextType>({
  tableWidth: 0,
  setTableWidth: () => {},
  count: 0,
} as TableContextType);

interface IDataTableProps {
  className?: string;
  captions: ITablesCaptionProps[];
  rows: ITablesRowProps[];
  customCell?: string;
  defense?: boolean;
  paddingCollapse?: boolean;
  alignCell?: AlignType;
  tableWidth: number;
  setTableWidth: (value: number) => void;
}

export const DataTableComponent = ({
  className,
  captions,
  rows,
  defense,
  paddingCollapse,
  customCell,
  setTableWidth,
}: IDataTableProps) => {
  const count = captions.length;

  const [tableRef, setTableRef] = useState<HTMLElement | null>(null);

  useResizeObserver(
    tableRef,
    useCallback(
      ref => {
        setTableWidth(ref.clientWidth);
      },
      [setTableWidth],
    ),
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
        <TableHead>
          {captions.map(cell => (
            <TableHeadCell key={cell.key} label={cell.label} align={cell.align} />
          ))}
        </TableHead>
        {rows && (
          <TableBody ref={setTableBodyRef}>
            {rows.map(row => (
              <TableRow className={classes.row} key={uid(row)}>
                {captions.map(cell => (
                  <TableBodyCell key={cell.key} align={cell.align}>
                    {row.data[cell.key]}
                  </TableBodyCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </div>
    </div>
  );
};

export const DataTable = (
  props: Omit<IDataTableProps, 'tableWidth' | 'setTableWidth'>,
) => {
  const [tableWidth, setTableWidth] = useState(0);

  return (
    <TableContext.Provider
      value={{
        tableWidth,
        setTableWidth,
        defense: props.defense,
        paddingCollapse: props.paddingCollapse,
        customCell: props.customCell,
        alignCell: props.alignCell,
        count: props.captions.length,
      }}
    >
      <DataTableComponent
        {...props}
        tableWidth={tableWidth}
        setTableWidth={setTableWidth}
      />
    </TableContext.Provider>
  );
};

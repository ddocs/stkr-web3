import classNames from 'classnames';
import React, { ReactNode, useCallback, useState } from 'react';
import { ICustomProps, IStyleProps } from '../types';
import { useTableStyles } from './TableStyles';
import { useResizeObserver } from '../../../common/hooks/useResizeObserver';

type TableContextType = {
  tableWidth: number;
  setTableWidth: (value: number) => void;
  count: number;
} & Pick<
  ITableComponentProps,
  'defense' | 'paddingCollapse' | 'customCell' | 'alignCell'
>;

export const TableContext = React.createContext<TableContextType>({
  tableWidth: 0,
  setTableWidth: () => {},
  count: 0,
} as TableContextType);

interface ITableComponentProps extends ICustomProps, IStyleProps {
  className?: string;
  columnsCount: number;
  tableWidth: number;
  setTableWidth: (value: number) => void;
  children: ReactNode;
}

export const DataTableComponent = ({
  className,
  setTableWidth,
  children,
}: ITableComponentProps) => {
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

  const classes = useTableStyles();

  return (
    <div className={classNames(classes.container, className)}>
      <div className={classes.table} role="grid" ref={setTableRef}>
        {children}
      </div>
    </div>
  );
};

export type ITableProps = Omit<
  ITableComponentProps,
  'tableWidth' | 'setTableWidth'
>;

export const Table = (props: ITableProps) => {
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
        count: props.columnsCount,
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

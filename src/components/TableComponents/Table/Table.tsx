import classNames from 'classnames';
import React, { ReactNode, useCallback, useState } from 'react';
import { ICustomProps, IStyleProps } from '../types';
import { tableStyles } from './TableStyles';
import { useResizeObserver } from '../../../common/hooks/useResizeObserver';
import { createPureContext } from 'react-shallow-context';
import { WithStyles, withStyles } from '@material-ui/core';

type TableContextType = {
  tableWidth: number;
  setTableWidth: (value: number) => void;
  count: number;
} & Pick<
  ITableComponentProps,
  'defense' | 'paddingCollapse' | 'customCell' | 'alignCell'
>;

export const TableContext = createPureContext<TableContextType>({
  tableWidth: 0,
  setTableWidth: () => undefined,
  count: 0,
} as TableContextType);

interface ITableComponentProps
  extends WithStyles<typeof tableStyles>,
    ICustomProps,
    IStyleProps {
  className?: string;
  columnsCount: number;
  tableWidth: number;
  setTableWidth: (value: number) => void;
  children: ReactNode;
}

const TableComponent = ({
  className,
  setTableWidth,
  children,
  classes,
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

export const Table = withStyles(tableStyles)((props: ITableProps) => {
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
      <TableComponent
        {...props}
        tableWidth={tableWidth}
        setTableWidth={setTableWidth}
      />
    </TableContext.Provider>
  );
});

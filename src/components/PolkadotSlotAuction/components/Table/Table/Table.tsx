import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { createPureContext } from 'react-shallow-context';
import { ICustomProps, IStyleProps } from '../types';
import { useTableStyles } from './TableStyles';

type TableContextType = {
  count: number;
} & Pick<
  ITableComponentProps,
  'dense' | 'paddingCollapse' | 'customCell' | 'alignCell' | 'stickyHeader'
>;

export const TableContext = createPureContext<TableContextType>({
  count: 0,
} as TableContextType);

interface ITableComponentProps extends ICustomProps, IStyleProps {
  className?: string;
  columnsCount: number;
  children: ReactNode;
  minWidth?: string | number;
}

const TableComponent = ({
  className,
  children,
  minWidth,
}: ITableComponentProps) => {
  const classes = useTableStyles({ minWidth });

  return (
    <div className={classNames(classes.container, className)}>
      <div className={classes.table} role="grid">
        {children}
      </div>
    </div>
  );
};

export type ITableProps = ITableComponentProps;

export const Table = (props: ITableProps) => {
  return (
    <TableContext.Provider
      value={{
        dense: props.dense,
        paddingCollapse: props.paddingCollapse,
        customCell: props.customCell,
        alignCell: props.alignCell,
        count: props.columnsCount,
        stickyHeader: props.stickyHeader,
      }}
    >
      <TableComponent {...props} />
    </TableContext.Provider>
  );
};

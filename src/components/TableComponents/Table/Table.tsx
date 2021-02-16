import { WithStyles, withStyles } from '@material-ui/core';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { createPureContext } from 'react-shallow-context';
import { ICustomProps, IStyleProps } from '../types';
import { tableStyles } from './TableStyles';

type TableContextType = {
  count: number;
} & Pick<
  ITableComponentProps,
  'defense' | 'paddingCollapse' | 'customCell' | 'alignCell' | 'stickyHeader'
>;

export const TableContext = createPureContext<TableContextType>({
  count: 0,
} as TableContextType);

interface ITableComponentProps
  extends WithStyles<typeof tableStyles>,
    ICustomProps,
    IStyleProps {
  className?: string;
  columnsCount: number;
  children: ReactNode;
}

const TableComponent = ({
  className,
  children,
  classes,
}: ITableComponentProps) => {
  return (
    <div className={classNames(classes.container, className)}>
      <div className={classes.table} role="grid">
        {children}
      </div>
    </div>
  );
};

export type ITableProps = ITableComponentProps;

export const Table = withStyles(tableStyles)((props: ITableProps) => {
  return (
    <TableContext.Provider
      value={{
        defense: props.defense,
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
});

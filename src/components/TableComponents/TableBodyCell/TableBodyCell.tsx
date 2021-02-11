import classNames from 'classnames';
import React, { CSSProperties, useContext } from 'react';
import { WithUseStyles } from '../../../common/types';
import { TableContext } from '../Table/Table';
import { AlignType, IStyleProps } from '../types';
import { useTableBodyCellStyles } from './TableBodyCellStyles';

interface ITableBodyCellProps
  extends Partial<WithUseStyles<typeof useTableBodyCellStyles>> {
  className?: string;
  align?: AlignType;
  children: React.ReactNode;
  tableWidth: number;
  style?: CSSProperties;
}

export const TableBodyCellComponent = ({
  className,
  alignCell,
  align,
  defense,
  paddingCollapse,
  children,
  tableWidth,
  style,
  ...rest
}: ITableBodyCellProps & IStyleProps) => {
  const classes = useTableBodyCellStyles({
    defense,
    paddingCollapse,
    tableWidth,
    ...rest,
  });
  return (
    <div
      className={classNames(
        className,
        classes.tableCell,
        classes.cell,
        classes.bodyCell,
        (alignCell === 'center' || align === 'center') && classes.centerCell,
        (alignCell === 'right' || align === 'right') && classes.rightCell,
        (alignCell === 'left' || align === 'left') && classes.leftCell,
      )}
      role="cell"
      style={style}
    >
      <div className={classes.cellWrapper}>{children}</div>
    </div>
  );
};

export const TableBodyCell = (
  props: Omit<ITableBodyCellProps, 'tableWidth'>,
) => {
  const context = useContext(TableContext);
  return <TableBodyCellComponent {...context} {...props} />;
};

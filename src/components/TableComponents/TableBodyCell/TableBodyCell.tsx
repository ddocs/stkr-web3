import { AlignType, IStyleProps } from '../types';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { BackgroundColorProvider } from '../../../UiKit/BackgroundColorProvider';
import { useTableBodyCellStyles } from './TableBodyCellStyles';
import { TableContext } from '../Table/Table';
import { WithUseStyles } from '../../../common/types';

interface ITableBodyCellProps
  extends Partial<WithUseStyles<typeof useTableBodyCellStyles>> {
  className?: string;
  align?: AlignType;
  children: React.ReactNode;
  tableWidth: number;
}

export const TableBodyCellComponent = ({
  className,
  alignCell,
  align,
  defense,
  paddingCollapse,
  children,
  tableWidth,
  ...rest
}: ITableBodyCellProps & IStyleProps) => {
  const classes = useTableBodyCellStyles({
    defense,
    paddingCollapse,
    tableWidth,
    ...rest,
  });
  return (
    <BackgroundColorProvider
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
      component="div"
    >
      <div className={classes.cellWrapper}>{children}</div>
    </BackgroundColorProvider>
  );
};

export const TableBodyCell = (
  props: Omit<ITableBodyCellProps, 'tableWidth'>,
) => {
  const context = useContext(TableContext);
  return <TableBodyCellComponent {...context} {...props} />;
};

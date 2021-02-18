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
  style?: CSSProperties;
  label: string;
}

export const TableBodyCellComponent = ({
  className,
  alignCell,
  align,
  defense,
  paddingCollapse,
  children,
  style,
  label,
  ...rest
}: ITableBodyCellProps & IStyleProps) => {
  const classes = useTableBodyCellStyles({
    defense,
    paddingCollapse,
    ...rest,
  });
  return (
    <li
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
      data-label={label}
    >
      <div className={classes.cellWrapper}>{children}</div>
    </li>
  );
};

export const TableBodyCell = (props: ITableBodyCellProps) => {
  const context = useContext(TableContext);
  return <TableBodyCellComponent {...context} {...props} />;
};

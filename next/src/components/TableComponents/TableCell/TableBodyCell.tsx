import { AlignType, IStyleProps } from '../types';
import React from 'react';
import classNames from 'classnames';
import { BackgroundColorProvider } from '../../../UiKit/BackgroundColorProvider';
import { useTableBodyCellStyles } from './TableBodyCellStyles';
import { TableContext } from '../DataTable';

interface IBodyCellProps {
  className?: string;
  align?: AlignType;
  children: React.ReactNode;
  tableWidth: number;
}

export const BodyCellComponent = ({
  className,
  alignCell,
  align,
  defense,
  paddingCollapse,
  children,
  tableWidth,
  ...rest
}: IBodyCellProps & IStyleProps) => {
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

export const BodyCell = (props: Omit<IBodyCellProps, 'tableWidth'>) => {
  return (
    <TableContext.Consumer>
      {context => {
        return <BodyCellComponent {...context} {...props} />;
      }}
    </TableContext.Consumer>
  );
};

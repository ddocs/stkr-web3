import React from 'react';
import { AlignType, IStyleProps } from '../types';
import classNames from 'classnames';
import { useCellStyles } from './TableHeadCellStyles';
import { BackgroundColorProvider } from '../../../UiKit/BackgroundColorProvider';
import { TableContext } from "../Table/Table";

interface ITableHeadCellProps {
  label: React.ReactNode;
  align?: AlignType;
}

const TableHeadCellComponent = ({
  alignCell,
  align,
  label,
  defense,
  paddingCollapse,
}: ITableHeadCellProps & IStyleProps) => {
  const classes = useCellStyles({ defense, paddingCollapse });

  return (
    <BackgroundColorProvider
      className={classNames(
        classes.cell,
        classes.headCell,
        (alignCell === 'center' || align === 'center') && classes.centerCell,
        (alignCell === 'right' || align === 'right') && classes.rightCell,
        (alignCell === 'left' || align === 'left') && classes.leftCell,
      )}
      role="cell"
      component="div"
    >
      <div className={classes.cellWrapper}>{label}</div>
    </BackgroundColorProvider>
  );
};

export const TableHeadCell = (props: ITableHeadCellProps) => {
  return (
    <TableContext.Consumer>
      {context => {
        return <TableHeadCellComponent {...context} {...props} />;
      }}
    </TableContext.Consumer>
  );
};

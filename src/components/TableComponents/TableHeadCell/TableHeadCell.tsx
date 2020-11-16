import React, { useContext } from 'react';
import { AlignType, IStyleProps } from '../types';
import classNames from 'classnames';
import { useCellStyles } from './TableHeadCellStyles';
import { BackgroundColorProvider } from '../../../UiKit/BackgroundColorProvider';
import { TableContext } from '../Table/Table';

interface ITableHeadCellProps {
  className?: string;
  label: React.ReactNode;
  align?: AlignType;
}

const TableHeadCellComponent = ({
  className,
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
        className,
      )}
      role="cell"
      component="div"
    >
      <div className={classes.cellWrapper}>{label}</div>
    </BackgroundColorProvider>
  );
};

export const TableHeadCell = (props: ITableHeadCellProps) => {
  const context = useContext(TableContext);
  return <TableHeadCellComponent {...context} {...props} />;
};

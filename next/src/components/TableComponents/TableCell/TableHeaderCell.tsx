import React from 'react';
import { AlignType, IStyleProps } from '../types';
import classNames from 'classnames';
import { useCellStyles } from './TableHeaderCellStyles';
import { BackgroundColorProvider } from '../../../UiKit/BackgroundColorProvider';
import { TableContext } from '../DataTable';

interface IHeaderCellProps {
  label: React.ReactNode;
  align?: AlignType;
}

const HeaderCellComponent = ({
  alignCell,
  align,
  label,
  defense,
  paddingCollapse,
}: IHeaderCellProps & IStyleProps) => {
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

export const HeaderCell = (props: IHeaderCellProps) => {
  return (
    <TableContext.Consumer>
      {context => {
        return <HeaderCellComponent {...context} {...props} />;
      }}
    </TableContext.Consumer>
  );
};

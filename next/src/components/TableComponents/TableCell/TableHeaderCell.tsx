import React from 'react';
import { AlignType, IStyleProps } from '../types';
import classNames from 'classnames';
import { useCellStyles } from './TableCellStyles';
import { BackgroundColorProvider } from '../../../UiKit/BackgroundColorProvider';

interface IHeaderCellProps {
  label: React.ReactNode;
  align?: AlignType;
}

export const HeaderCell = ({
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
      // scope="col"
    >
      <div className={classes.cellWrapper}>{label}</div>
    </BackgroundColorProvider>
  );
};

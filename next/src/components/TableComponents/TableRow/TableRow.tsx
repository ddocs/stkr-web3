import {
  ICustomProps,
  IDataProps,
  IStyleProps,
  ITablesCaptionProps,
} from '../types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { BodyCell } from '../TableCell';
import { useRowStyles } from './TableRowStyles';

interface IBodyRowProps {
  className?: string;
  captions: ITablesCaptionProps[];
  tableWidth: number;
  href?: string;
  data: IDataProps;
}

export const BodyRow = ({
  className,
  captions,
  href,
  data,
  customCell,
  tableWidth,
  paddingCollapse,
  ...props
}: IBodyRowProps & ICustomProps & IStyleProps) => {
  const count = captions.length;

  const classes = useRowStyles({
    count,
    customCell,
    tableWidth,
    paddingCollapse,
  });

  const content = (data: IDataProps) =>
    captions.map(cell => (
      <BodyCell
        className={classes.cell}
        key={cell.key}
        align={cell.align}
        paddingCollapse={paddingCollapse}
        {...props}
      >
        {data[cell.key]}
      </BodyCell>
    ));
  const Component = href ? <NavLink to={href} /> : <div />;
  return (
    <>
      {React.cloneElement(
        Component,
        {
          className: classNames(
            className,
            classes.row,
            href && classes.rowHovered,
          ),
          role: 'row',
        },
        content(data),
      )}
    </>
  );
};

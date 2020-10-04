import React from 'react';
export type AlignType = 'center' | 'right' | 'left';

export interface IStyleProps {
  alignCell?: AlignType;
  defense?: boolean;
  paddingCollapse?: boolean;
}

export interface ICustomProps {
  customCell?: string;
}

export interface ITablesCaptionProps {
  key: string;
  label: React.ReactNode;
  align?: AlignType;
}

export type IDataProps = Record<string, any>;

export interface ITableRowProps {
  href?: string;
  data: IDataProps;
}

export interface ITablesRowProps extends ITableRowProps {}

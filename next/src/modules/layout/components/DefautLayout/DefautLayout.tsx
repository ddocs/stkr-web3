import React from 'react';
import { defaultLayoutStyles } from './DefaultLayoutStyles';
import { createWithLayout } from '../../utils/createWithLayout';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

export interface IDefaultLayoutConfigurationProps {}

export interface IDefaultLayoutProps
  extends WithStyles<typeof defaultLayoutStyles>,
    IDefaultLayoutConfigurationProps {
  children: React.ReactNode;
}

function DefaultLayoutComponent({ children, classes }: IDefaultLayoutProps) {
  return <div className={classes.root}>{children}</div>;
}

const DefaultLayout = withStyles(defaultLayoutStyles)(DefaultLayoutComponent);

export const withDefaultLayout = createWithLayout<IDefaultLayoutConfigurationProps>()(
  DefaultLayout,
);

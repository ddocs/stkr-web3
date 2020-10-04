import React from 'react';
import classNames from 'classnames';
import { useDefaultLayoutStyles } from './DefaultLayoutStyles';
import { Header } from '../Header';

export interface ILayoutProps {
  className?: string;
  isAuth?: boolean;
  children?: React.ReactNode;
}

export const DefaultLayoutComponent = ({
  className,
  isAuth,
  children,
}: ILayoutProps) => {
  const classes = useDefaultLayoutStyles();
  return (
    <div className={classNames(classes.component, className)}>
      <Header isAuth={isAuth} />
      <main>{children}</main>
    </div>
  );
};

export const DefaultLayout = (props: ILayoutProps) => (
  <DefaultLayoutComponent {...props} />
);

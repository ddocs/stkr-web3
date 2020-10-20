import React, { MutableRefObject } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';

type LinksVariant = 'contained' | 'outlined' | 'text';

export interface INavLinkProps {
  component?: string | React.ComponentType;
  href: string;
  variant?: LinksVariant;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  activeClassName?: string;
}

export const NavLink = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps & INavLinkProps
>(
  (
    { href, variant = 'text', onClick, activeClassName, className, ...props },
    ref,
  ) => {
    const isLink =
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel');

    const match = useRouteMatch({ path: href, exact: true });

    if (isLink) {
      return (
        <Button
          component="a"
          href={href}
          variant={variant}
          onClick={onClick}
          role="link"
          rel="noopener noreferrer"
          target="_blank"
          ref={ref as MutableRefObject<HTMLAnchorElement>}
          className={className}
          {...(props as any)}
        />
      );
    }

    return (
      <Button
        component={RouterLink as any}
        to={href}
        variant={variant}
        onClick={onClick}
        ref={ref}
        className={classNames(className, match && activeClassName)}
        {...props}
      />
    );
  },
);

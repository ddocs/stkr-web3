import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

type LinksVariant = 'contained' | 'outlined' | 'text';

export interface INavLinkProps {
  component?: string | React.ComponentType;
  href: string;
  variant?: LinksVariant;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  style?: React.CSSProperties;
  activeClassName?: string;
}

export const NavLink = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & INavLinkProps
>(
  (
    { href, variant = 'text', style, onClick, activeClassName, ...props },
    ref,
  ) => {
    const isLink =
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel');

    return (
      <Button
        component={isLink ? 'a' : RouterLink}
        // @ts-ignore
        activeClassName={activeClassName}
        // @ts-ignore
        to={href}
        href={href}
        variant={variant}
        onClick={onClick}
        role="link"
        rel={isLink ? 'noopener noreferrer' : undefined}
        target={isLink ? '_blank' : false}
        ref={ref}
        style={style}
        {...props}
      />
    );
  },
);

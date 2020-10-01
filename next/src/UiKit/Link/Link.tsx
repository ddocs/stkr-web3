import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { Link } from 'react-router-dom';

type LinksVariant = 'contained' | 'outlined' | 'text';

export interface INavLinkProps {
  component?: string | React.ComponentType;
  href: string;
  variant?: LinksVariant;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  style?: React.CSSProperties;
}

export const NavLink = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & INavLinkProps
>(({ href, variant = 'text', style, onClick, ...props }, ref) => (
  <Button
    component={
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel')
        ? 'a'
        : Link
    }
    variant={variant}
    href={href}
    onClick={onClick}
    role="link"
    target="_blank"
    rel="noopener noreferrer"
    ref={ref}
    {...props}
  />
));

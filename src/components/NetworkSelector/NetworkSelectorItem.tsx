import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useNetworkSelectorStyles } from './useNetworkSelectorStyles';

interface INetworkSelectorItemProps {
  icon: JSX.Element;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const NetworkSelectorItem = ({
  icon,
  title,
  onClick,
  disabled,
}: INetworkSelectorItemProps) => {
  const classes = useNetworkSelectorStyles();

  return (
    <button
      className={classNames(classes.item, !disabled && classes.itemClickable)}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {icon}
      <Typography variant="body2" className={classes.itemTitle}>
        {title}
      </Typography>
    </button>
  );
};

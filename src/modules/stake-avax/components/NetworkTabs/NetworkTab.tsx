import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { useNetworkTabsStyles } from './useNetworkTabsStyles';

interface INetworkTabProps {
  disabled?: boolean;
  selected?: boolean;
  title: string;
  icon: JSX.Element;
  onClick?: () => void;
}

export const NetworkTab = ({
  disabled,
  selected,
  title,
  icon,
  onClick,
}: INetworkTabProps) => {
  const classes = useNetworkTabsStyles();

  return (
    <Paper
      variant="outlined"
      square={false}
      onClick={onClick}
      className={classNames(
        classes.item,
        disabled && classes.itemDisabled,
        selected && classes.itemSelected,
      )}
    >
      {icon}
      {title}
    </Paper>
  );
};

import React, { ReactNode, useCallback } from 'react';
import { useNetworkSelectorStyles } from './useNetworkSelectorStyles';

interface INetworkSelectorListProps {
  children: ReactNode;
}

export const NetworkSelectorList = ({
  children,
}: INetworkSelectorListProps) => {
  const classes = useNetworkSelectorStyles();

  const modifyChildren = useCallback(
    (child: any) => <div className={classes.listItem}>{child}</div>,
    [classes],
  );

  return (
    <div className={classes.list}>
      {React.Children.map(children, child => modifyChildren(child))}
    </div>
  );
};

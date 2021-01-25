import React from 'react';
import classNames from 'classnames';
import { useItWorksNavStyles } from './ItWorksNavStyles';
import { ItWorksNavItem, IItWorksNavItemProps } from './ItWorksNavItem';

export interface IItWorksNavProps {
  items: {
    title: string;
    text: string;
    key: string;
  }[];
  onItemClick: IItWorksNavItemProps['onClick'];
  className?: string;
  activeKey?: string;
}

export const ItWorksNav = ({
  className,
  items,
  activeKey,
  onItemClick,
}: IItWorksNavProps) => {
  const classes = useItWorksNavStyles({});

  const renderItems = items.map(({ title, key, text }) => (
    <ItWorksNavItem
      key={key}
      keyName={key}
      title={title}
      text={text}
      isActive={key === activeKey}
      onClick={onItemClick}
    />
  ));

  return (
    <div className={classNames(classes.root, className)}>
      <ul className={classes.list}>{renderItems}</ul>
    </div>
  );
};

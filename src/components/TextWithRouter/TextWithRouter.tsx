import React, { ReactNode } from 'react';
import { useHistory } from 'react-router';

export const TextWithRouter = ({ children }: { children: ReactNode }) => {
  const history = useHistory();
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const href = target.getAttribute('href');
    if (href) {
      history.push(href);
    }
  };
  if (React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick });
  }
  return <>{children}</>;
};

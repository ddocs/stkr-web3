import React from 'react';

export const ToggleIcon = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <path fill="currentColor" d="M0 10h32v2H0zM0 20h32v2H0z" />
    </svg>
  );
};

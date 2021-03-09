import React from 'react';
import { withSvgIcon } from './withSvgIcon';

export const CopiedIcon = withSvgIcon(
  <>
    <g fill="none">
      <circle cx="9" cy="9" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 10L7.5 12.5L13.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </g>
  </>,
  { viewBox: '0 0 24 24' },
);

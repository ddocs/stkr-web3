import React from 'react';
import { withSvgIcon } from './withSvgIcon';

export const CopyIcon = withSvgIcon(
  <>
    <g fill="none">
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 16V16C5.89543 16 5 15.1046 5 14V7C5 5.89543 5.89543 5 7 5H14C15.1046 5 16 5.89543 16 7V7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </g>
  </>,
  { viewBox: '0 0 24 24' },
);

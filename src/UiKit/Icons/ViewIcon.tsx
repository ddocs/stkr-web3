import * as React from 'react';
import { withSvgIcon } from './withSvgIcon';

export const ViewIcon = withSvgIcon(
  <>
    <g fill="none">
      <path
        d="M17 12.5L17 18C17 18.5523 16.5523 19 16 19L6 19C5.44772 19 5 18.5523 5 18L5 8C5 7.44772 5.44771 7 6 7L11.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9 14.5L18 6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.7656 6H18.0009V10" stroke="currentColor" strokeWidth="1.5" />
    </g>
  </>,
  { viewBox: '0 0 24 24' },
);

import React from 'react';
import { withSvgIcon } from './withSvgIcon';

export const CancelIcon = withSvgIcon(
  <>
    <circle cx="26" cy="26" r="25.5" stroke="#3F3F3F" fill="transparent" />
    <line x1="36.667" y1="15.6695" x2="14.9154" y2="37.4211" stroke="#878787" />
    <line
      x1="14.9161"
      y1="15.5835"
      x2="36.6677"
      y2="37.3351"
      stroke="#878787"
    />
  </>,
  { viewBox: '0 0 52 52' },
);

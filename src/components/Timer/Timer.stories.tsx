import React from 'react';
import { Timer } from './Timer';
import { DAY, HOUR, MINUTE, SECOND } from '../../common/utils/timer';

export const TimerExampleDays = () => (
  <>
    <Timer
      endTime={
        new Date(Date.now() + 2 * DAY + 3 * HOUR + 24 * MINUTE + 15 * SECOND)
      }
    />
    <Timer endTime={new Date(Date.now() + DAY + 4 * HOUR + 3 * SECOND)} />
    <Timer endTime={new Date(Date.now() + 4 * HOUR + 2 * MINUTE)} />
    <Timer endTime={new Date(Date.now() + 4 * HOUR + 2 * MINUTE)} />
    <Timer endTime={new Date(Date.now() + 3 * SECOND)} />
  </>
);

export default {
  title: 'components/Timer',
};

import { useState } from 'react';
import {
  getTimeRemaining,
  getTimerText,
  SECOND,
} from '../../../common/utils/timer';
import { useInterval } from '../../../common/utils/useInterval';

export const useTimer = (endDate: Date) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(endDate));

  useInterval(() => {
    setTimeRemaining(getTimeRemaining(endDate));
  }, SECOND);

  return {
    timeRemaining,
    duration: getTimerText(timeRemaining),
    isTimeOver: timeRemaining.total <= 0,
  };
};

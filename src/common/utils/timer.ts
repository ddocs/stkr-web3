import { t } from './intl';

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

interface ITimer {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const beautifyNumber = (n: number) => (n < 10 ? `0${n}` : n);

export const getTimerText = (time: ITimer) => {
  if (time.total <= 0) {
    return '';
  }

  const days =
    time.days !== 0 ? `${t('time.days-short', { days: time.days })} ` : '';

  const hours =
    time.days > 0 || time.hours > 0
      ? `${t('time.hours-short', { hours: beautifyNumber(time.hours) })} `
      : '';

  const minutes =
    time.days > 0 || time.hours > 0 || time.minutes > 0
      ? `${t('time.minutes-short', { minutes: beautifyNumber(time.minutes) })} `
      : '';

  // if all is 0 then time.total === 0
  const seconds = t('time.seconds-short', {
    seconds: beautifyNumber(time.seconds),
  });

  return t('time.time-left-short', {
    time: `${days}${hours}${minutes}${seconds}`,
  });
};

export function getTimeRemaining(
  endTime: Date,
  startTime: Date = new Date(),
): ITimer {
  const total =
    Date.parse(endTime.toString()) - Date.parse(startTime.toString());
  const seconds = Math.floor((total / SECOND) % 60);
  const minutes = Math.floor((total / MINUTE) % 60);
  const hours = Math.floor((total / HOUR) % 24);
  const days = Math.floor(total / DAY);

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

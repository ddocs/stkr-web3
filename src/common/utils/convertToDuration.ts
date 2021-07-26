import { intervalToDuration, formatDuration } from 'date-fns';
import { t } from './intl';

type Token = 'xDays' | 'xHours' | 'xMinutes' | 'xSeconds';

const formatDistanceLocale = {
  xDays: '{count}d',
  xHours: '{count}h',
  xMinutes: '{count}m',
  xSeconds: '{count}s',
};

const locale = {
  formatDistance: (token: Token, count: string) =>
    formatDistanceLocale[token].replace('{count}', count),
};

export const convertToDuration = (start: Date, end: Date) => {
  if (start > end) {
    return t('project.time-is-up');
  }

  return formatDuration(intervalToDuration({ start, end }), {
    format: ['days', 'hours', 'minutes', 'seconds'],
    locale,
  });
};

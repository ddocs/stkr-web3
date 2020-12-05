import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TimelineStatus } from './TimelineStatusDot';

export const useTimelineStatusDotStyles = makeStyles<
  Theme,
  { status: TimelineStatus }
>(theme => ({
  root: ({ status }) => ({
    width: 24,
    height: 24,
    backgroundImage: `url(${require(`./assets/${status}.svg`)})`,
    backgroundColor: 'transparent',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    border: 0,
  }),
}));

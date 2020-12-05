import BigNumber from 'bignumber.js';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
} from '@material-ui/lab';
import { useTopUpStyles } from './TopUpStyles';
import classNames from 'classnames';
import { t } from '../../../../common/utils/intl';
import React from 'react';
import { TopUpAnkrStep } from './TopUpAnkrForm';
import {
  TimelineStatus,
  TimelineStatusDot,
} from './TimelineStatusDot/TimelineStatusDot';
import { useIsSMDown } from '../../../../common/hooks/useTheme';

function getTimelineDotStatus(
  itemStep: TopUpAnkrStep,
  currentStep: TopUpAnkrStep,
): TimelineStatus {
  if (itemStep === currentStep) {
    return 'current';
  }

  if (itemStep > currentStep) {
    return 'coming';
  }

  return 'done';
}

interface ITopUpAnkrTimelineProps {
  totalAllowance: BigNumber;
  current: TopUpAnkrStep;
}

export function TopUpAnkrTimeline({
  totalAllowance,
  current,
}: ITopUpAnkrTimelineProps) {
  const classes = useTopUpStyles();
  const isSmDown = useIsSMDown();
  return (
    <Timeline align={isSmDown ? 'alternate' : 'left'}>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineStatusDot
            status={getTimelineDotStatus(TopUpAnkrStep.DEPOSIT, current)}
          />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          className={classNames(
            current !== TopUpAnkrStep.DEPOSIT &&
              classes.timelineNotCurrentContent,
          )}
        >
          {t('top-up.step.1')}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineStatusDot
            status={getTimelineDotStatus(TopUpAnkrStep.ALLOWANCE, current)}
          />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          className={classNames(
            current !== TopUpAnkrStep.ALLOWANCE &&
              classes.timelineNotCurrentContent,
          )}
        >
          {t('top-up.step.2', {
            value: totalAllowance.toFormat(),
          })}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineStatusDot
            status={getTimelineDotStatus(TopUpAnkrStep.TOP_UP, current)}
          />
        </TimelineSeparator>
        <TimelineContent
          className={classNames(
            current !== TopUpAnkrStep.TOP_UP &&
              classes.timelineNotCurrentContent,
          )}
        >
          {t('top-up.step.1', {
            value: totalAllowance.toFormat(),
          })}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

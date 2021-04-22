import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
} from '@material-ui/lab';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import React from 'react';
import { useIsSMDown } from '../../../../common/hooks/useTheme';
import { t } from '../../../../common/utils/intl';
import { DepositAnkrStep } from './DepositAnkrForm';
import { useDepositStyles } from './DepositStyles';
import {
  TimelineStatus,
  TimelineStatusDot,
} from './TimelineStatusDot/TimelineStatusDot';

function getTimelineDotStatus(
  itemStep: DepositAnkrStep,
  currentStep: DepositAnkrStep,
): TimelineStatus {
  if (itemStep === currentStep) {
    return 'current';
  }

  if (itemStep > currentStep) {
    return 'coming';
  }

  return 'done';
}

interface IDepositAnkrTimelineProps {
  totalAllowance: BigNumber;
  current: DepositAnkrStep;
}

export function DepositAnkrTimeline({
  totalAllowance,
  current,
}: IDepositAnkrTimelineProps) {
  const classes = useDepositStyles();
  const isSmDown = useIsSMDown();
  return (
    <Timeline align={isSmDown ? 'alternate' : 'left'}>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineStatusDot
            status={getTimelineDotStatus(
              DepositAnkrStep.TRANSFER_TOKENS,
              current,
            )}
          />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          className={classNames(
            current !== DepositAnkrStep.TRANSFER_TOKENS &&
              classes.timelineNotCurrentContent,
          )}
        >
          {t('top-up.step.1')}
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineStatusDot
            status={getTimelineDotStatus(DepositAnkrStep.ALLOWANCE, current)}
          />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          className={classNames(
            current !== DepositAnkrStep.ALLOWANCE &&
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
            status={getTimelineDotStatus(DepositAnkrStep.DEPOSIT, current)}
          />
        </TimelineSeparator>
        <TimelineContent
          className={classNames(
            current !== DepositAnkrStep.DEPOSIT &&
              current !== DepositAnkrStep.TOP_UP &&
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

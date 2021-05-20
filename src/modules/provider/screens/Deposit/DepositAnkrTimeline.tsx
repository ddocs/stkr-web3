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
              DepositAnkrStep.WALLET_DEPOSIT,
              current,
            )}
          />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          className={classNames(
            current !== DepositAnkrStep.WALLET_DEPOSIT &&
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
            status={getTimelineDotStatus(
              DepositAnkrStep.CONTRACT_DEPOSIT,
              current,
            )}
          />
        </TimelineSeparator>
        <TimelineContent
          className={classNames(
            current !== DepositAnkrStep.CONTRACT_DEPOSIT &&
              classes.timelineNotCurrentContent,
          )}
        >
          {t('top-up.step.3', {
            value: totalAllowance.toFormat(),
          })}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

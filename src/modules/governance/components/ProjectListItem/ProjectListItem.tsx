import { ProposalStatus } from '@ankr.com/stkr-jssdk';
import {
  Box,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getGovernanceProjectPath } from '../../../../common/const';
import { getProgress } from '../../../../common/utils/getProgress';
import { t } from '../../../../common/utils/intl';
import { ModerationStatusLed } from '../ModerationStatusLed';
import { Timer } from '../Timer';
import { useProjectListItemStyles } from './ProjectListItemStyles';

interface IProjectListItemProps {
  moderationStatus: ProposalStatus;
  topic: string;
  content: string;
  id: string;
  yes: number;
  no: number;
  endTime: Date;
}

export const ProjectListItem = ({
  moderationStatus,
  topic,
  content,
  id,
  yes,
  no,
  endTime,
}: IProjectListItemProps) => {
  const classes = useProjectListItemStyles({});

  return (
    <Paper
      component={RouterLink}
      variant="outlined"
      square={false}
      className={classes.root}
      {...({ to: getGovernanceProjectPath(id) } as any)}
    >
      <Box display="flex" justifyContent="space-between" mb={5}>
        <ModerationStatusLed status={moderationStatus} />
        <Timer className={classes.timer} endTime={endTime} />
      </Box>
      <Typography className={classes.name}>{topic}</Typography>
      <Typography className={classes.description}>{content}</Typography>
      <Divider className={classes.divider} />
      <Box display="flex" alignItems="center">
        <Box>
          <Typography className={classes.label}>
            {t('project-list-item.support')}
          </Typography>
          <Typography className={classes.votes}>
            {t('project-list-item.votes', { value: yes })}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={getProgress(yes, no)}
          color="secondary"
          className={classes.progressBar}
        />
        <Box>
          <Typography className={classes.label}>
            {t('project-list-item.against')}
          </Typography>
          <Typography className={classes.votes}>
            {t('project-list-item.votes', { value: no })}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

import React from 'react';
import { useProjectListItemStyles } from './ProjectListItemStyles';
import {
  Box,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { ModerationStatusLed } from '../ModerationStatusLed';
import { Timer } from '../Timer';
import { t } from '../../../../common/utils/intl';
import { Link as RouterLink } from 'react-router-dom';
import { getGovernanceProjectPath } from '../../../../common/const';
import { ProposalStatus } from '@ankr.com/stkr-jssdk';

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

  const progress = yes > 0 ? ((yes + no) / yes) * 100 : 0;

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
        <Timer startTime={new Date()} endTime={endTime} />
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
          value={progress}
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

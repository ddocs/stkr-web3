import React from 'react';
import { useProjectListItemStyles } from './ProjectListItemStyles';
import {
  Box,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { ModerationStatus, ModerationStatusLed } from '../ModerationStatusLed';
import { Timer } from '../Timer';
import { t } from '../../../../common/utils/intl';
import { Link as RouterLink } from 'react-router-dom';
import { getGovernanceProjectPath } from '../../../../common/const';

interface IProjectListItemProps {
  moderationStatus: ModerationStatus;
  topic: string;
  content: string;
  id: string;
}

export const ProjectListItem = ({
  moderationStatus,
  topic,
  content,
  id,
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
        <Timer />
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
            {t('project-list-item.votes', { value: 0 })}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={77}
          color="secondary"
          className={classes.progressBar}
        />
        <Box>
          <Typography className={classes.label}>
            {t('project-list-item.against')}
          </Typography>
          <Typography className={classes.votes}>
            {t('project-list-item.votes', { value: 0 })}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

import React from 'react';
import { useProjectListItemStyles } from './ProjectListItemStyles';
import {
  Box,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { ModerationStatus } from '../ModerationStatus';
import { Timer } from '../Timer';
import { t } from '../../../../common/utils/intl';

interface IProjectListItemProps {
  moderationStatus: ModerationStatus;
  name?: string;
  description?: string;
}

export const ProjectListItem = ({
  moderationStatus,
  name = 'Project Name',
  description = 'Reliable tamper-proof inputs & outputs for complex smart contracts on any blockchain.',
}: IProjectListItemProps) => {
  const classes = useProjectListItemStyles({});

  return (
    <Paper variant="outlined" square={false} className={classes.root}>
      <Box display="flex" justifyContent="space-between" mb={5}>
        <ModerationStatus status={moderationStatus} />
        <Timer />
      </Box>
      <Typography className={classes.name}>{name}</Typography>
      <Typography className={classes.description}>{description}</Typography>
      <Divider className={classes.divider} />
      <Box display="flex" alignItems="center">
        <Box>
          <Typography className={classes.label}>{t('project-list-item.support')}</Typography>
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
          <Typography className={classes.label}>{t('project-list-item.against')}</Typography>
          <Typography className={classes.votes}>
            {t('project-list-item.votes', { value: 0 })}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

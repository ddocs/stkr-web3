import * as React from 'react';
import { Curtains } from '../../UiKit/Curtains';
import { Headline1 } from '../../UiKit/Typography';
import { t } from '../../common/utils/intl';
import { Box, Button, IconButton, Paper, Typography } from '@material-ui/core';
import { ReactComponent as PlusIcon } from './assets/plus.svg';
import { ProjectListItem } from './components/ProjectListItem';
import { useModerationStatusStyles } from './ProjectListStyles';
import classNames from 'classnames';
import { RulesDialog } from './components/RulesDialog';
import { useDialog } from '../../store/dialogs/selectors';
import { DIALOG_GOVERNANCE_RULES_OF_PROPOSAL } from '../../store/dialogs/actions';
import { useDispatch } from 'react-redux';
import { useInitEffect } from '../../common/hooks/useInitEffect';
import {
  GovernanceActions,
  GovernanceActionTypes,
} from '../../store/actions/GovernanceActions';
import { Query } from '@redux-requests/react';

export const ProjectList = () => {
  const classes = useModerationStatusStyles();
  const dispatch = useDispatch();

  useInitEffect(() => {
    dispatch(GovernanceActions.proposal());
  });

  const { isOpened, handleOpen, handleClose } = useDialog(
    DIALOG_GOVERNANCE_RULES_OF_PROPOSAL,
  );

  return (
    <>
      <Query type={GovernanceActionTypes.PROPOSAL}>
        {({ data }) => {
          console.log('data', data);
          return null;
        }}
      </Query>
      <RulesDialog isOpened={isOpened} handleClose={handleClose} />
      <section className={classes.root}>
        <Curtains>
          <Box mb={4}>
            <Headline1 align="center" component="h2">
              {t('project-list.title')}
            </Headline1>
          </Box>
          <Paper variant="outlined" square={false} className={classes.stats}>
            <Typography
              variant="body1"
              className={classNames(classes.power, classes.statsText)}
            >
              {t('project-list.power')}
            </Typography>
            <Typography variant="body1" className={classes.statsText}>
              {t('units.ankr-value', { value: 0 })}
            </Typography>
            <IconButton className={classes.plusIcon}>
              <PlusIcon />
            </IconButton>
            <Box width="100%" maxWidth={200} ml="auto">
              <Button
                color="primary"
                size="large"
                fullWidth={true}
                onClick={handleOpen}
              >
                {t('project-list.create')}
              </Button>
            </Box>
          </Paper>
          <div className={classes.content}>
            <ProjectListItem moderationStatus="moderation" />
            <ProjectListItem moderationStatus="live" />
            <ProjectListItem moderationStatus="moderation" />
            <ProjectListItem moderationStatus="live" />
            <ProjectListItem moderationStatus="moderation" />
          </div>
        </Curtains>
      </section>
    </>
  );
};

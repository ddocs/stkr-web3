import * as React from 'react';
import { useRef, useEffect, useCallback } from 'react';
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
import { Mutation, Query, useQuery } from '@redux-requests/react';
import { UserActions, UserActionTypes } from '../../store/actions/UserActions';
import { IUserInfo } from '../../store/apiMappers/userApi';
import { QueryError } from '../../components/QueryError/QueryError';
import {
  QueryLoading,
  QueryLoadingAbsolute,
} from '../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../components/QueryEmpty/QueryEmpty';
import {
  ANKR_DEPOSIT_LINK,
  DEFAULT_FIXED,
  isMainnet,
  MIN_GOVERNANCE_BALANCE,
} from '../../common/const';
import { IProject } from './types';
import { IVoterStats } from '../../store/apiMappers/projectsApi';
import BigNumber from 'bignumber.js';

export const ProjectList = () => {
  const classes = useModerationStatusStyles();
  const dispatch = useDispatch();

  const claimableAmount = useRef<BigNumber>();

  useInitEffect(() => {
    dispatch(GovernanceActions.fetchProjects());
    dispatch(GovernanceActions.fetchClaimAmount());
  });

  const { isOpened, handleOpen, handleClose } = useDialog(
    DIALOG_GOVERNANCE_RULES_OF_PROPOSAL,
  );

  const { data, loading } = useQuery<IVoterStats>({
    type: GovernanceActionTypes.FETCH_CLAIM_ANKR_AMOUNT,
  });

  useEffect(() => {
    if (data && !loading) {
      claimableAmount.current = data.claimableAnkrRewardOf;
    }
  }, [data, loading]);

  const handleDeposit = useCallback(() => {
    dispatch(UserActions.faucet());
  }, [dispatch]);

  const handleClaim = useCallback(() => {
    claimableAmount.current &&
      dispatch(GovernanceActions.claimAnkr(claimableAmount.current));
  }, [dispatch]);

  return (
    <>
      <section className={classes.root}>
        <Curtains>
          <Box mb={4}>
            <Headline1 align="center" component="h2">
              {t('project-list.title')}
            </Headline1>
          </Box>
          <Paper variant="outlined" square={false} className={classes.stats}>
            <Query<IUserInfo | null>
              type={UserActionTypes.FETCH_ACCOUNT_DATA}
              errorComponent={QueryError}
              loadingComponent={QueryLoading}
              noDataMessage={<QueryEmpty />}
              showLoaderDuringRefetch={false}
            >
              {({ data }) => (
                <>
                  <RulesDialog
                    isOpened={isOpened}
                    handleClose={handleClose}
                    hasEnoughBalance={
                      !data?.ankrBalance?.isLessThan(MIN_GOVERNANCE_BALANCE)
                    }
                  />
                  <Typography
                    variant="body1"
                    className={classNames(classes.power, classes.statsText)}
                  >
                    {t('project-list.power')}
                  </Typography>
                  <Typography variant="body1" className={classes.statsText}>
                    {t('unit.ankr-value', {
                      value: data?.ankrBalance.decimalPlaces(DEFAULT_FIXED),
                    })}
                  </Typography>
                </>
              )}
            </Query>
            {isMainnet ? (
              <IconButton
                component="a"
                target="_blank"
                href={ANKR_DEPOSIT_LINK}
                className={classes.plusIcon}
              >
                <PlusIcon />
              </IconButton>
            ) : (
              <IconButton className={classes.plusIcon} onClick={handleDeposit}>
                <PlusIcon />
              </IconButton>
            )}
            <div className={classes.createBlock}>
              <Button
                color="primary"
                size="large"
                fullWidth={true}
                onClick={handleOpen}
              >
                {t('project-list.create')}
              </Button>
            </div>
          </Paper>
          <Box display="flex" justifyContent="center">
            <Mutation
              type={GovernanceActionTypes.CLAIM_ANKR}
              showLoaderDuringRefetch={true}
            >
              {({ loading }) => {
                claimableAmount.current = data?.claimableAnkrRewardOf;
                return (
                  <>
                    {claimableAmount.current && (
                      <Button
                        size="large"
                        color="primary"
                        fullWidth={true}
                        className={classes.claim}
                        onClick={handleClaim}
                        disabled={claimableAmount.current.lte(0) || loading}
                      >
                        {t('project.claim', {
                          value: claimableAmount.current.toFormat(),
                        })}
                      </Button>
                    )}
                  </>
                );
              }}
            </Mutation>
          </Box>
          <div className={classes.content}>
            <Query<IProject[] | null>
              type={GovernanceActionTypes.FETCH_PROJECTS}
              errorComponent={QueryError}
              loadingComponent={QueryLoadingAbsolute}
              showLoaderDuringRefetch={false}
            >
              {({ data }) => {
                if (!data) {
                  return null;
                }

                return data.map(item => (
                  <ProjectListItem
                    moderationStatus={item.status}
                    topic={item.topic}
                    content={item.content}
                    id={item.id}
                    yes={item.yes}
                    no={item.no}
                    endTime={item.endTime}
                    key={item.id}
                  />
                ));
              }}
            </Query>
          </div>
        </Curtains>
      </section>
    </>
  );
};

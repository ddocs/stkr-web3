import { FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import React, { useCallback, useEffect } from 'react';
import { useTopUpStyles } from './TopUpStyles';
import { Box, Grid, Typography } from '@material-ui/core';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Mutation, Query } from '@redux-requests/react';
import { IAllowance } from '../../../../store/apiMappers/allowance';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { TopUpAnkrTimeline } from './TopUpAnkrTimeline';

export enum TopUpAnkrStep {
  'DEPOSIT',
  'ALLOWANCE',
  'TOP_UP',
}

interface ITopUpAnkrFormProps {
  ankrBalance?: BigNumber;
}

export const TopUpAnkrForm = ({
  handleSubmit,
  ankrBalance,
}: FormRenderProps<any> & ITopUpAnkrFormProps) => {
  const classes = useTopUpStyles();
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();

  useEffect(() => {
    if (isConnected) {
      dispatch(UserActions.fetchAllowance());
    }
  }, [dispatch, isConnected]);

  const handleBuy = useCallback(() => {
    // TODO Link for production
    dispatch(UserActions.buyTokens());
  }, [dispatch]);

  const handleAllowTokens = useCallback(() => {
    dispatch(UserActions.allowTokens());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <Query<IAllowance>
        errorComponent={QueryError}
        loadingComponent={QueryLoading}
        noDataMessage={<QueryEmpty />}
        type={UserActionTypes.FETCH_ALLOWANCE}
      >
        {({ data: { remainingAllowance, allowanceAmount } }) => {
          const isNotEnoughBalance = ankrBalance?.isLessThan(allowanceAmount);

          const totalAllowance = remainingAllowance.plus(allowanceAmount);

          if (isNotEnoughBalance) {
            return (
              <Grid container={true} spacing={2}>
                <Grid item={true} xs={12} sm={6}>
                  <Box display="flex" justifyContent="center">
                    <Typography className={classes.notice}>
                      {t('top-up.ankr-min-deposit-notice', {
                        value: totalAllowance.toFormat(),
                      })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item={true} xs={12} sm={6}>
                  <Box display="flex" justifyContent="center">
                    <Button
                      size="large"
                      color="primary"
                      fullWidth={true}
                      className={classes.buy}
                      onClick={handleBuy}
                    >
                      {t('top-up.submit.ankr-buy')}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            );
          }

          const step = remainingAllowance.isGreaterThan(0)
            ? TopUpAnkrStep.ALLOWANCE
            : TopUpAnkrStep.TOP_UP;

          return (
            <Grid container={true} spacing={5}>
              <Grid item={true} xs={12} sm={6}>
                <Box>
                  <TopUpAnkrTimeline
                    totalAllowance={totalAllowance}
                    current={step}
                  />
                </Box>
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Box
                  display="flex"
                  justifyContent="center"
                  height="100%"
                  alignItems="center"
                >
                  {step === TopUpAnkrStep.ALLOWANCE ? (
                    <>
                      <MutationErrorHandler
                        type={UserActionTypes.ALLOW_TOKENS}
                      />
                      <Mutation type={UserActionTypes.ALLOW_TOKENS}>
                        {({ loading }) => (
                          <Button
                            size="large"
                            color="primary"
                            fullWidth={true}
                            className={classes.buy}
                            onClick={handleAllowTokens}
                            disabled={loading}
                          >
                            {t('top-up.submit.ankr-allow', {
                              value: totalAllowance.toFormat(),
                            })}
                          </Button>
                        )}
                      </Mutation>
                    </>
                  ) : (
                    <Mutation type={UserActionTypes.TOP_UP}>
                      {({ loading }) => (
                        <Button
                          color="primary"
                          size="large"
                          variant="contained"
                          submit
                          aria-label="submit"
                          disabled={loading}
                        >
                          {t('top-up.submit.ankr-top-up', {
                            value: totalAllowance.toFormat(),
                          })}
                        </Button>
                      )}
                    </Mutation>
                  )}
                </Box>
              </Grid>
            </Grid>
          );
        }}
      </Query>
    </form>
  );
};

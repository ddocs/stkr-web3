import { Box, Grid, Typography } from '@material-ui/core';
import { Mutation, Query } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { useCallback, useEffect } from 'react';
import { FormRenderProps } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { ANKR_DEPOSIT_LINK, isMainnet } from '../../../../common/const';
import { t } from '../../../../common/utils/intl';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { IAllowance } from '../../../../store/apiMappers/allowance';
import { Button } from '../../../../UiKit/Button';
import { DepositAnkrTimeline } from './DepositAnkrTimeline';
import { useDepositStyles } from './DepositStyles';

// TODO Take it from config contract
export const MIN_NODE_DEPOSIT = 25000;

export enum DepositAnkrStep {
  'TRANSFER_TOKENS',
  'ALLOWANCE',
  'DEPOSIT',
  'TOP_UP',
}

interface IDepositAnkrFormProps {
  ankrBalance?: BigNumber;
  depositedAnkrBalance?: BigNumber;
}

export const DepositAnkrForm = ({
  handleSubmit,
  ankrBalance,
  depositedAnkrBalance,
}: FormRenderProps<any> & IDepositAnkrFormProps) => {
  const classes = useDepositStyles();
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();

  useEffect(() => {
    if (isConnected) {
      dispatch(UserActions.fetchAllowance());
    }
  }, [dispatch, isConnected]);

  const handleBuy = useCallback(() => {
    dispatch(UserActions.faucet());
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
        {({ data: { remainingAllowance, totalAllowance } }) => {
          const isNotEnoughBalance = ankrBalance?.isLessThan(totalAllowance);

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
                    {isMainnet ? (
                      <Button
                        size="large"
                        color="primary"
                        fullWidth={true}
                        className={classes.buy}
                        target="_blank"
                        href={ANKR_DEPOSIT_LINK}
                        {...({ component: 'a' } as any)}
                      >
                        {t('top-up.submit.ankr-buy')}
                      </Button>
                    ) : (
                      <Button
                        size="large"
                        color="primary"
                        fullWidth={true}
                        className={classes.buy}
                        onClick={handleBuy}
                      >
                        {t('top-up.submit.ankr-buy')}
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            );
          }

          const step = (() => {
            if (
              depositedAnkrBalance?.isGreaterThanOrEqualTo(MIN_NODE_DEPOSIT)
            ) {
              return DepositAnkrStep.TOP_UP;
            }

            return remainingAllowance.isGreaterThan(0)
              ? DepositAnkrStep.ALLOWANCE
              : DepositAnkrStep.DEPOSIT;
          })();

          return (
            <Grid container={true} spacing={5}>
              <Grid item={true} xs={12} sm={6}>
                <Box>
                  <DepositAnkrTimeline
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
                  {step === DepositAnkrStep.ALLOWANCE ? (
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
                  ) : step === DepositAnkrStep.TOP_UP ? (
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
                            value: depositedAnkrBalance?.toFormat(),
                          })}
                        </Button>
                      )}
                    </Mutation>
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

import { Field, FormRenderProps } from 'react-final-form';
import { t, tHTML } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import React, { useCallback, useEffect } from 'react';
import { useTopUpStyles } from './TopUpStyles';
import {
  Body2,
  Headline1,
  Headline4,
  Headline5,
  SmallTitle,
} from '../../../../UiKit/Typography';
import { SubTitle } from '../../../../UiKit/Typography/Typography';
import { Box } from '@material-ui/core';
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
import { SliderField } from '../../../../UiKit/RangeField';
import { ReactComponent as DoneIcon } from './assets/done.svg';
import { ENABLE_ANKR_DEPOSIT } from '../../../../common/const';

export enum DepositType {
  ETH = 'ETH',
  ANKR = 'ANKR',
}

export const DEPOSIT_TYPE_FIELD_NAME = 'depositType';
export const ETH_AMOUNT_FIELD_NAME = 'etheriumAmount';
export const ANKR_AMOUNT_FIELD_NAME = 'ankrAmount';
export const MIN_ETH_AMOUNT_DEPOSIT = 2;

interface ITopUpFormProps {
  ankrBalance?: BigNumber;
}

export const TopUpForm = ({
  handleSubmit,
  ankrBalance,
  values,
  initialValues,
}: FormRenderProps<any> & ITopUpFormProps) => {
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
    <form onSubmit={handleSubmit} className={classes.form}>
      <Headline1 className={classes.title} component="h3" color="primary">
        {t('create-micropool.title')}
      </Headline1>
      <Query<IAllowance>
        errorComponent={QueryError}
        loadingComponent={QueryLoading}
        noDataMessage={<QueryEmpty />}
        type={UserActionTypes.FETCH_ALLOWANCE}
      >
        {({ data: { remainingAllowance, allowanceAmount } }) => {
          const isNotEnoughAllowance =
            values[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ANKR &&
            remainingAllowance.isGreaterThan(0);

          const isNotEnoughBalance =
            values[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ANKR &&
            ankrBalance?.isLessThan(allowanceAmount);

          const totalAllowance = remainingAllowance.plus(allowanceAmount);

          return (
            <>
              <ul className={classes.list}>
                <li className={classes.depositItem}>
                  <Headline4 className={classes.caption} component="h4">
                    {t('create-micropool.form.step-2.caption')}
                  </Headline4>

                  <Field
                    name={DEPOSIT_TYPE_FIELD_NAME}
                    render={({ input: { onChange, value } }) => {
                      const handleChange = (event: any) => {
                        onChange(event.currentTarget.value);
                      };
                      return (
                        <div className={classes.depositTypeSwitcher}>
                          <Button
                            variant="outlined"
                            size="large"
                            fullWidth={true}
                            className={classes.depositTypeButton}
                            value={DepositType.ETH}
                            onClick={handleChange}
                            color={
                              value === DepositType.ETH
                                ? 'primary'
                                : 'secondary'
                            }
                          >
                            {t('create-micropool.form.step-2.deposit-ETH')}
                          </Button>
                          <Headline5 className={classes.depositDelimiter}>
                            {t('create-micropool.form.step-2.or')}
                          </Headline5>
                          <Button
                            variant="outlined"
                            size="large"
                            fullWidth={true}
                            className={classes.depositTypeButton}
                            value={DepositType.ANKR}
                            onClick={handleChange}
                            disabled={!ENABLE_ANKR_DEPOSIT}
                            color={
                              value === DepositType.ANKR
                                ? 'primary'
                                : 'secondary'
                            }
                          >
                            {t('create-micropool.form.step-2.deposit-ANKR')}
                          </Button>
                        </div>
                      );
                    }}
                  />
                </li>
                {values[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ETH && (
                  <li className={classes.item}>
                    <Headline4 className={classes.caption} component="h4">
                      {t('create-micropool.form.step-3.caption-ETH')}
                    </Headline4>
                    <Body2
                      className={classes.text}
                      component="p"
                      color="secondary"
                    >
                      {tHTML('create-micropool.form.step-3.text-ETH')}
                    </Body2>
                    <div>
                      <Headline4 className={classes.ethValue} align="right">
                        {t('units.eth', {
                          value: values[ETH_AMOUNT_FIELD_NAME],
                        })}
                      </Headline4>
                      <Field
                        component={SliderField}
                        min={MIN_ETH_AMOUNT_DEPOSIT}
                        max={initialValues[ETH_AMOUNT_FIELD_NAME].toNumber()}
                        name={ETH_AMOUNT_FIELD_NAME}
                      />
                    </div>
                  </li>
                )}
                {values[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ANKR && (
                  <li className={classes.item}>
                    <Headline4 className={classes.caption} component="h4">
                      {t('create-micropool.form.step-3.caption-ANKR')}
                    </Headline4>
                    <Body2
                      className={classes.text}
                      component="p"
                      color="secondary"
                    >
                      {t('create-micropool.form.step-3.text-ANKR')}
                    </Body2>

                    <div className={classes.deposit}>
                      <Box>
                        <SubTitle className={classes.depositTitle}>
                          {t('create-micropool-form.your-balance')}
                          <Button
                            className={classes.buy}
                            variant="outlined"
                            size="small"
                            color="primary"
                            onClick={handleBuy}
                          >
                            {t('create-micropool-form.buy')}
                          </Button>
                        </SubTitle>
                        <Box display="flex" alignItems="center">
                          <Headline4>
                            {t('units.ankr', {
                              value: ankrBalance?.toFormat(),
                            })}
                          </Headline4>
                        </Box>
                      </Box>
                      <li className={classes.allowance}>
                        {isNotEnoughAllowance ? (
                          <Mutation type={UserActionTypes.ALLOW_TOKENS}>
                            {({ loading }) => {
                              return (
                                <Button
                                  size="large"
                                  color="primary"
                                  className={classes.depositButton}
                                  disabled={loading}
                                  onClick={handleAllowTokens}
                                >
                                  {t('create-micropool-form.allow', {
                                    value: totalAllowance.toFormat(),
                                  })}
                                </Button>
                              );
                            }}
                          </Mutation>
                        ) : (
                          <SmallTitle
                            className={classes.allowanceDoneTitle}
                            color="primary"
                          >
                            <DoneIcon className={classes.allowanceDoneIcon} />
                            {t('create-micropool-form.ankr-allowed', {
                              value: allowanceAmount.toFormat(),
                            })}
                          </SmallTitle>
                        )}
                      </li>
                      <MutationErrorHandler
                        type={UserActionTypes.ALLOW_TOKENS}
                      />
                    </div>
                  </li>
                )}
              </ul>

              <Button
                className={classes.submit}
                color="primary"
                size="large"
                variant="contained"
                submit
                aria-label="submit"
                disabled={isNotEnoughAllowance || isNotEnoughBalance}
              >
                {t('create-micropool.submit')}
              </Button>
            </>
          );
        }}
      </Query>
    </form>
  );
};

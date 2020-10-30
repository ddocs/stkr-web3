import { Field, FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import React, { useCallback, useEffect } from 'react';
import { useCreateMicropoolStyles } from './CreateMicropoolStyles';
import {
  Body2,
  Headline1,
  Headline4,
  Headline6,
} from '../../../../UiKit/Typography';
import { InputField } from '../../../../UiKit/InputField';
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

export enum DepositType {
  ETH = 'ETH',
  ANKR = 'ANKR',
}

export const DEPOSIT_TYPE_FIELD_NAME = 'depositType';
export const ETH_AMOUNT_FIELD_NAME = 'etheriumAmount';
export const MIN_ETH_AMOUNT_DEPOSIT = 2;

interface ICreateMicropoolFormProps {
  ankrBalance?: BigNumber;
  ethereumBalance?: BigNumber;
}

export const CreateMicropoolForm = ({
  handleSubmit,
  ankrBalance,
  ethereumBalance,
  values,
}: FormRenderProps<any> & ICreateMicropoolFormProps) => {
  const classes = useCreateMicropoolStyles();
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
        {({ data: { remainingAllowance } }) => {
          const disabled =
            values[DEPOSIT_TYPE_FIELD_NAME] === DepositType.ANKR &&
            remainingAllowance.isGreaterThan(0);

          return (
            <>
              <ul className={classes.list}>
                <li className={classes.item}>
                  <Headline6
                    className={classes.count}
                    component="span"
                    color="primary"
                  >
                    {t('create-micropool.form.step-1.count')}
                  </Headline6>
                  <Headline4 className={classes.caption} component="h4">
                    {t('create-micropool.form.step-1.caption')}
                  </Headline4>
                  <Field
                    component={InputField}
                    name="name"
                    type="text"
                    label={t('create-micropool.form.step-1.name')}
                    color="secondary"
                  />
                </li>
                <li className={classes.depositItem}>
                  <Headline6
                    className={classes.count}
                    component="span"
                    color="primary"
                  >
                    {t('create-micropool.form.step-2.count')}
                  </Headline6>
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
                          <Headline6 className={classes.depositDelimiter}>
                            {t('create-micropool.form.step-2.or')}
                          </Headline6>
                          <Button
                            variant="outlined"
                            size="large"
                            fullWidth={true}
                            className={classes.depositTypeButton}
                            value={DepositType.ANKR}
                            onClick={handleChange}
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
                      {t('create-micropool.form.step-3.text-ETH')}
                    </Body2>
                    <div>
                      <Headline4 className={classes.ethValue}>
                        {t('units.eth', {
                          value: values[ETH_AMOUNT_FIELD_NAME],
                        })}
                      </Headline4>
                      <Field
                        component={SliderField}
                        min={MIN_ETH_AMOUNT_DEPOSIT}
                        max={ethereumBalance?.toNumber()}
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
                        </SubTitle>
                        <Box display="flex" alignItems="center">
                          <Headline4>{ankrBalance?.toFormat()}</Headline4>
                          {disabled && (
                            <Button
                              className={classes.buy}
                              variant="outlined"
                              size="small"
                              color="primary"
                              onClick={handleBuy}
                            >
                              {t('create-micropool-form.buy')}
                            </Button>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        <SubTitle className={classes.depositTitle}>
                          {t('create-micropool-form.needed')}
                        </SubTitle>
                        <Headline4>{remainingAllowance.toFormat()}</Headline4>
                      </Box>
                      <MutationErrorHandler
                        type={UserActionTypes.ALLOW_TOKENS}
                      />
                      {disabled && (
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
                                {t('create-micropool-form.deposit', {
                                  value: remainingAllowance.toFormat(),
                                })}
                              </Button>
                            );
                          }}
                        </Mutation>
                      )}
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
                disabled={disabled}
              >
                {t('navigation.create-pool')}
              </Button>
            </>
          );
        }}
      </Query>
    </form>
  );
};

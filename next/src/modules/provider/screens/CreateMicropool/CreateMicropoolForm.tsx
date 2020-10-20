import { Field, FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import React, { useCallback } from 'react';
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
import { useAction } from '../../../../store/redux';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Mutation, Query } from '@redux-requests/react';
import { IAllowance } from '../../../../store/apiMappers/allowance';
import { QueryError } from '../../../../components/QueryError/QueryError';
import { QueryLoading } from '../../../../components/QueryLoading/QueryLoading';
import { QueryEmpty } from '../../../../components/QueryEmpty/QueryEmpty';

interface ICreateMicropoolFormProps {}

export const CreateMicropoolForm = ({
  handleSubmit,
}: FormRenderProps<any> & ICreateMicropoolFormProps) => {
  const classes = useCreateMicropoolStyles();
  const dispatchFetchAllowance = useAction(UserActions.fetchAllowance);
  const dispatchAllowTokens = useAction(UserActions.allowTokens);

  useInitEffect(() => {
    dispatchFetchAllowance();
  });

  const handleBuy = useCallback(() => {
    alert('You have bought 100,000 ANKR');
  }, []);

  const handleAllowTokens = useCallback(() => {
    dispatchAllowTokens();
  }, [dispatchAllowTokens]);

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
        {({ data: { allowanceAmount, remainingAllowance } }) => {
          const disabled = remainingAllowance.isGreaterThan(0);

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
                    required
                    name="name"
                    type="text"
                    label={t('create-micropool.form.step-1.name')}
                  />
                </li>
                <li className={classes.item}>
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
                  <Body2
                    className={classes.text}
                    component="p"
                    color="secondary"
                  >
                    {t('create-micropool.form.step-2.text')}
                  </Body2>

                  <div className={classes.deposit}>
                    <Box>
                      <SubTitle className={classes.depositTitle}>
                        {t('create-micropool-form.your-balance')}
                      </SubTitle>
                      <Box display="flex" alignItems="center">
                        <Headline4>{allowanceAmount.toFormat()}</Headline4>
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

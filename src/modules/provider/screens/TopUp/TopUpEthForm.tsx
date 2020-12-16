import { Field, FormRenderProps } from 'react-final-form';
import { t, tHTML } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import React, { useEffect } from 'react';
import { useTopUpStyles } from './TopUpStyles';
import { Headline4 } from '../../../../UiKit/Typography';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Mutation } from '@redux-requests/react';
import { useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import { SliderField } from '../../../../UiKit/RangeField';
import { Box, Grid, Typography } from '@material-ui/core';
import {
  PROVIDER_MIN_BALANCE,
  STAKING_AMOUNT_STEP,
} from '../../../../common/const';
import { ETH_AMOUNT_FIELD_NAME } from './TopUp';

interface ITopUpEthFormProps {
  deposited?: BigNumber;
}

export const TopUpEthForm = ({
  handleSubmit,
  values,
  initialValues,
  deposited,
}: FormRenderProps<any> & ITopUpEthFormProps) => {
  const classes = useTopUpStyles();
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();

  useEffect(() => {
    if (isConnected) {
      dispatch(UserActions.fetchAllowance());
    }
  }, [dispatch, isConnected]);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <>
        <Box width="100%" mb={3}>
          <Headline4 align="right" className={classes.ethSliderAmount}>
            {t('units.eth-value', {
              value: values[ETH_AMOUNT_FIELD_NAME],
            })}
          </Headline4>
          <Field
            component={SliderField}
            min={deposited?.gt(0) ? STAKING_AMOUNT_STEP : PROVIDER_MIN_BALANCE}
            max={initialValues[ETH_AMOUNT_FIELD_NAME]}
            name={ETH_AMOUNT_FIELD_NAME}
            step={STAKING_AMOUNT_STEP}
          />
        </Box>
        <Grid container={true} spacing={5}>
          <Grid item={true} xs={12} sm={8}>
            <Typography variant="subtitle2" className={classes.ethTopUpNotice}>
              {tHTML('top-up.eth-top-up-note')}
            </Typography>
          </Grid>
          <Grid item={true} xs={12} sm={4}>
            <Mutation type={UserActionTypes.TOP_UP}>
              {({ loading }) => (
                <Box display="flex" justifyContent="center" height="100%">
                  <Button
                    color="primary"
                    size="large"
                    variant="contained"
                    submit
                    aria-label="submit"
                    disabled={loading}
                    fullWidth={true}
                    className={classes.ethTopUpButton}
                  >
                    {t('top-up.submit.eth-top-up', {
                      value: values[ETH_AMOUNT_FIELD_NAME],
                    })}
                  </Button>
                </Box>
              )}
            </Mutation>
          </Grid>
        </Grid>
      </>
    </form>
  );
};

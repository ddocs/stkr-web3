import { Box, Grid, Typography } from '@material-ui/core';
import { Mutation, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import React, { useEffect } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { PROVIDER_MIN_BALANCE } from '../../../../common/const';
import { t, tHTML } from '../../../../common/utils/intl';
import { useAuthentication } from '../../../../common/utils/useAuthentications';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Button } from '../../../../UiKit/Button';
import { SliderField } from '../../../../UiKit/RangeField';
import { Body2, Headline4 } from '../../../../UiKit/Typography';
import { ETH_AMOUNT_FIELD_NAME } from './Deposit';
import { useDepositStyles } from './DepositStyles';
import { useFeaturesAvailable } from '../../../../common/hooks/useFeaturesAvailable';
import { CheckboxField } from '../../../../UiKit/Checkbox/CheckboxField';
import { ISidecars } from '../../../../store/reducers';

interface IDepositEthFormProps {
  deposited?: BigNumber;
}

export const DepositEthForm = ({
  handleSubmit,
  values,
  initialValues,
  deposited,
}: FormRenderProps<any> & IDepositEthFormProps) => {
  const classes = useDepositStyles();
  const dispatch = useDispatch();
  const { isConnected } = useAuthentication();

  const { data: sidecars } = useQuery<ISidecars>({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
  });

  const hasNode = sidecars.items.find(sidecar =>
    ['SIDECAR_STATUS_ACTIVE', 'SIDECAR_STATUS_ATTESTING'].includes(
      sidecar.status,
    ),
  );

  useEffect(() => {
    if (isConnected) {
      dispatch(UserActions.fetchAllowance());
    }
  }, [dispatch, isConnected]);

  const { stakingAmountStep } = useFeaturesAvailable();

  return hasNode ? (
    <form onSubmit={handleSubmit} className={classes.form}>
      <>
        <Box className={classes.info} mb={3}>
          {t('top-up.deposit-tip')}
        </Box>
        <Field
          component={CheckboxField}
          name="depositAgreementCheckbox"
          type="checkbox"
          showErrorText={true}
        >
          <Body2 color="secondary">{t('top-up.deposit-agreement')}</Body2>
        </Field>
        <Box width="100%" mt={3} mb={3}>
          <Headline4 align="right" className={classes.ethSliderAmount}>
            {t('unit.eth-value', {
              value: values[ETH_AMOUNT_FIELD_NAME],
            })}
          </Headline4>
          <Field
            component={SliderField}
            min={deposited?.gt(0) ? stakingAmountStep : PROVIDER_MIN_BALANCE}
            max={initialValues[ETH_AMOUNT_FIELD_NAME]}
            name={ETH_AMOUNT_FIELD_NAME}
            step={stakingAmountStep}
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
  ) : (
    <Typography className={classes.notice}>
      {t('top-up.deposit-eth-placeholder')}
    </Typography>
  );
};

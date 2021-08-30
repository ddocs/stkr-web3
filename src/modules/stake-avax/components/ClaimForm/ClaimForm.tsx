import { Grid, Tooltip, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { FormApi } from 'final-form';
import React, { useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { Spinner } from '../../../../components/Spinner';
import { Button } from '../../../../UiKit/Button';
import { InputField } from '../../../../UiKit/InputField';
import { SliderField } from '../../../../UiKit/RangeField';
import { Body2 } from '../../../../UiKit/Typography';
import { configFromEnv } from '../../../api/config';
import { IClaimPayload } from '../../api/types';
import { useClaimDialogStyles } from '../ClaimDialog/ClaimDialogStyles';
import { NetworkTab, NetworkTabs } from '../NetworkTabs';
import { ReactComponent as BnbIcon } from './assets/bnb.svg';
import { ReactComponent as EthIcon } from './assets/eth.svg';
import { useClaimFormStyles } from './ClaimFormStyles';

const MIN_AMOUNT = 1;

export interface IClaimFormProps {
  amount: BigNumber;
  loading: boolean;
  onSubmit: (payload: IClaimPayload) => void;
}

export const ClaimForm = ({
  amount: maxAmount,
  loading,
  onSubmit,
}: IClaimFormProps) => {
  const classes = useClaimFormStyles();
  const dialogClasses = useClaimDialogStyles();

  const max = useMemo(() => Math.floor(maxAmount.toNumber()), [maxAmount]);
  const config = useMemo(() => configFromEnv(), []);

  const selectNetwork = useCallback(
    (form: FormApi, chainId: number) => () => form.change('network', chainId),
    [],
  );

  const validateAddress = useCallback((value: string) => {
    if (!value) return undefined;
    const regexp = /^0x+[A-F,a-f,0-9]{40}/;
    const match = value.match(regexp);
    if (match && value === match[0]) {
      return undefined;
    }
    return t('stake-avax.error.invalid-address');
  }, []);

  const renderForm = ({
    handleSubmit,
    values: { amount, network, address },
    form,
  }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className={dialogClasses.container}>
          <NetworkTabs mb={5}>
            <NetworkTab
              icon={<EthIcon />}
              selected={network === config.providerConfig.ethereumChainId}
              title={t('cross-chain-bridge.chain-ehthereum')}
              onClick={selectNetwork(
                form,
                config.providerConfig.ethereumChainId,
              )}
            />

            <Tooltip title={t('coming-soon')}>
              <div>
                <NetworkTab
                  icon={<BnbIcon />}
                  selected={network === config.providerConfig.binanceChainId}
                  disabled
                  title={t('cross-chain-bridge.chain-binance')}
                />
              </div>
            </Tooltip>
          </NetworkTabs>

          <label className={classes.range}>
            <Typography variant="body1" classes={{ root: classes.label }}>
              {t('stake-avax.amount-to-claim', { value: amount })}
            </Typography>

            <Field
              component={SliderField}
              min={0}
              max={max}
              step={MIN_AMOUNT}
              name="amount"
            />
            <input type="hidden" name="network" />
          </label>

          <Field
            classes={{ root: classes.input }}
            component={InputField}
            name="address"
            label={t('cross-chain-bridge.form.address')}
            variant="outlined"
            fullWidth
            validate={validateAddress}
          />
        </div>

        <div className={classes.footer}>
          <div
            className={classNames(
              dialogClasses.container,
              classes.footerWrapper,
            )}
          >
            {!loading ? (
              <Button
                color="primary"
                size="large"
                className={classes.submit}
                type="submit"
                disabled={amount <= 0 || !address || loading}
              >
                {t('cross-chain-bridge.available.btn-claim')}
              </Button>
            ) : (
              <Grid container spacing={3} alignItems="center">
                <Grid item xs>
                  <Typography
                    className={classes.info}
                    variant="body2"
                    color="textSecondary"
                  >
                    {t('stake-avax.claim.info')}
                  </Typography>
                </Grid>

                <Grid item xs="auto">
                  <Spinner size={32} />
                </Grid>
              </Grid>
            )}
          </div>
        </div>
      </form>
    );
  };

  return maxAmount.gte(MIN_AMOUNT) ? (
    <Form
      onSubmit={onSubmit}
      render={renderForm}
      initialValues={{
        amount: 0,
        network: config.providerConfig.ethereumChainId,
      }}
    />
  ) : (
    <Body2 className={classes.warning} color="secondary" component="p">
      {t('stake-avax.not-enough-claim')}
    </Body2>
  );
};

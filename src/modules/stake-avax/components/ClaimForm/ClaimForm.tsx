import { Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { t } from '../../../../common/utils/intl';
import { Button } from '../../../../UiKit/Button';
import { InputField } from '../../../../UiKit/InputField';
import { useClaimFormStyles } from './ClaimFormStyles';
import { ReactComponent as EthIcon } from './assets/eth.svg';
import { ReactComponent as BnbIcon } from './assets/bnb.svg';
import BigNumber from 'bignumber.js';
import { SliderField } from '../../../../UiKit/RangeField';
import { IClaimPayload } from '../../../avalanche-sdk/types';
import { Body2 } from '../../../../UiKit/Typography';
import { FormApi } from 'final-form';
import { Spinner } from '../../../../components/Spinner';
import { configFromEnv } from '../../../api/config';

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
    return 'Invalid address';
  }, []);

  const renderForm = ({
    handleSubmit,
    values: { amount, network, address },
    form,
  }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.body}>
          <div className={classes.wrapper}>
            <div className={classes.networksContainer}>
              <Paper
                variant="outlined"
                square={false}
                className={classNames(
                  classes.network,
                  network === config.providerConfig.ethereumChainId
                    ? 'selected'
                    : undefined,
                )}
                onClick={selectNetwork(
                  form,
                  config.providerConfig.ethereumChainId,
                )}
              >
                <EthIcon />
                {t('cross-chain-bridge.chain-ehthereum')}
              </Paper>
              <Paper
                variant="outlined"
                square={false}
                className={classNames(
                  classes.network,
                  network === config.providerConfig.binanceChainId
                    ? 'selected'
                    : undefined,
                )}
                onClick={selectNetwork(
                  form,
                  config.providerConfig.binanceChainId,
                )}
              >
                <BnbIcon />
                {t('cross-chain-bridge.chain-binance')}
              </Paper>
            </div>

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
        </div>
        <div className={classes.footer}>
          <div className={classNames(classes.wrapper, classes.footerWrapper)}>
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
              <Spinner size={32} />
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

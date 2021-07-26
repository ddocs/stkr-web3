import React from 'react';
import { useDispatch } from 'react-redux';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { Queries } from '../../../../components/Queries/Queries';
import { ResponseData } from '../../../../components/ResponseData';
import { AvalancheActions } from '../../../../store/actions/AvalancheActions';
import { StakingStep } from '../../../avalanche-sdk/types';
import { Connect } from '../../components/Connect';
import { Dashboard } from '../../components/Dashboard';
import { useStakeAvaxStyles } from './StakeAvaxStyles';

export const StakeAvax = () => {
  const dispatch = useDispatch();
  const classes = useStakeAvaxStyles();

  useInitEffect(() => {
    dispatch(AvalancheActions.checkWallet());
  });

  return (
    <Queries<ResponseData<typeof AvalancheActions.checkWallet>>
      requestActions={[AvalancheActions.checkWallet]}
      showLoaderDuringRefetch={false}
    >
      {({ data: wallet }) => {
        if (wallet.step === StakingStep.AwaitingSwitchNetwork) {
          const { requiredNetwork, amount, recipient } = wallet;
          return (
            <section className={classes.root}>
              <Connect
                network={requiredNetwork}
                amount={amount}
                recipient={recipient}
              />
            </section>
          );
        }

        return wallet && <Dashboard {...(wallet as any)} />;
      }}
    </Queries>
  );
};

import React from 'react';
import { useDispatch } from 'react-redux';
import { useInitEffect } from '../../../../common/hooks/useInitEffect';
import { Queries } from '../../../../components/Queries/Queries';
import { ResponseData } from '../../../../components/ResponseData';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { StakingStep } from '../../api/types';
import { Connect } from '../../components/Connect';
import { Dashboard } from '../../components/Dashboard';
import { useStakeAvaxStyles } from './StakeAvaxStyles';

export const StakeAvax = () => {
  const dispatch = useDispatch();
  const classes = useStakeAvaxStyles();

  useInitEffect(() => {
    dispatch(AvalancheActions.fetchTransactionStatus());
  });

  return (
    <Queries<ResponseData<typeof AvalancheActions.fetchTransactionStatus>>
      requestActions={[AvalancheActions.fetchTransactionStatus]}
      showLoaderDuringRefetch={false}
    >
      {({ data: transactionStatus }) => {
        if (transactionStatus.step === StakingStep.AwaitingSwitchNetwork) {
          const { requiredNetwork, depositAmount, recipient } =
            transactionStatus;
          return (
            <section className={classes.root}>
              <Connect
                network={requiredNetwork}
                amount={depositAmount}
                recipient={recipient}
              />
            </section>
          );
        }

        return (
          transactionStatus && <Dashboard {...(transactionStatus as any)} />
        );
      }}
    </Queries>
  );
};

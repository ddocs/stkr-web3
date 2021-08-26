import { useDispatchRequest, useMutation } from '@redux-requests/react';
import React, { useCallback } from 'react';
import { t } from '../../../../common/utils/intl';
import { MutationErrorHandler } from '../../../../components/MutationErrorHandler/MutationErrorHandler';
import { Queries } from '../../../../components/Queries/Queries';
import { ResponseData } from '../../../../components/ResponseData';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { useDialog } from '../../hooks/useDialog';
import { PlusMinusBtn } from '../PlusMinusBtn';
import { StakeDialog } from '../StakeDialog';
import { IStakeFormValues } from '../StakeForm';

interface IStakeBtnProps {
  className?: string;
}

export const StakeBtn = ({ className }: IStakeBtnProps) => {
  const dispatchRequest = useDispatchRequest();
  const { isOpened, onClose, onOpen } = useDialog();

  const { loading: stakeLoading } = useMutation({
    type: AvalancheActions.stake.toString(),
  });

  const onSubmit = useCallback(
    (values: IStakeFormValues) => {
      dispatchRequest(AvalancheActions.stake(values)).then(data => {
        if (!data.error) {
          dispatchRequest(AvalancheActions.fetchStakerStats());
          dispatchRequest(AvalancheActions.fetchUnstakedBalance());
          onClose();
        }
      });
    },
    [dispatchRequest, onClose],
  );

  return (
    <Queries<ResponseData<typeof AvalancheActions.fetchStakerStats>>
      requestActions={[AvalancheActions.fetchStakerStats]}
      showLoaderDuringRefetch={false}
    >
      {response => {
        if (!response) {
          return null;
        }

        const { data: stakerStats } = response;

        return (
          <>
            <PlusMinusBtn
              onClick={onOpen}
              tooltip={t('stake-avax.dashboard.stake')}
              icon="plus"
              className={className}
            />

            <MutationErrorHandler type={AvalancheActions.stake.toString()} />

            <StakeDialog
              amount={stakerStats.balance}
              isOpened={isOpened}
              isStakeLoading={stakeLoading}
              onSubmit={onSubmit}
              onClose={onClose}
            />
          </>
        );
      }}
    </Queries>
  );
};

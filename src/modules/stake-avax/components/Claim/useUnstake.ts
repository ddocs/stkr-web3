import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import Web3 from 'web3';
import { getTimeRemaining } from '../../../../common/utils/getTimeRemaining';
import { t } from '../../../../common/utils/intl';
import { AvalancheActions } from '../../actions/AvalancheActions';
import { useDialog } from '../../hooks/useDialog';
import { IUnstakeFormValues } from '../UnstakeDialog';

const getMaxTimeLeft = (endDate: Date) => {
  const timeRemaining = getTimeRemaining(endDate);

  if (timeRemaining.days) {
    return t('time.days', {
      days: timeRemaining.days,
    });
  }

  if (timeRemaining.hours) {
    return t('time.hours', {
      hours: timeRemaining.hours,
    });
  }

  return t('time.minutes', {
    minutes: timeRemaining.minutes || 1,
  });
};

export const useUnstake = () => {
  const dispatchRequest = useDispatchRequest();
  const { isOpened, onClose, onOpen } = useDialog();
  const {
    isOpened: isSuccessOpened,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDialog();

  const { data: claimServeTime } = useQuery<Date | null>({
    type: AvalancheActions.fetchClaimServeTime.toString(),
  });

  const { loading } = useMutation({
    type: AvalancheActions.claimAvax.toString(),
  });

  const maxTimeLeft = claimServeTime
    ? getMaxTimeLeft(claimServeTime)
    : undefined;

  const onSubmit = ({ amount }: IUnstakeFormValues) => {
    dispatchRequest(
      AvalancheActions.claimAvax(Web3.utils.toWei(`${amount}`)),
    ).then(data => {
      if (!data.error) {
        dispatchRequest(AvalancheActions.fetchTransactionStatus());
        dispatchRequest(AvalancheActions.fetchStakerStats());
        onClose();
        onSuccessOpen();
      }
    });
  };

  return {
    isLoading: loading,
    maxTimeLeft,
    isOpened,
    onClose,
    onOpen,
    onSubmit,
    isSuccessOpened,
    onSuccessClose,
  };
};

import { useCallback, useState } from 'react';
import { RequestStatus } from '../utils/requestStatus';
import { t } from '../utils/intl';

export function createRequestInitial(message?: string) {
  return { type: 'inactive', message } as RequestStatus;
}

export function createRequestInProgress(progress?: number) {
  return { progress, type: 'active' } as RequestStatus;
}

export function createRequestFailed(error?: string) {
  return { error, type: 'failed' } as RequestStatus;
}

export function createRequestSuccessful() {
  return { type: 'successful' } as RequestStatus;
}

const extractMessage = (responseData?: {
  error?: string;
  message?: string;
}) => {
  if (!responseData) {
    return t('errors.unexpected');
  }

  if (responseData['error']) {
    return responseData['error'];
  }

  if (responseData['message']) {
    return responseData['message'];
  }

  return t('errors.unexpected');
};

export const useTrackedOperation = <Payload = any, Response = void>(
  call: (payload: Payload) => Promise<Response>,
  onComplete?: () => void,
) => {
  const [status, setStatus] = useState<RequestStatus>(createRequestInitial());

  const submit = useCallback(
    async (payload: Payload) => {
      let response: Response | undefined;
      setStatus(createRequestInProgress());
      try {
        response = await call(payload);
        if (onComplete) {
          onComplete();
        }
        setStatus(createRequestSuccessful());
      } catch (error) {
        const errorMessage = extractMessage(error);
        setStatus(createRequestFailed(errorMessage));
      }
      return response;
    },
    [call, onComplete],
  );

  return { status, submit };
};

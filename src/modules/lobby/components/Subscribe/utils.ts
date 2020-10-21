import { IEmailPayload } from '../../../../common/types';

export const apiPostEmail = (payload: IEmailPayload) => {
  return fetch('', {
    method: 'POST',
    body: JSON.stringify({ ...payload, subject: '' }),
  });
};

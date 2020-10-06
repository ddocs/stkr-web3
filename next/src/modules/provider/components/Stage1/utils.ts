import { validateEmail } from '../../../../common/utils/validation';
import { t } from '../../../../common/utils/intl';
import { IEmailPayload } from './types';

export const validation = (data: IEmailPayload) => {
  const errors: Partial<{ [key in keyof IEmailPayload]: string }> = {};
  const email = data.email;

  if (!validateEmail(email)) {
    errors.email = t('validation.email-error');
  }

  return errors;
};

export const apiPostEmail = (payload: IEmailPayload) => {
  return fetch('', {
    method: 'POST',
    body: JSON.stringify({ ...payload, subject: '' }),
  });
};

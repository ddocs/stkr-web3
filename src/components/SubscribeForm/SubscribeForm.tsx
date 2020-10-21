import * as React from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { InputField } from '../../UiKit/InputField';
import { Button } from '../../UiKit/Button';
import { validateEmail } from '../../common/utils/validation';
import { t } from '../../common/utils/intl';
import classNames from 'classnames';
import { IEmailPayload } from '../../common/types';
import { useSubscribeFormStyles } from './SubscribeFormStyles';

interface ISubscribeFormProps {
  className?: string;
  color?: 'primary' | 'secondary';
  buttonCaption: string;
  disabled?: boolean;
  onSubmit(data: IEmailPayload): void;
}

const validation = (data: IEmailPayload) => {
  const errors: Partial<{ [key in keyof IEmailPayload]: string }> = {};
  const email = data.email;

  if (!validateEmail(email)) {
    errors.email = t('validation.email-error');
  }

  return errors;
};

export const SubscribeForm = ({
  className,
  color = 'primary',
  buttonCaption,
  onSubmit,
  disabled,
}: ISubscribeFormProps) => {
  const classes = useSubscribeFormStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form
        onSubmit={handleSubmit}
        className={classNames(classes.form, className)}
      >
        <Field
          className={classes.input}
          component={InputField}
          name="email"
          type="email"
          placeholder={t('navigation.email')}
          color={color}
        />
        <Button
          className={classes.button}
          color="primary"
          size="large"
          variant="contained"
          submit
          disabled={disabled}
          aria-label="submit"
        >
          {buttonCaption}
        </Button>
      </form>
    );
  };

  return <Form render={renderForm} onSubmit={onSubmit} validate={validation} />;
};

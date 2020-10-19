import React, { useCallback } from 'react';
import { useCreateBeaconChainStyles } from './CreateBeaconChainStyles';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Icon } from './Icon';
import { Field, Form, FormRenderProps } from 'react-final-form';
import { InputField } from '../../../../UiKit/InputField';
import { Button } from '../../../../UiKit/Button';
import { useAction } from '../../../../store/redux';
import {
  UserActions,
  UserActionTypes,
} from '../../../../store/actions/UserActions';
import { Curtains } from '../../../../UiKit/Curtains';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Mutation } from '@redux-requests/react';
import { CreateBeaconChainProgress } from './CreateBeaconChainProgress';

interface ICreateNodePayload {
  name: string;
}

interface ICreateBeaconChainProps {
  onSubmit(payload: ICreateNodePayload): void;
}

export const CreateBeaconChainComponent = ({
  onSubmit,
}: ICreateBeaconChainProps) => {
  const classes = useCreateBeaconChainStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <Headline2 component="span" color="primary" className={classes.title}>
          {t('provider.create.create-beacon-chain-stage-1.title')}
        </Headline2>
        <Field
          className={classes.input}
          component={InputField}
          required
          name="name"
          type="text"
          label={t('navigation.node-name')}
        />
        <Body2 component="span" color="secondary" className={classes.text}>
          {t('provider.create.create-beacon-chain-stage-1.description')}
        </Body2>
        <Button
          className={classes.button}
          color="primary"
          size="large"
          variant="contained"
          submit
          aria-label="submit"
        >
          {t('navigation.create')}
        </Button>
      </form>
    );
  };

  return (
    <div className={classes.component}>
      <Form render={renderForm} onSubmit={onSubmit} />
      <Icon className={classes.image} />
    </div>
  );
};

export const CreateBeaconChain = () => {
  const dispatchCreateSidecar = useAction(UserActions.createSidecar);
  const classes = useCreateBeaconChainStyles();

  const handleSubmit = useCallback(() => {
    dispatchCreateSidecar();
  }, [dispatchCreateSidecar]);

  return (
    <section className={classes.section}>
      <Curtains classes={{ root: classes.wrapper }}>
        <BackgroundColorProvider className={classes.content}>
          <Mutation type={UserActionTypes.CREATE_SIDECAR}>
            {({ loading }) =>
              loading ? (
                <CreateBeaconChainProgress />
              ) : (
                <CreateBeaconChainComponent onSubmit={handleSubmit} />
              )
            }
          </Mutation>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};

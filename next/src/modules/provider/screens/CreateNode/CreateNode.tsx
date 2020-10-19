import React, { useCallback } from 'react';
import { useCreateNodeStyles } from './CreateNodeStyles';
import { Body2, Headline2 } from '../../../../UiKit/Typography';
import { t } from '../../../../common/utils/intl';
import { Icon } from './Icon';
import { Form, FormRenderProps } from 'react-final-form';
import { Button } from '../../../../UiKit/Button';
import { useAction } from '../../../../store/redux';
import { UserActions, UserActionTypes, } from '../../../../store/actions/UserActions';
import { Curtains } from '../../../../UiKit/Curtains';
import { BackgroundColorProvider } from '../../../../UiKit/BackgroundColorProvider';
import { Mutation } from '@redux-requests/react';
import { CreateNodeProgress } from './CreateNodeProgress';
import { success } from '@redux-requests/core';
import { useHistory } from 'react-router';
import { PROVIDER_NODES_PATH } from '../../../../common/const';
import { IReduxRequestActionResponse } from '../../../../common/types';

interface ICreateNodePayload {}

interface ICreateNodeProps {
  onSubmit(payload: ICreateNodePayload): void;
}

export const CreateNodeComponent = ({ onSubmit }: ICreateNodeProps) => {
  const classes = useCreateNodeStyles();

  const renderForm = ({ handleSubmit }: FormRenderProps<any>) => {
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <Headline2 component="span" color="primary" className={classes.title}>
          {t('provider.create.create-beacon-chain-stage-1.title')}
        </Headline2>
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

export const CreateNode = () => {
  const dispatchCreateSidecar = useAction(UserActions.createSidecar);
  const classes = useCreateNodeStyles();
  const history = useHistory();

  const handleSubmit = useCallback(() => {
    dispatchCreateSidecar().then((data: IReduxRequestActionResponse) => {
      if (data.action.type === success(UserActionTypes.CREATE_SIDECAR)) {
        history.replace(PROVIDER_NODES_PATH);
      }
    });
  }, [dispatchCreateSidecar]);

  return (
    <section className={classes.section}>
      <Curtains classes={{ root: classes.wrapper }}>
        <BackgroundColorProvider className={classes.content}>
          <Mutation type={UserActionTypes.CREATE_SIDECAR}>
            {({ loading }) =>
              loading ? (
                <CreateNodeProgress />
              ) : (
                <CreateNodeComponent onSubmit={handleSubmit} />
              )
            }
          </Mutation>
        </BackgroundColorProvider>
      </Curtains>
    </section>
  );
};

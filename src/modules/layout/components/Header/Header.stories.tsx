import BigNumber from 'bignumber.js';
import React from 'react';
import { Providers } from '../../../../common/types';
import { HeaderComponent } from './HeaderComponent';

const UnAuthorizedStory = () => {
  return <HeaderComponent isAuth={false} />;
};

export const UnAuthorized = () => <UnAuthorizedStory />;

const AuthorizedStory = () => {
  return (
    <HeaderComponent
      isAuth
      walletAddress="0x603366e08380EceB2E334621A27eeD36F34A9D50"
      walletType={Providers.metamask}
      ethereumBalance={new BigNumber(23.4536334)}
      ankrBalance={new BigNumber(10500.45)}
    />
  );
};

export const Authorized = () => <AuthorizedStory />;

export default {
  title: 'modules/Layout/components/Header',
};

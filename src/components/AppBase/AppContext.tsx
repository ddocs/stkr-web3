import React from 'react';

type Locale = 'en-US';

export interface IAppContext {
  locale: Locale;
}

export const AppContext = React.createContext<IAppContext>({ locale: 'en-US' });

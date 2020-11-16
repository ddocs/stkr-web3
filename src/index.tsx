import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TagManager from 'react-gtm-module';
import { REACT_APP_GOOGLE_TAG_MANAGER_KEY } from './common/const';

if (REACT_APP_GOOGLE_TAG_MANAGER_KEY) {
  const tagManagerArgs = {
    gtmId: REACT_APP_GOOGLE_TAG_MANAGER_KEY,
  };

  TagManager.initialize(tagManagerArgs);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

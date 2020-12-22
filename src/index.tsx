import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GOOGLE_TAG_MANAGER_KEY } from './common/const';
import ReactGA from 'react-ga';
import { historyInstance } from './common/utils/historyInstance';

if (GOOGLE_TAG_MANAGER_KEY) {
  ReactGA.initialize(GOOGLE_TAG_MANAGER_KEY, { standardImplementation: true });
  historyInstance.listen(location => {
    ReactGA.pageview(location.pathname + location.search);
  });
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

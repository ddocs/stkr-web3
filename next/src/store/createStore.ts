import { applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { rootSaga } from './effects';
import { createRootReducer } from './reducers';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/promise';
import { History } from 'history';

export interface ApplicationStore {
  store: Store;
  saga: any;
}

export const persistApplicationStore = ({ store }: ApplicationStore) => {
  return persistStore(store);
};

export const runApplicationStore = ({ saga }: ApplicationStore) => {
  saga.run(rootSaga);
};

export const createApplicationStore = ({
  history,
}: {
  history: History;
}): ApplicationStore => {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver({
      processResponse: response => ({ data: response }),
    }),
  });

  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          trace: true,
          traceLimit: 25,
        })
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(
      ...requestsMiddleware,
      routerMiddleware(history),
      sagaMiddleware,
    ),
  );

  const store = createStore(
    createRootReducer(history, requestsReducer),
    enhancer,
  );

  return { store, saga: sagaMiddleware };
};

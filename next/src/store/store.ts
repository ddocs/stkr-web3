import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import { rootSaga } from './effects';
import { createRootReducer } from './reducers';
import { historyInstance } from '../common/utils/historyInstance';

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
    routerMiddleware(historyInstance),
    sagaMiddleware,
  ),
);

const store = createStore(createRootReducer(historyInstance), enhancer);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };

import { historyInstance } from '../common/utils/historyInstance';
import {
  createApplicationStore,
  persistApplicationStore,
  runApplicationStore,
} from './createStore';

const appStore = createApplicationStore({ history: historyInstance });

const persistor = persistApplicationStore(appStore);
runApplicationStore(appStore);
const { store } = appStore;

export { store, persistor };

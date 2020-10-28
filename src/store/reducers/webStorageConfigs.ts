import storage from 'redux-persist/lib/storage';

export const userPersistConfig = {
  key: 'user',
  storage: storage,
  blacklist: ['isConnected'],
};

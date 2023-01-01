import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import userReducer from './userReducer';

import storage from 'redux-persist/lib/storage';
import utilReducer from './utilReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: userReducer,
  util: utilReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

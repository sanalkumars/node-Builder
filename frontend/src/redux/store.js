import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice.js';
// if we have multiple reducer then user combain reducer sample codebelow
// const rootReducer = combineReducers({
//     user: userReducer,
//     theme: themeReducer,
//   });

// Configuration for redux-persist
const persistConfig = {
    key:'root',
    storage,
    version:1,
  };

  const persistedReducer = persistReducer(persistConfig,userReducer);

  const store = configureStore({
    reducer: {
      user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  export const persistor = persistStore(store);
  export default store;
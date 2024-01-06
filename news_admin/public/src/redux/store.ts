import { configureStore , combineReducers} from "@reduxjs/toolkit";
import userReducer from "./userRedux/usersSlice";
import locationReducer from "./locationRedux/locationSlice";

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
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const persistedReducer = persistReducer(persistConfig, userReducer)

  const rootReducer = combineReducers({ user: persistedReducer, location: locationReducer });

  
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
   ,
   devTools: true
  })
  
export let persistor = persistStore(store);


// const store = configureStore({
//     reducer: {
//         user: userReducer,
//     }
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type PersistorState = ReturnType<typeof persistor.getState>;

export default store;
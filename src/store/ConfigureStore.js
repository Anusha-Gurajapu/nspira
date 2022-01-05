import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
};
const reducer = persistReducer(persistConfig, reducers);
const store = createStore(reducer, applyMiddleware(...[thunk, createLogger]));
const persistor = persistStore(store);

export { store, persistor };

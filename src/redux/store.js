import { authReducer } from './auth/slice';
import { waterReducer } from './water/slice';
import { usersReducer } from './users/slice';

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { globalReducer } from './global/slice';

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'refreshToken'],
};

const waterPersistConfig = {
    key: 'water',
    storage,
    whitelist: [
        'selectedDate',
        'selectedDateData',
        'selectedMonth',
        'monthData',
        'toggleInfo',
    ],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedWaterReducer = persistReducer(waterPersistConfig, waterReducer);

export const store = configureStore({
    reducer: {
        global: globalReducer,
        auth: persistedAuthReducer,
        water: persistedWaterReducer,
        users: usersReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

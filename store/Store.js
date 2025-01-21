// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import auth from './UserSlice'
import activation from './ActivationSlice'

export const store = configureStore({
    reducer: {
        // Add your reducers here
        auth,
        activation
    },
});

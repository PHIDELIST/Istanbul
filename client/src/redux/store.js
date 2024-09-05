import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profileSlice';
import authReducer from './authSlice';
const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
  },
});

export default store;

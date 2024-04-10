import { configureStore } from '@reduxjs/toolkit';
import signupRed from '../features/auth/authSlice';
import loginReducer from '../features/auth/loginSlice';
import userReducer from '../features/reducers.js/reducer';
import logoutReducer from '../features/auth//logoutSlice'


const store = configureStore({
  reducer: {
    auth: signupRed,
    loginUserData:loginReducer,
    userReducer: userReducer,
    logout: logoutReducer,
  },
  
});

export default store;

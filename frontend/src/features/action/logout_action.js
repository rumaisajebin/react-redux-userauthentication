// logout_action.js
import axios from 'axios';
import { logout } from '../auth/logoutSlice'; 

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const logoutAsync = (userId) => async (dispatch) => {
  try {
    dispatch(logout()); 
    dispatch({ type: LOGOUT_REQUEST });

    
    const response = await axios.post(`http://localhost:8000/api/user_logout/${userId}/`);
    console.log('Response:', response);
    console.log('Data:', response.data); 

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.error('Error:', error); 

    dispatch({
      type: LOGOUT_FAILURE,
      payload: error.response ? error.response.data.message || 'Error occurred during logout' : 'Network error',
    });
  }
};

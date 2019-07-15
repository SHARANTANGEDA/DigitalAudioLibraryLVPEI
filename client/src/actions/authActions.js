import {
  CLEAR_ERRORS,
  ENTER_OTP,
  ENTER_PASSWORD,
  GET_ERRORS,
  GET_LANDING_CATALOGUE,
  GET_LANDING_HOME,
  HOME_LOADING,
  NO_FILES,
  SET_AUTH_LOADING,
  SET_CURRENT_USER
} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//Register User
export const registerUser = (userData) => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/superAdmin/register', userData)
    .then(res => {
      window.location='/dashboard'
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
};

export const registerWorld = (userData) => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/users/register', userData)
    .then(res => {
      const {token} = res.data;
      localStorage.setItem('jwtToken',token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

//Login User
export const loginUser = userData => dispatch => {
  dispatch(clearErrors())
  dispatch(setLoading())
  axios.post('/api/users/login',userData)
    .then(res => {
      //Saving to Local Storage
      const {token} = res.data;
      localStorage.setItem('jwtToken',token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));

    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
     );
};
export const getAllBooks = () => dispatch => {
  dispatch(setAuthLoading())
  axios.get('/api/users/home').then(res => {
    dispatch({
      type: GET_LANDING_HOME,
      payload: res.data
    })
  }).catch(err => {
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  })
}

export const getCatalogue = () => dispatch => {
  dispatch(setAuthLoading())
  axios.get('/api/users/catalogue').then(res => {
    dispatch({
      type: GET_LANDING_CATALOGUE,
      payload: res.data
    })
  }).catch(err => {
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  })
}

export const confirmEmail = (userData) => dispatch => {
  axios.post('/api/users/verifyEmail', userData).then(res => {
    const {token} = res.data;
    localStorage.setItem('jwtToken',token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    window.location.href='/dashboard'
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}

export const sendOTPEmail = (userData) => dispatch => {
  axios.post('/api/users/resetPasswordSend', userData).then(res => {
    if(res.data.sent) {
      dispatch({
        type: ENTER_OTP
      })
    }

  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}

export const enterOTPEmail = (userData) => dispatch => {
  axios.post('/api/users/resetPasswordReceive', userData).then(res => {
    const {token} = res.data;
    localStorage.setItem('jwtToken',token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    dispatch({ type:ENTER_PASSWORD })
    // window.location.href='/dashboard'
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}

export const resetPassword = (userData) => dispatch => {
  axios.post('/api/users/resetPasswordEnter', userData).then(res => {
    window.location.href='/dashboard'
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
}

export const setLoading = () => {
  return {
    type: HOME_LOADING
  };
};

export const setAuthLoading = () => {
  return {
    type: SET_AUTH_LOADING
  };
};
//Set Logged in User
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}
//Log User Out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}
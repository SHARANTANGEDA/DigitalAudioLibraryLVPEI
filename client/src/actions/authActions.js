import { GET_ALL_DEPARTMENTS, GET_ERRORS, GET_ERRORS_IN_APPLICATIONS, LOADING, SET_CURRENT_USER } from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const getDepartments = () => dispatch => {
  console.log("Started Loading Ta applications page")
  dispatch(setLoading());
  console.log("In all applications actions")

  axios
    .get(`/api/department/allDepartments`)
    .then(res =>
      dispatch({
        type: GET_ALL_DEPARTMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_IN_APPLICATIONS,
        payload: err.data
      })
    );
}
//Register User
export const registerUser = (userData,history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))//TODO Write for jwt token here
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
};

//Login User
//`file://${path.join(__dirname, '../build/index.html')}`
export const loginUser = userData => dispatch => {
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
      }));
};
export const setLoading = () => {
  return {
    type: LOADING
  };
};
//Set Logged in User
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};

//Log User Out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}
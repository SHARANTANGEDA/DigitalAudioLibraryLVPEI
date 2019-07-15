import axios from 'axios'

import {
  CLEAR_ERRORS,
  GET_ACTIVE,
  GET_ERRORS,
  GET_INACTIVE,
  GET_LVPEI_USERS,
  GET_REPORT_DATA,
  ON_POST_FAIL,
  REPORT_LOADING,
  VIEW_LOADING
} from './types'

export const addDiagnostics = (userData) => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/superAdmin/addDiagnostic', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const getReportData = () => dispatch => {
  dispatch(reportLoading())
  axios.get('/api/superAdmin/getReports')
    .then(res => {
      dispatch({
        type:GET_REPORT_DATA,
        payload: res.data
      })
    }).catch(err => {
      console.log(err)
  })
}



export const ControlLvpeiUsers = () => dispatch => {
  dispatch(setLoading())
  axios.get('/api/superAdmin/lvpeiUsers').then(res => {
    dispatch({
      type:GET_LVPEI_USERS,
      payload: res.data
    })
  }).catch(err => {
    console.log(err)})
}

export const InactiveLVPEIUsers = () => dispatch => {
  dispatch(setLoading())
  axios.get('/api/superAdmin/deAssignedUsers').then(res => {
    dispatch({
      type:GET_LVPEI_USERS,
      payload: res.data
    })
  }).catch(err => {
    console.log(err)})
}

export const removeDiagAccess = (userData) => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/superAdmin/removeAccess', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const grantDiagAccess = (userData) => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/superAdmin/grantAccess', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const removeUserAccess = (userData) => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/superAdmin/removeLVPEIAccess', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const grantUserAccess = (userData) => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/superAdmin/grantLVPEIAccess', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};


export const deleteLVPEIUser = (userData) => dispatch => {
  dispatch(clearErrors())
  axios.post('/api/superAdmin/deleteLVPEIUser', userData)
    .then(res => {
      window.location.href='/dashboard'
    }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const activeCentres = () => dispatch => {
  dispatch(setLoading())
  axios.get('/api/superAdmin/activeCentres')
    .then(res => {
      dispatch({
        type: GET_ACTIVE,
        payload: res.data
      })
  }).catch(err =>
    dispatch({
    type: ON_POST_FAIL,
    payload: null
  }))
}

export const removedCentres = () => dispatch => {
  dispatch(setLoading())
  axios.get('/api/superAdmin/inactiveDiags')
    .then(res => {
      dispatch({
        type: GET_INACTIVE,
        payload: res.data
      })
    }).catch(err =>{
    console.log(err)
    dispatch({
      type: ON_POST_FAIL,
      payload: null
    })})
}

export const setLoading = () => {
  return {
    type: VIEW_LOADING
  };
};
export const reportLoading = () => {
  return {
    type: REPORT_LOADING
  };
};
// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

import axios from 'axios'

import {
  CLEAR_ERRORS,
  FOLDER_LOADING,
  GET_ACTIVE,
  GET_FAV_BOOKS,
  GET_FILES,
  GET_NAME_RESULTS,
  GET_PATIENTS_HOME,
  GET_SA_HOME,
  GET_SEARCH_RESULTS,
  HOME_LOADING,
  NO_FILES,
  ON_POST_FAIL,
  SEARCH_LOADING,
  VIEW_LOADING
} from './types'

export const getWorldHome = () => dispatch => {
  dispatch(setLoading())
  dispatch(homeLoading())
  axios.get('/api/users/home').then(res => {
    dispatch({
      type: GET_PATIENTS_HOME,
      payload: res.data
    })
  }).catch(err =>
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  )
}
export const getSADetails = () => dispatch => {
  dispatch(homeLoading())
  axios.get('/api/superAdmin/home',)
    .then(res => {
      dispatch({
        type: GET_SA_HOME,
        payload: res.data
      })
    }).catch(err =>
    dispatch({
      type: ON_POST_FAIL,
      payload: null
    })
  )
}
export const deleteFile = (id) => dispatch => {
  axios.get(`/api/upload/deleteFile/${id}`).then(res => {
    console.log(res)
    window.location.reload()
  }).catch(err =>
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  )
}

export const deleteFolder = (id) => dispatch => {
  axios.get(`/api/upload/deleteFolder/${id}`).then(res => {
    console.log(res)
    window.location.reload()
  }).catch(err =>
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  )
}

export const deletePatient = (id) => dispatch => {
  axios.get(`/api/upload/deletePatient/${id}`).then(res => {
    console.log(res)
    window.location.reload()
  }).catch(err =>
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  )
}

export const downloadFile = (id) => dispatch => {
  axios.get(`/api/upload/downloadFile/${id}`, { responseType: 'blob' }).then(res => {
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'octet/stream' }))
    const link = document.createElement('a')
    console.log(url)
    link.href = url
    link.setAttribute('download', id.substr(id.lastIndexOf(';') + 1, id.length))
    document.body.appendChild(link)
    link.click()
  }).catch(err =>
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  )
}

export const downloadFolder = (id) => dispatch => {
  console.log('In download folder')
  axios.get(`/api/upload/downloadFolder/${id}`, { responseType: 'blob' }).then(res => {
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    console.log(url)
    link.href = url
    link.setAttribute('download', id + '.zip')
    document.body.appendChild(link)
    link.click()
    window.location.href = '/dashboard'
  }).catch(err =>
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  )
}

export const getAudioBook = (id) => dispatch => {
  dispatch(setLoading())
  dispatch(homeLoading())
  axios.get(`/api/upload/folders/${id}`).then(res => {
    dispatch({
      type: GET_FILES,
      payload: res.data
    })
  }).catch(err =>
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  )
}

export const favourite=(id) => dispatch => {
  axios.get(`/api/upload/favourite/${id}`)
    .then(res => {

    }).catch(err =>
    console.log(err)
  )
}

export const unFavourite=(id) => dispatch => {
  axios.get(`/api/upload/unFavourite/${id}`)
    .then(res => {

    }).catch(err =>
    console.log(err)
  )
}
export const addRating = (id, rating) => dispatch => {
  axios.get(`/api/upload/addRating/${id}/${rating}`)
    .then(res => {

    }).catch(err =>
    console.log(err)
  )
}

export const getPlays = (id) => dispatch => {
  axios.get(`/api/users/addPlay/${id}`)
    .then(res => {
      window.location.href=`/audioBook/${id}`
    }).catch(err => {
    console.log({success: false})
    })
}


export const getFavBooks = () => dispatch => {
  console.log('here')
  axios.get(`/api/users/getFavBooks`)
    .then(res => {
      dispatch({
        type: GET_FAV_BOOKS,
        payload: res.data
      })
    }).catch(err => {
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  })
}
export const getReports = () => dispatch => {
  axios.get(`/api/superAdmin/downloadExcel`, { responseType: 'arraybuffer' })
    .then(res => {
      console.log(res)
      const url = window.URL.createObjectURL(new Blob([res.data],
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
      const link = document.createElement('a')
      console.log(url)
      link.href = url
      link.setAttribute('download', 'UsageReports.xlsx')
      document.body.appendChild(link)
      link.click()
    }).catch(err => {
      dispatch({
      type: NO_FILES,
      payload: err.data
    })
  })
}

export const changeRating = (id, rating) => dispatch => {
  axios.get(`/api/upload/changeRating/${id}/${rating}`)
    .then(res => {

    }).catch(err =>
    console.log(err)
  )
}


export const getSearchResults = (data) => dispatch => {
  dispatch(setSearchLoading())
  dispatch(homeLoading())
  axios.post(`/api/users/search`, data).then(res => {
    dispatch({
      type: GET_SEARCH_RESULTS,
      payload: res.data
    })
  }).catch(err =>
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  )
}
export const getNameResults = (data) => dispatch => {
  dispatch(setSearchLoading())
  dispatch(homeLoading())
  axios.get(`/api/users/searchName/${data}`).then(res => {
    console.log({result: res})
    dispatch({
      type: GET_NAME_RESULTS,
      payload: res.data
    })
  }).catch(err =>
    console.log({sErr: err})
    // dispatch({
    //   type: GET_SEARCH_ERRORS,
    //   payload: err.data
    // })
  )
}


export const downloadSelectedFiles = (id) => dispatch => {
  console.log('In download folder')
  axios.get(`/api/upload/downloadSelected/${id}`, { responseType: 'blob' }).then(res => {
    console.log(res)
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    console.log(url)
    link.href = url
    link.setAttribute('download',
      id + '.zip')
    document.body.appendChild(link)
    link.click()
    window.location.reload()
  }).catch(err =>
    dispatch({
      type: NO_FILES,
      payload: err.data
    })
  )
}

export const displayDicom = (id) => dispatch => {
  dispatch(viewLoading())

  axios.post('/api/upload/displayDicom', id, {responseType: 'arraybuffer'}).then(res => {
    console.log(res)
    dispatch({
      type: GET_ACTIVE,
      payload: res
    })
  }).catch(err => {
      dispatch({
        type: ON_POST_FAIL,
        payload: null
      })
    }
  )
}

export const pinFile = (id) => dispatch => {
  axios.post(`/api/upload/pinFile`,id).then(res => {
    console.log(res.data)
  }).catch(err =>
    {console.log(err)}
  )
}
export const unPinFile = (id) => dispatch => {
  axios.post(`/api/upload/unPinFile`,id).then(res => {
    console.log(res.data)
  }).catch(err =>
    {console.log(err)}
  )
}

export const setLoading = () => {
  return {
    type: FOLDER_LOADING
  }
}

export const viewLoading = () => {
  return {
    type: VIEW_LOADING
  }
}
export const homeLoading = () => {
  return {
    type: HOME_LOADING
  }
}

export const setSearchLoading = () => {
  return {
    type: SEARCH_LOADING
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

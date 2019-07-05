import { GET_LANDING_HOME, SET_AUTH_LOADING, SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initialState = {
  isAuthenticated: false,
  user: {},
  land: null,
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
        land: false
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case GET_LANDING_HOME:
      return {
        ...state,
        land: action.payload,
        loading: false
      }

    default:
      return state;
  }
}
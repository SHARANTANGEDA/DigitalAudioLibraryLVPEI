import { GET_LANDING_CATALOGUE, GET_LANDING_HOME, SET_AUTH_LOADING, SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initialState = {
  isAuthenticated: false,
  user: {},
  land: null,
  cat: null,
  loading2: true,
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
        land: null,
        cat: null,
        loading2: true
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
    case GET_LANDING_CATALOGUE:
      return {
        ...state,
        cat: action.payload,
        loading2: false
      }
    default:
      return state;
  }
}
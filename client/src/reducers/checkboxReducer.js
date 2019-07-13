import {
  CHECK_BOX_EVENT,
  CHECK_BOX_LOADING,
  GET_DA_HOME,
  GET_DIAG_USER_HOME,
  GET_INVALID_MR,
  GET_MR,
  GET_PATIENT_DETAILS,
  GET_SA_HOME,
  HOME_LOADING
} from '../actions/types'

const initialState = {
  selected: [],
  loading: true,
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case CHECK_BOX_LOADING:
      return {
        ...state,
        loading: true,
        selected: [],

      }
    case CHECK_BOX_EVENT:
      return {
        ...state,
        selected: action.payload,
        loading: false
      }
    default:
      return state;

  }
}

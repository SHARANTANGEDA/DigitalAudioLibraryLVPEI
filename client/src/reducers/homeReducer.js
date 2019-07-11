import {
  GET_DA_HOME,
  GET_DIAG_USER_HOME,
  GET_INVALID_MR,
  GET_MR,
  GET_PATIENT_DETAILS,
  GET_SA_HOME,
  HOME_LOADING
} from '../actions/types'

const initialState = {
  home: null,
  loading: true,
  loading2: true,
  loading3: true,
  loading4:true,
  diagUserHome:null,
  patientData: null,
  invalid: false
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case HOME_LOADING:
      return {
        ...state,
        loading: true,
        loading2:true,
        loading3: true,
        loading4: true,
        home: null,
        patientData: null,
        diagUserHome: null,
        invalid: false
      }
    case GET_MR:
      return {
        ...state,
        mid: action.payload,
        loading3: false
      }
    case GET_INVALID_MR:
      return {
        ...state,
        patientData: action.payload,
        loading2: false,
        invalid: true
      }
    case GET_PATIENT_DETAILS:
      return {
        ...state,
        patientData: action.payload,
        loading2: false
      }
    case GET_SA_HOME:
      return {
        ...state,
        home: action.payload,
        loading: false
      }
    case GET_DA_HOME:
      return {
        ...state,
        home: action.payload,
        loading: false
      }
    case GET_DIAG_USER_HOME:
      return {
        ...state,
        diagUserHome: action.payload,
        loading4: false
      }

    default:
      return state;

  }
}

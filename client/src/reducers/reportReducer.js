import {
  REPORT_LOADING, GET_REPORT_DATA
} from '../actions/types'

const initialState = {
  loading: true,
  report: null,
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case REPORT_LOADING:
      return {
        ...state,
        loading: true,
        report: null,
      }
    case GET_REPORT_DATA:
      return {
        ...state,
        report: action.payload,
        loading: false
      }
    default:
      return state;

  }
}

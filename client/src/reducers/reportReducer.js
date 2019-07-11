import { GET_FAV_BOOKS, GET_REPORT_DATA, REPORT_LOADING } from '../actions/types'

const initialState = {
  loading: true,
  report: null,
  loading2: true,
  getFav: null
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case REPORT_LOADING:
      return {
        ...state,
        loading: true,
        loading2: true,
        report: null,
        getFav: null
      }
    case GET_REPORT_DATA:
      return {
        ...state,
        report: action.payload,
        loading: false
      }
    case GET_FAV_BOOKS:
      return {
        ...state,
        getFav: action.payload,
        loading2: false
      }
    default:
      return state;

  }
}

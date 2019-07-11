import { ACCOUNT_LOADING, GET_ACCOUNT_DETAILS, GET_BOOK_DETAILS, } from '../actions/types'

const initialState = {
  loading: true,
  details: null,
  loading2: true,
  book: null
};

export default function(state = initialState, action) {
  // console.log({'File Reducer':action.payload});
  switch (action.type) {
    case ACCOUNT_LOADING:
      console.log("IN Account Reducer loading")
      return {
        ...state,
        loading: true,
        details: null,
        book: null,
        loading2: true
      }
    case GET_ACCOUNT_DETAILS:
      return {
        ...state,
        details: action.payload,
        loading: false,
      };
    case GET_BOOK_DETAILS:
      return {
        ...state,
        book: action.payload,
        loading2: false,
      }
    default:
      return state;

  }
}

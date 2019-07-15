import { CHECK_BOX_EVENT, CHECK_BOX_LOADING } from '../actions/types'

const initialState = {
  selected: [],
  size:0,
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
        size:0
      }
    case CHECK_BOX_EVENT:
      return {
        ...state,
        selected: action.payload,
        loading: false,
        size:0
      }
    default:
      return state;

  }
}

import { GET_ACTIVE, GET_INACTIVE, GET_LVPEI_USERS, VIEW_LOADING } from '../actions/types'

const initialState = {
  active: null,
  loading: true,
  loading2: true,
  inActive: null,
  loading3: true,
  lvpUsers: null
};

export default function(state = initialState, action) {
  // console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case VIEW_LOADING:
      return {
        ...state,
        loading: true,
        loading2:true,
        active: null,
        inActive: null,
        loading3: true,
        lvpUsers: null
      }

    case GET_ACTIVE:
      return {
        ...state,
        active: action.payload,
        loading: false
      }
    case GET_INACTIVE:
      return {
        ...state,
        inActive: action.payload,
        loading2: false
      }
    case GET_LVPEI_USERS:
      return {
        ...state,
        lvpUsers: action.payload,
        loading3: false
      }
    default:
      return state;

  }
}

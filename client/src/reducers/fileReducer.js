import {
  FOLDER_LOADING,
  GET_FILES,
  GET_FILES_SINGLE_FOLDER,
  GET_PATIENTS_HOME,
  NO_FILES,
  NO_FILES_IN_FOLDER,
} from '../actions/types'

const initialState = {
  folders: [],
  notFound:true,
  loading: true,
  files: null,
  patients: []
};

export default function(state = initialState, action) {
  // console.log({'File Reducer':action.payload});
  switch (action.type) {
    case FOLDER_LOADING:
      console.log("IN File Reducer loading")
      return {
        ...state,
        loading: true,
        notFound: true,
        folders: null,
        files: null
      }
    case GET_PATIENTS_HOME:
      return {
        ...state,
        patients: action.payload,
        notFound: false,
        loading: false,
        files: null,
        folders: null
      };
    case GET_FILES:
      return {
        ...state,
        folders: action.payload,
        notFound: false,
        loading: false,
        files: null
      };
    case NO_FILES:
      return {
        ...state,
        notFound: true,
        loading: false,
        files: null
      };
    case GET_FILES_SINGLE_FOLDER:
      return {
        ...state,
        files: action.payload,
        loading: false,
        notFound: false
      };
    case NO_FILES_IN_FOLDER:
      return {
        ...state,
        notFound: true,
        loading: false,
        files: null
      };
    default:
      return state;

  }
}

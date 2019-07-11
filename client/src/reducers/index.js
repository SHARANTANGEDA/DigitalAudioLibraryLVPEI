import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import homeReducer from './homeReducer'
import fileReducer from './fileReducer'
import searchReducer from './searchReducer'
import viewCentreReducer from './viewCentreReducer'
import accountReducer from './accountReducer'
import reportReducer from './reportReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  home: homeReducer,
  folder: fileReducer,
  search: searchReducer,
  view: viewCentreReducer,
  account: accountReducer,
  report: reportReducer
})
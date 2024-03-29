import React, { Component } from 'react'
import './App.css'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { logoutUser, setCurrentUser } from './actions/authActions'
import { Provider } from 'react-redux'
import store from './store'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ContactUs from './components/common/ContactUs'

import Routes from './components/common/Routes/Routes'
import Login from './components/layout/Login'
import Register from './components/layout/Register'
// import Footer from './components/layout/Footer'
import ForgotPassword from './components/layout/ForgotPassword'
import PublicCatalogue from './components/PublicHome/PublicCatalogue'
import FilterLanding from './components/layout/FilterLanding'
import SearchResults from './components/dashboard/SearchResults'


//Check for token
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App w-100">
        <NavBar/>
        <Switch>
        <Route exact path="/home" component={Landing}/>
          <Route exact path='/' component={Login}/>
          <Route exact path='/forgotPassword' component={ForgotPassword}/>
          <Route exact path='/dal_register' component={Register}/>
          <Route exact path='/contactUs' component={ContactUs}/>
          <Route exact path='/browse' component={PublicCatalogue}/>
          <Route exact path="/home/:id" component={FilterLanding}/>
          <Route exact path="/search/:category/:search" component={SearchResults}/>
          <Route component={Routes}/>
        </Switch>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../../dashboard/Dashboard'
import ChangePassword from '../../MyAccount/ChangePassword'
import DisplayFolder from '../../display/Folders/DisplayFolder'
import Display from '../../display/Files/Display'
import CreateUsers from '../../MyAccount/CreateUsers'
import AddDiagnosticCentre from '../../SuperAdmin/AddDiagnosticCentre'
import NotFound from '../../layout/NotFound'
import SearchNotFound from '../../layout/SearchNotFound'
import ActiveCentres from '../../SuperAdmin/ActiveCentres'
import RemovedCentres from '../../SuperAdmin/RemovedCentres'
import UploadForm from '../../upload/UploadForm'
import NameSearchResults from '../../dashboard/NameSearchResults'
import ManageLVPEIUsers from '../../SuperAdmin/ManageLVPEIUsers'
import ReAssignLVPUsers from '../../SuperAdmin/ReAssignLVPUsers'
import EditProfile from '../../MyAccount/EditProfile'
import ManageDiagUsers from '../../diagAdmin/ManageDiagUsers'
import ReAssignDiagUsers from '../../diagAdmin/ReAssignDiagUsers'
import DisplaySelected from '../../display/Files/DisplaySelected'
import Login from '../../layout/Login'
import AudioBook from '../../dashboard/AudioBook'

const Routes = () => {
  return (

    <div className="container-fluid w-100" style={{width:'100%'}}>
      <Switch>
        {/*<Switch>*/}
        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        {/*</Switch>*/}
        {/*  <Switch>*/}
        <PrivateRoute exact path='/changePassword' component={ChangePassword}/>
        {/*  </Switch>*/}
        {/*<Switch>*/}
        <PrivateRoute exact path='/displayFolder/:id' component={DisplayFolder}/>
        {/*</Switch>*/}
        {/*<Switch>*/}
        <PrivateRoute exact path='/displayFolder/displayFiles/:id' component={Display}/>
        {/*</Switch>*/}
        {/*<Switch>*/}
        <PrivateRoute exact path='/createUser' component={CreateUsers}/>
        {/*</Switch>*/}
        {/*<Switch>*/}
        <PrivateRoute exact path='/addDiagnosticCentre' component={AddDiagnosticCentre}/>
        {/*</Switch>*/}
        {/*<Switch>*/}
=        <PrivateRoute exact path='/detailsNotFound' component={SearchNotFound}/>
        <PrivateRoute exact path='/activeCentres' component={ActiveCentres}/>
        <PrivateRoute exact path='/removedCentres' component={RemovedCentres} />
        <PrivateRoute exact path='/uploadForm' component={UploadForm}/>
        <PrivateRoute exact path='/nameSearchResults/:id' component={NameSearchResults}/>
        <PrivateRoute exact path='/activeLVP' component={ManageLVPEIUsers}/>
        <PrivateRoute exact path='/deAssignedLVP' component={ReAssignLVPUsers}/>
        <PrivateRoute exact path='/editProfile' component={EditProfile}/>
        <PrivateRoute exact path='/activeUser' component={ManageDiagUsers}/>
        <PrivateRoute exact path='/deAssignedUser' component={ReAssignDiagUsers}/>
        <PrivateRoute exact path='/displayFolder/displaySelectedFiles/:id' component={DisplaySelected}/>
        <PrivateRoute exact path='/audioBook/:id' component={AudioBook}/>
        {/*</Switch>*/}
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
)}

export default Routes
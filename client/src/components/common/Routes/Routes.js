import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../../dashboard/Dashboard'
import ChangePassword from '../../MyAccount/ChangePassword'
import CreateUsers from '../../MyAccount/CreateUsers'
import NotFound from '../../layout/NotFound'
import UploadForm from '../../upload/UploadForm'
import EditProfile from '../../MyAccount/EditProfile'
// import ReAssignDiagUsers from '../../diagAdmin/ReAssignDiagUsers'
import AudioBook from '../../dashboard/AudioBook'
import Report from '../../SuperAdmin/Report'
import GetFavourites from '../../dashboard/GetFavourites'
import ManageLVPEIUsers from '../../SuperAdmin/ManageLVPEIUsers'
import ReAssignLVPUsers from '../../SuperAdmin/ReAssignLVPUsers'
import BooksMaster from '../../LVPAdmin/BooksMaster'
import AllRecords from '../../dashboard/AllRecords'
import GrantBookMaster from '../../LVPAdmin/GrantBookMaster'

const Routes = () => {
  return (

    <div className="container-fluid w-100" style={{width:'100%'}}>
      <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard}/>
        <PrivateRoute exact path='/changePassword' component={ChangePassword}/>
        <PrivateRoute exact path='/createUser' component={CreateUsers}/>
        {/*<PrivateRoute exact path='/detailsNotFound' component={SearchNotFound}/>*/}
        <PrivateRoute exact path='/uploadForm' component={UploadForm}/>
        {/*<PrivateRoute exact path='/nameSearchResults/:id' component={NameSearchResults}/>*/}
        <PrivateRoute exact path='/editProfile' component={EditProfile}/>
        {/*<PrivateRoute exact path='/deAssignedUser' component={ReAssignDiagUsers}/>*/}
        <Route exact path='/audioBook/:id' component={AudioBook}/>
        <PrivateRoute exact path='/report' component={Report}/>
        <PrivateRoute exact path='/activeLVP' component={ManageLVPEIUsers}/>
        <PrivateRoute exact path='/deAssignedLVP' component={ReAssignLVPUsers}/>
        <PrivateRoute exact path='/favourites' component={GetFavourites}/>
        <PrivateRoute exact path='/lvpBooks' component={BooksMaster}/>
        <PrivateRoute exact path='/dashboard/:id' component={AllRecords}/>
        <PrivateRoute exact path='/grantBookAccess' component={GrantBookMaster}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
)}

export default Routes
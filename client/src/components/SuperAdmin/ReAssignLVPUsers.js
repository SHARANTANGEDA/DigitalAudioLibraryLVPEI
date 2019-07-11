import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import './scroll.css'
import ShowTable from '../SuperAdmin/tableDisplay/ShowTable'
import Spinner from '../common/Spinner'
import { InactiveLVPEIUsers } from '../../actions/sAActions'

class ManageLVPEIUsers extends Component {
  componentDidMount () {
    this.props.InactiveLVPEIUsers(this.props.match.params.id)
  }

  render () {
    let { loading3, lvpUsers} = this.props.view
    if (loading3 || lvpUsers===null) {
      return (
        <Spinner/>
      )
    } else {
      console.log(lvpUsers)
      return (
        <div className='deAssignedLVP' style={{minWidth:'100%'}}>
          <div className='row col-md-12 d-flex justify-content-between'>
            <div className="table-wrapper-scroll-y my-custom-scrollbar col-md-12">
              <h4 className='text-center' style={{
                borderStyle: 'solid', borderWidth: '2px', background: 'green', color: 'white'
                , borderRadius: '2px'
              }}>L V Prasad Users Access Control</h4>
              <table className="table table-bordered table-striped mb-0">
                <thead>
                <tr>
                  <th scope="col" style={{fontSize:'10pt'}}>Username</th>
                  <th scope="col" style={{fontSize:'10pt'}}>Full Name</th>
                  <th scope="col" style={{fontSize:'10pt'}}>Created On Date</th>
                  <th scope="col" style={{fontSize:'10pt'}}>Created at Time</th>
                  <th scope="col" style={{fontSize:'10pt'}}>Edit Details</th>
                  <th scope="col" style={{fontSize:'10pt'}}>Manage</th>
                </tr>
                </thead>
                <tbody>
                <ShowTable data={lvpUsers} index={{ type: 'lvpei' }}/>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
  }
}

ManageLVPEIUsers.propTypes = {
  auth: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  InactiveLVPEIUsers: PropTypes.func.isRequired

}
const mapStateToProps = state => ({
  auth: state.auth,
  view: state.view
})
export default connect(mapStateToProps,{InactiveLVPEIUsers})(ManageLVPEIUsers)
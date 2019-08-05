import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NotFound from '../layout/NotFound'
class PBIAnalysis extends Component {
  render () {
    let content;
    if(this.props.auth.user.role==='lvpei' || this.props.auth.user.role==='super_admin') {
      content= (
        <div className="displayFolder container-fluid" style={{minWidth:'100%', padding: '0px'}}>
          <div className="App-content row d-flex justify-content-center col-md-12" >

            <h1 className='text-center'>Usage Analysis</h1>
            <div className='col-md-12 d-flex justify-content-center'>
              <h1>Add Your PBI iframe instead of this to display</h1>
            </div>

          </div>

        </div>
      )
    }else {
      content=(<NotFound/>)
    }
    return (
      <div className='bookMaster'>
        {content}
      </div>
    );
  }
}

PBIAnalysis.propTypes = {
  auth: PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(PBIAnalysis)

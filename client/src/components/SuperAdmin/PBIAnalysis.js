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
              <iframe width="1000" height="700"
                      src="https://app.powerbi.com/view?r=eyJrIjoiMzcwZTQ3MzUtOWM4OS00YjJiLTkyZjQtMTIyMGMzOWY5ZTIzIiwidCI6ImY3ODM3NzBhLWM0ZjgtNDg4NS1hMTg0LWVlNTExYTgzMzcxMSIsImMiOjEwfQ%3D%3D"
                      frameBorder="0" allowFullScreen="true"></iframe>

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

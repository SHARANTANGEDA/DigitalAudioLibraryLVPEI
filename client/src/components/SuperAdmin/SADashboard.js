import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import './scroll.css'
import Card from 'react-bootstrap/Card'
import Spinner from '../common/Spinner'

class SADashboard extends Component {
  render () {
    let { lvpei, diag_admin, centre, diagLen , patientsLen, CTS, MRIS,
      CTA,MRIA,PETS, USGA, BT} = this.props.home
    if (this.props.home.lvpei === null || this.props.home.centre === null ||
      this.props.home.diag_admin === null || this.props.home.diagLen === null) {
      return (
        <Spinner/>
      )
    } else {
      return (
        <div className=' ' style={{minWidth:'100%', minHeight:'100%'}}>
          <div className='row d-flex justify-content-between' style={{margin: '5px'}}>
              <Card style={{
                backgroundColor: '#f44336', marginRight: '20px', padding:'5px', minWidth:'250px'//, maxHeight:
                // '100px',
                // maxWidth:
                // '250px'
              }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                      <p style={{ color: 'white' }}>LVPEI Users</p>
                    <img style={{width:'auto'}} src={require('../../img/SAIcons/doctor.png')} alt=''/>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                      {lvpei.length}
                    </h1>
                  </div>
                </div>
              </Card>
            <Card style={{
              backgroundColor: '#00acc1', marginRight: '20px', padding:'5px', minWidth:'250px' }}>
              <div className='row d-flex justify-content-between'>
                <div className=' col-md-8'>
                  <p style={{ color: 'white' }}>Centres</p>
                  <img style={{width:'auto'}} src={require('../../img/SAIcons/medical-history.png')} alt=''/>
                </div>
                <div className='d-flex justify-content-end col-md-4'>
                  <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                    {diag_admin.length}
                  </h1>
                </div>
                </div>
              </Card>
              <Card style={{
                backgroundColor: '#4caf50', marginRight: '20px', padding:'5px', minWidth:'250px'
              }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p style={{ color: 'white' }}>Center Users</p>
                    <img style={{width:'auto'}} src={require('../../img/SAIcons/centerUser.png')} alt=''/>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                      {diagLen}
                    </h1>
                  </div>
                </div>
              </Card>
              <Card style={{
                backgroundColor: '#ffa726', marginRight: '20px', padding:'5px', minWidth:'250px'
              }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p style={{ color: 'white' }}>Patient Uploads</p>
                    <img style={{width:'auto'}} src={require('../../img/SAIcons/patient.png')} alt=''/>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                      {patientsLen}
                    </h1>
                  </div>
                </div>
              </Card>
            </div>
          <div style={{
            backgroundColor: '#d4d4d4', marginRight: '20px', padding:'5px', minWidth:'250px' }}
                className='row  d-flex justify-content-between'>
            <div className='col-6 col-md-3'>
              <Card className='row' style={{ color: 'black',
                 marginRight: '20px', padding:'5px', minWidth:'250px', height:'100px'
              }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p >CT Scan</p>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{fontWeight: 'bold' }}>
                      {CTS.length}
                    </h1>
                  </div>
                </div>
              </Card>
              <Card className='row' style={{
                color: 'black', marginRight: '20px', padding:'5px', minWidth:'250px', height:'100px'}}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p >MRI Scan</p>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{fontWeight: 'bold' }}>
                      {MRIS.length}
                    </h1>
                  </div>
                </div>
              </Card>
            </div>
            <div className='col-6 col-md-3'>
              <Card className='row' style={{
                color: 'black', marginRight: '20px', padding:'5px', minWidth:'250px', height:'100px'
              }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p >CT Angiography</p>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{fontWeight: 'bold' }}>
                      {CTA.length}
                    </h1>
                  </div>
                </div>
              </Card>
              <Card className='row' style={{color: 'black', marginRight: '20px', padding:'5px', minWidth:'250px'
                , height:'100px'}}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p >MRI Angiography</p>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{fontWeight: 'bold' }}>
                      {MRIA.length}
                    </h1>
                  </div>
                </div>
              </Card>
            </div>
            <div className='col-6 col-md-3'>
              <Card className='row' style={{color: 'black', marginRight: '20px', padding:'5px', minWidth:'250px'
                , height:'100px'}}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p >PET Scan</p>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{fontWeight: 'bold' }}>
                      {PETS.length}
                    </h1>
                  </div>
                </div>
              </Card>
              <Card className='row' style={{color: 'black', marginRight: '20px', padding:'5px', minWidth:'250px'
                , height:'100px'}}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p >USG Adbomen</p>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{ fontWeight: 'bold' }}>
                      {USGA.length}
                    </h1>
                  </div>
                </div>
              </Card>
            </div>
            <div className='col-6 col-md-3'>
              <Card className='row' style={{color: 'black', marginRight: '20px', padding:'5px', minWidth:'250px'
                , height:'100px'}}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p >Blood Tests</p>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{fontWeight: 'bold' }}>
                      {BT.length}
                    </h1>
                  </div>
                </div>
              </Card>
            </div>

          </div>
          <footer className="text-white mt-5 p-4 text-center" style={{ height:'60px',left:0,
            bottom:0,background:'#008cff',position: 'absolute',
            right:0}}>
            Copyright &copy; {new Date().getFullYear()} L V Prasad Eye Institute
          </footer>
        </div>
      )
    }
  }
}

SADashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired

}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(SADashboard)
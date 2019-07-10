import React, { Component } from 'react';
import Spinner from '../../common/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { downloadSelectedFiles, getFilesByFolder } from '../../../actions/homeActions'
import FileRow from './FileRow'
import { Link } from 'react-router-dom'
import getLocalDate from '../../../utils/getLocalDate'
import FileItem from './FileItem'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '0',
    transform: 'translate(-50%, -50%)'
  }
}

class Display extends Component {
  constructor () {
    super()
    this.state = {
      modalIsOpen: false,
      show: false,
      selected: [],
      patientId: null,
      downloading: false,

    }
    this.onSelectedDownload = this.onSelectedDownload.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onBack = this.onBack.bind(this)

  }
  componentDidMount () {
    if (this.props.auth.user.role === 'lvpei') {
      this.props.getFilesByFolder(this.props.match.params.id)
    }
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal () {}

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  onSelectedDownload (e) {
    // console.log(this.state.selected)
    this.props.downloadSelectedFiles({id:this.props.folder.files.patient._id})
    this.setState({downloading: true})
  }
  onBack (e) {
    window.location.href=`/displayFolder/${this.props.folder.files.patient.mrNo}`
  }
  // loadFiles() {
  //   fetch('/api/files')
  //     .then(res => res.json())
  //     .then(files => {
  //       if (files.message) {
  //         console.log('No Files');
  //         this.setState({ files: [] })
  //       } else {
  //         this.setState({ files })
  //       }
  //     });
  // }
  //
  // deleteFile(event) {
  //   event.preventDefault();
  //   const id = event.target.id;
  //   fetch('/api/files/'+id, {
  //     method: 'DELETE'
  //   }).then(res => res.json())
  //     .then(response => {
  //       console.log(response);
  //       if (response.success) this.loadFiles()
  //       else alert('Delete Failed');
  //     })
  // }
  // selectionChanges = (newValues) => {
  //   this.setState({
  //     selected: newValues
  //   });
  // }
  // closeSidebar (e) {
  //   this.setState({show:false})
  // }
  render() {
    const {files, loading, notFound} = this.props.folder
    let  content, sidebar=null,displayBar=null;
    let showButton, modalContent=null;
    // if(!this.state.show) {
    //   showButton=(<div style={{marginRight:'10px', marginTop:'20px'}}>
    //     <button className='btn btn-sm' style={{background:'green', color:'white'}}
    //             onClick={this.openSidebar}>Select files for download</button>
    //   </div>)
    // }else {
    //   showButton=null
    // }
    // let sdDownload=null
    // if(!this.state.downloading) {
    //   sdDownload=(<button className='btn btn-sm' onClick={this.onSelectedDownload}
    //                       style={{background:'green', color:'white'}}>
    //     Download</button>)
    // } else {
    //   sdDownload=(<p>Download has started....</p>)
    // }
    if (loading || files===null) {
      content=<Spinner/>

    } else {
      modalContent = (
        <div id="mainbar" className='row d-flex justify-content-center '>
          <div className="grid text-center col-md-10">
            <h3 className="grid--cell fl1 fs-headline1 text-center" style={{
              color: 'black'
            }}>Details</h3>
          </div>
          <table className="table">
            <tbody>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Uploaded By:</h6></td>
              <td><h6>{files.patient.diagCentreName}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>age/gender</h6></td>
              <td><h6>{files.patient.age + '/' + files.patient.gender}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Scan Type:</h6></td>
              <td><h6>{files.patient.scanType}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Organization email Address:</h6></td>
              <td><h6>{files.patient.diagCentre}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>uploaded by user:</h6></td>
              <td><h6>{files.patient.uploadedBy}</h6></td>
            </tr>
            <tr>
              <td><h6 style={{ color: 'grey', opacity: '0.9' }}>Remarks</h6></td>
              <td><h6>{files.patient.remarks}</h6></td>
            </tr>
            </tbody>
          </table>
          <div className="col-md-6 text-center" style={{ width: '100%' }}>
            <button onClick={this.closeModal} className='btn btn-sm' style={{ background: 'red', color: 'white' }}>Close
            </button>
          </div>
        </div>
      )
      // if(this.state.show) {
      //   // displayBar = (
      //   //
      //   // )
      //   // sidebar = (
      //   //   <div className='wrapper d-flex justify-content-end' style={{marginRight:'20%',right: '5%'}}>
      //   //     <div className='col-md-6'
      //   //          style={{ borderStyle:'solid', borderRadius:'5px',minWidth:'250px', maxWidth:'350px', right:'0',left:'60%'}}>
      //   //       <h5>Selected Files</h5>
      //   //       <ul  className="card card-body text-center">
      //   //       {this.state.selected.map(file => (
      //   //           <li key={file} style={{overflow: 'hidden'
      //   //             ,OTextOverflow: 'ellipsis', textOverflow:'ellipsis', whiteSpace: 'nowrap' }}
      //   //           >{file.substr(file.lastIndexOf(';') + 1, file.length)}
      //   //           </li>
      //   //       ))}
      //   //       </ul>
      //   //     </div>
      //   //     <div className='col-md-6'
      //   //          style={{ borderStyle:'solid', borderRadius:'5px', right:'0',left:'60%', minWidth:'250px',  maxWidth:'350px'}}>
      //   //       <div className='row d-flex justify-content-between'>
      //   //         {sdDownload}
      //   //
      //   //         <button onClick={this.closeSidebar} style={{color:'red',background:'white', borderStyle:'none'}}>
      //   //           <i className="fas fa-window-close"/>
      //   //         </button>
      //   //       </div>
      //   //       <CheckboxGroup name="selected" checkboxDepth={3} value={this.state.selected} onChange={this.selectionChanges}>
      //   //         <ul className="card card-body text-center">
      //   //         {files.files.map(file => (
      //   //             <li  key={file.filename} style={{overflow: 'hidden'
      //   //               ,OTextOverflow: 'ellipsis', textOverflow:'ellipsis', whiteSpace: 'nowrap' }}
      //   //             >{file.filename.substr(file.filename.lastIndexOf(';') + 1, file.filename.length)}
      //   //               <Checkbox value={file.filename}/></li>
      //   //         ))}
      //   //         </ul>
      //   //
      //   //       </CheckboxGroup>
      //   //     </div>
      //   //   </div>
      //   // )
      // }
      if(notFound) {
        content=(<div className="App-content row d-flex justify-content-center" >
          <div className="grid text-center col-md-12">
            <div className='row '>
              <div style={{margin: '10px'}}>
                <Link to={`/displayFolder/${files.patient.mrNo}`} className='btn' style={{background: 'white', color: 'green'}}>
                  <i className="fa fa-chevron-circle-left fa-3x" aria-hidden="true"/></Link>
              </div>
              {/*<h1 className="grid--cell fl1 fs-headline1 text-center" style={{*/}
              {/*  color: 'black'*/}
              {/*}}> Welcome to L V Prasad Cloud</h1>*/}
            </div>
          </div>
          <div>
            <p>Nothing is uploaded yet, please check back later</p>
          </div>
        </div>)
      }else {
        content=(
            <div className="w-100"
                 style={{minWidth: '100%', border:'none', margin:'0px',padding:'0px'
              , left:0, right:0}} >
              <div className="App-content row d-flex justify-content-center">
              <nav className='container-fluid navbar col-md-12 w-100  d-flex justify-content-between '
                   style={{ minWidth:'100%', background:'#ffa726', left:0, right:0,border:'none', margin:'0px',height:'50px',
                     padding:'0px'}}>
                <div className='row col-md-10  d-flex justify-content-center'>
                  <div className='d-flex justify-content-center'>
                    <button onClick={this.openModal} className='btn btn-primary'
                            style={{ background: '#ffa726', color: 'white', borderStyle: 'solid', marginRight:'10px' }}>
                      <i className="fas fa-info-circle"/>Upload Information</button>
                    <button className='btn btn-primary'
                      style={{ background: '#ffa726', color: 'white', borderStyle: 'solid', marginRight:'10px' }}>
                      View Selected Files</button>
                    <button className='btn btn-primary' onClick={this.onSelectedDownload}
                            style={{ background: '#ffa726', color: 'white', borderStyle: 'solid', marginRight:'10px' }}>
                      Download Selected Files</button>
                    <button className='btn btn-primary'
                      style={{ background: '#ffa726', color: 'white', borderStyle: 'solid' , marginRight:'10px'}}>
                      View All Files</button>
                    <button className='btn btn-primary'
                            style={{ background: '#0BC107', color: 'white', borderStyle: 'solid' , marginRight:'10px'}}>
                      Tumor Volume</button>
                  </div>
                </div>
                <div className='col-md-2 d-flex justify-content-end'>
                  <Link to={`/displayFolder/${files.patient.mrNo}`} onClick={this.onBack} className='btn'
                        style={{background: '#ffa726', color: 'green'}}>
                    <i className="fa fa-chevron-circle-left fa-2x" aria-hidden="true"/></Link>
                </div>
              </nav>
                <nav className='container-fluid navbar col-md-12 w-100  d-flex justify-content-between '
                     style={{ minWidth:'100%', background:'#c1c1c1', left:0, right:0,border:'none', margin:'0px',height:'50px',
                       padding:'0px'}}>
                  <div className='row  col-md-12 d-flex justify-content-between'>
                    <h6 >Patient Name: {files.patient.firstName+' '+ files.patient.lastName}</h6>
                    <h6  >MR No: {files.patient.mrNo}</h6>
                    <h6>Scan Type:{files.patient.scanType}</h6>
                    <h6 >Uploaded on:
                      {getLocalDate(files.patient.lastUploadAt).
                      substring(0, getLocalDate(files.patient.lastUploadAt).indexOf(','))}</h6>
                    <h6 >Uploaded at:
                      {getLocalDate(files.patient.lastUploadAt).
                      substring(getLocalDate(files.patient.lastUploadAt).indexOf(',')+1
                        ,getLocalDate(files.patient.lastUploadAt).length)}</h6>
                  </div>
                </nav>
            </div>


              <FileRow files={files.files} patient={files.patient} check={true}/>
            </div>
        )
      }
    }
    return (

      <div className="displayFiles container-fluid w-100 col-lg-12"
           style={{width: '100%', border:'none', margin:'0px',padding:'0px'}}>
          {content}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Patient Data"
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >{modalContent}</Modal>
      </div>
    );
  }
}

Display.propTypes = {
  home: PropTypes.object.isRequired,
  getFilesByFolder: PropTypes.func.isRequired,
  downloadSelectedFiles: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  home: state.home,
  auth: state.auth,
  folder: state.folder
})
// {/*<table>*/}
// {/*  <thead>*/}
// {/*  <tr>*/}
// {/*    <th>File</th>*/}
// {/*    <th>Uploaded</th>*/}
// {/*    <th>Size</th>*/}
// {/*    <th/>*/}
// {/*  </tr>*/}
// {/*  </thead>*/}
// {/*  <tbody>*/}
//
// {/*  </tbody>*/}
// {/*</table>*/}

// {/*{files.map((file, index) => {*/}
// {/*  let d = new Date(file.uploadDate)*/}
// {/*  return (*/}
// {/*    <tr key={index}>*/}
// {/*      <td><a href={`http://localhost:3001/api/files/${file.filename}`}>{file.filename}</a></td>*/}
// {/*      <td>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</td>*/}
// {/*      <td>{(Math.round(file.length/100) / 10)+'KB'}</td>*/}
// {/*      <td><button onClick={this.deleteFile.bind(this)} id={file._id}>Remove</button></td>*/}
// {/*    </tr>*/}
// {/*  )*/}
// {/*})}*/}
export default connect(mapStateToProps, { getFilesByFolder, downloadSelectedFiles })(Display);
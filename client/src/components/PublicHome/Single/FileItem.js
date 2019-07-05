import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import '../allFolders.css'
import { deleteFile, displayDicom, downloadFile, pinFile, unPinFile } from '../../../actions/homeActions'
import Modal from 'react-modal'
import getLocalDate from '../../../utils/getLocalDate'
import DwvComponent from '../../DicomWebViewer/DwvComponent'
import dwv from 'dwv'
import '../../DicomWebViewer/DwvComponent.css'
import axios from 'axios'
// import ReactHover from 'react-hover'
import { Document, Page} from 'react-pdf'




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
const customStylesII = {
  overlay: { position: 'static' },
  content: {
    border: '0',
    borderRadius: '4px',
    minHeight: '470px',
    left: '85%',
    right: 'auto',
    top: '50%',
    position: 'fixed',
    transform: 'translate(-50%,-50%)',
    minWidth: '400px',
    maxWidth: '500px',
    background:'#ffa726'
  }
}
dwv.utils.decodeQuery = dwv.utils.base.decodeQuery
dwv.gui.displayProgress = () => {}
dwv.gui.getElement = dwv.gui.base.getElement
dwv.gui.refreshElement = dwv.gui.base.refreshElement
dwv.image.decoderScripts = {
  'jpeg2000': 'assets/dwv/decoders/pdfjs/decode-jpeg2000.js',
  'jpeg-lossless': 'assets/dwv/decoders/rii-mango/decode-jpegloss.js',
  'jpeg-baseline': 'assets/dwv/decoders/pdfjs/decode-jpegbaseline.js',
  'rle': 'assets/dwv/decoders/dwv/decode-rle.js'
}

class FileItem extends Component {
  constructor () {
    super()
    this.onOpen = this.onOpen.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      modalIsOpen: false,
      FileModalIsOpen: false,
      uploadModal: false,
      file: null,
      tools: ['WindowLevel'],
      selectedTool: 'Select Tool',
      loadProgress: 0,
      dataLoaded: false,
      dwvApp: null,
      tags: [],
      showDicomTags: false,
      image: null,
      loaded: false,
      pin: false

    }
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onClick = this.onClick.bind(this)
    this.canvasRef = React.createRef()
    this.pinFile = this.pinFile.bind(this)
    this.unPinFile = this.unPinFile.bind(this)

  }

  componentDidMount () {
    // this.props.displayDicom({ filename: this.props.file.filename })
    this.setState({pin:this.props.file.metadata.pinned})
    if(this.props.file.contentType==='application/octet-stream') {
      if (!this.state.loaded) {
        axios.post('/api/upload/displayDicom', { filename: this.props.file.filename },
          { responseType: 'arraybuffer' }).then(res => {
          if (res !== null) {
            console.log({res:res})
            try {
              let app = new dwv.App()
              app.init({
                'containerDivId': this.props.file.filename.toString(),
                'tools': this.state.tools,
                'shapes': ['Ruler'],
                'isMobile': true
              })
              const canvas = this.canvasRef.current
              if (canvas !== null) {
                app.loadImageObject([{ name: '', filename: '', data: res.data }])
                const ctx = canvas.getContext('2d')
                app.getImage().onload = () => {
                  ctx.drawImage(app.getImage(), 0, 0)
                }
                let self = this
                app.addEventListener('load-progress', event => {
                  console.log({ progress: event.loaded })
                  self.setState({ loadProgress: event.loaded })
                })
                app.addEventListener('load-end', event => {
                  self.setState({ dataLoaded: true })
                  self.setState({ tags: app.getTags() })
                  if (app.isMonoSliceData() && app.getImage().getNumberOfFrames() === 1) {
                    self.setState({ selectedTool: 'ZoomAndPan' })
                  } else {
                    self.setState({ selectedTool: 'Scroll' })
                  }
                })
                this.setState({ dwvApp: app, loaded: true })
              }

            } catch (e) {
              console.log(e)
            }
          }
        }).catch(err => {
            console.log({ err: err })
          }
        )
      }
    }else if(this.props.file.contentType==='application/pdf') {

    }
  }

  onOpen (e) {
    this.props.downloadFile(this.props.file.filename)
  }
  // showDialog(e) {
  //   console.log('pops')
  //   if(!this.state.TestModalIsOpen) {
  //     this.setState({TestModalIsOpen: true})
  //   }
  // }
  pinFile (e) {
    console.log({f:this.props.file.filename})
    this.props.pinFile({filename:this.props.file.filename})
    this.setState({pin:true})
  }

  unPinFile (e) {
    console.log({f:this.props.file.filename})
    this.props.unPinFile({filename:this.props.file.filename})
    this.setState({pin:false})

  }
  onDelete (e) {
    this.props.deleteFile(this.props.file.filename)
  }

  onClick (e) {
    this.props.displayDicom({ filename: this.props.file.filename })
    this.setState({ FileModalIsOpen: true })

  }

  closeModal () {
    this.setState({ modalIsOpen: false, FileModalIsOpen: false })
  }

  // closeAfterHover () {
  //   console.log('close')
  //   this.setState({TestModalIsOpen: false })
  //
  // }
  openModal () {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal () {}

  // handleMouseHover() {
  //   console.log('in')
  //   this.setState(this.toggleHoverState);
  // }
  //
  // toggleHoverState(state) {
  //   return {
  //     isHovering: !state.isHovering,
  //   };
  // }

  render () {
    const { file, patient } = this.props
    const { active, loading } = this.props.view
    const { loadProgress } = this.state
    let displayFile = null,icon=null, canvas=null
    if(this.props.file.contentType==='application/octet-stream') {
      canvas = (
        <div id={this.props.file.filename} style={{width:'100%'}}>
          <div className="layerContainer">
            <div className="dropBox"/>
            <canvas ref={this.canvasRef} className="imageLayer"
            >
              Only for HTML5 compatible browsers...</canvas>
            <img src={this.state.image} alt=''/>
            <div className="drawDiv"/>
          </div>
        </div>
      )
    }else  {
      canvas = (
        <img src={require('../../../img/file.png')} alt=''/>
      )
    }
    if (loading || active === null) {
      displayFile = null
    } else {
      console.log({active:active})
      if(this.props.file.contentType==='application/octet-stream') {
        displayFile = (<DwvComponent file={active}/>)
      } else if (this.props.file.contentType==='application/pdf')  {
        console.log({success:true})
        displayFile=(
          <div>
            <h1>problem loading</h1>
            <Document
              file={active}
            >
              <Page />
            </Document>
          </div>

        )
      }
    }
    if(this.state.pin) {
      icon=( <button className='btn-sm btn' onClick={this.unPinFile}
                     style={{ background: 'white', color: 'blue', marginRight: '10px' }}
        ><i className="fas fa-check-circle fa-2x"/></button>
      )
    }else {
      icon = (<button className='btn-sm btn' onClick={this.pinFile}
                      style={{ background: 'white', color: 'blue', marginRight: '10px' }}
      ><i className="far fa-check-circle fa-2x"/></button>)
    }
    console.log({pine:file.metadata.pinned})

    let name = file.filename.substr(file.filename.lastIndexOf(';') + 1, file.filename.length)

    return (
      //onTouchStart="this.classList.toggle('hover');
      <div className="">
        <div className="image-flip">
          <div className="mainflip">
            <div className="frontside">
              {/*<Link to={`/api/upload/downloadFile/${file.filename}`}>*/}
              <span>
                    <div className="card" style={{
                      minWidth: '200', borderStyle: 'solid', maxWidth: '200px',
                    }}>
                        <div className="card-body text-center">
                          <button className='btn-sm btn' onClick={this.onClick.bind(this)}
                                  onMouseOver={this.onClick.bind(this)} onMouseLeave={this.closeModal.bind(this)}>
                            {canvas}
                            <div className='row d-flex justify-content-center' >
                              <h4 className="card-title" style={{
                                fontSize: '18px', overflow: 'hidden'
                                , OTextOverflow: 'ellipsis', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%'
                              }}
                              >{name}</h4>
                            </div>
                          </button>
                          <div className="row d-flex justify-content-between">
                            {icon}
                        <button className='btn-sm btn'
                                style={{ background: 'green', color: 'white', marginRight: '10px', maxHeight:'30px' }}
                                onClick={this.onOpen.bind(this)}><i className="fa fa-download"
                                                                    aria-hidden="true"/></button>

                        <button className='btn-sm btn' onClick={this.onDelete.bind(this)}
                                style={{ background: 'red', color: 'white', marginLeft: '10px', maxHeight:'30px' }}>
                          <i className="fa fa-trash" aria-hidden="true"/></button>
                      </div>
                        </div>


                    </div>
                  </span>
            </div>
          </div>
        </div>

        <Modal
          isOpen={this.state.FileModalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStylesII}
          contentLabel="Dicom File"
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
          shouldFocusAfterRender={false}
        >{displayFile}</Modal>
      </div>
    )
  }
}

FileItem.propTypes = {
  file: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  downloadFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  displayDicom: PropTypes.func.isRequired,
  pinFile: PropTypes.func.isRequired,
  unPinFile: PropTypes.func.isRequired,
  view: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  view: state.view
})
export default connect(mapStateToProps, { downloadFile, deleteFile, displayDicom, pinFile, unPinFile})(FileItem)
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
// import '../allFolders.css'
import {
  deleteFolder,
  downloadFile,
  downloadFolder,
  downloadSelectedFiles, favourite,
  pinFile, unFavourite, unPinFile
} from '../../../actions/homeActions'
import downloading from '../../common/downloading.gif'
import Modal from 'react-modal'
import ModalLogin from '../../layout/ModalLogin'

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

class BookItem extends Component {
  constructor () {
    super();
    this.state = {
      file: false,
      file2: false,
      modalIsOpen: false,
      uploadModal: false
    };
    this.onOpen = this.onOpen.bind(this);
    this.onDownload = this.onDownload.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onPlay = this.onPlay.bind(this)
  }

  onOpen(e) {
    this.setState({file: true})
  }
  onPlay (e) {
    if(this.props.auth===null || this.props.auth.isAuthenticated===false) {
      this.setState({modalIsOpen: true})
    } else {
      this.setState({ file2: true })

    }
  }
  onDownload(e) {
    if(this.props.auth===null || this.props.auth.isAuthenticated===false) {
      this.setState({modalIsOpen: true})
    } else {
      e.preventDefault()
      this.setState({file: true})
      this.props.downloadFile(this.props.music._id )
    }

  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal () {

  }


  render () {
    const {music} = this.props;
    let icon,icon2;
    console.log({item:music})
    if(!this.state.file) {
      icon= (<button className='btn-sm btn' style={{background: 'green', color: 'white',marginRight: '10px'}}
                     onClick={this.onDownload.bind(this)}><i className="fa fa-download" aria-hidden="true"/>
      </button>)
    }else {
      icon = (<button className='btn-sm btn' style={{background: 'white',marginRight: '10px'}}><img
        src={downloading}
        style={{ width: '25px', margin: 'auto', display: 'block' }}
        alt="downloading..."
      />
      </button>)
    }
    let rating=(
      <p>rating</p>
    )
    let share = (
      <p>share</p>
    )
    if(!this.state.file2) {
      icon2= (<button className='btn-sm btn' style={{background: 'whit', color: 'black',marginRight: '10px'}}
                      onClick={this.onPlay.bind(this)}><i className="fas fa-play"/>
      </button>)
    } else {
      icon2 = (<audio controls src={`/api/upload/audio/${this.props.bookId}/${music.filename}`} />)
    }
    return (
      //onTouchStart="this.classList.toggle('hover');
      <tr>
        <td><span style={{ fontFamily: 'Arial', fontSize: '14px', overflow: 'hidden',width:'200px',
          OTextOverflow: 'ellipsis', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{music.filename}</span></td>
        <td>{icon}</td>
        <td ><audio controls src={`/api/upload/audio/${this.props.bookId}/${music.filename}`} style={{width:'400px'}}/></td>
        {/*<td>{share}</td>*/}

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Patient Data"
          ariaHideApp={false}
        >{<ModalLogin/>}</Modal>
      </tr>

    )
  }
}

BookItem.propTypes = {
  folder: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  downloadFile: PropTypes.func.isRequired,
  music: PropTypes.object.isRequired,
  bookId: PropTypes.object.isRequired,
  favourite: PropTypes.func.isRequired,
  unFavourite: PropTypes.func.isRequired

};
const mapStateToProps = state => ({
  auth: state.auth,
  folder: state.folder
});

export default connect(mapStateToProps, { downloadFile, favourite, unFavourite })(BookItem);
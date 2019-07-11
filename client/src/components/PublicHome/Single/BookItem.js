import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
// import '../allFolders.css'
import { downloadFile, favourite, getPlays, unFavourite } from '../../../actions/homeActions'
import downloading from '../../common/downloading.gif'
import Modal from 'react-modal'
import ModalLogin from '../../layout/ModalLogin'
import {
  FacebookIcon,
  FacebookShareButton, LinkedinIcon, LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share'
import URL from '../../../utils/URL'

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
      this.setState({ file2: true })
    this.props.getPlays(this.props.folder._id)

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

    return (
      //onTouchStart="this.classList.toggle('hover');
      <tr>
        <td>check box</td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '14px', overflow: 'hidden',width:'200px',
          OTextOverflow: 'ellipsis', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{music.filename}</span></td>
        <td >
          <audio controls onClick={this.onPlay.bind(this)} src={`/api/upload/audio/${this.props.bookId}/${music.filename}`} style={{width:'400px'}}/>
        </td>
        <td>{icon}</td>

        <td>status</td>
        <td><div className='row' style={{margin:'1px'}}>
          <button style={{borderStyle:'none', background:'white'}}>
            <TwitterShareButton title={'Hey!!, checkout this great audio book '+this.props.folder.title+' by LVPEI'}
                                hastags={['SupportVisionImpaired','L V Prasad Eye Institute']}
                                url={URL()+`audioBook/${this.props.folder._id}`}><TwitterIcon size={25} round={true} />
            </TwitterShareButton></button>
          <button style={{borderStyle:'none', background:'white'}}>
            <WhatsappShareButton title={'Hey!!, checkout this great audio book '+this.props.folder.title+' by LVPEI'}
                                 url={URL()+`audioBook/${this.props.folder._id}`}><WhatsappIcon size={25} round={true} />
            </WhatsappShareButton></button>
          <button style={{borderStyle:'none', background:'white'}}>
            <FacebookShareButton quote={'Hey!!, checkout this great audio book '+this.props.folder.title+' by LVPEI'}
                                 hastag={'#SupportVisionImpaired #LVPEI'}
                                 url={URL()+`audioBook/${this.props.folder._id}`}><FacebookIcon size={25} round={true} />
            </FacebookShareButton></button>
          <button style={{borderStyle:'none', background:'white'}}>
            <LinkedinShareButton
              url={URL()+`audioBook/${this.props.folder._id}`}><LinkedinIcon size={25} round={true} />
            </LinkedinShareButton></button>
        </div>
        </td>
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
  unFavourite: PropTypes.func.isRequired,
  getPlays: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  folder: state.folder
});

export default connect(mapStateToProps, { downloadFile, favourite, unFavourite, getPlays })(BookItem);
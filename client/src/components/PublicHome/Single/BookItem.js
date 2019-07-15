import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
// import '../allFolders.css'
import { downloadFile, favourite, getAuthPlays, unFavourite } from '../../../actions/homeActions'
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
import { CHECK_BOX_EVENT, GET_BOOK_DETAILS, NO_FILES } from '../../../actions/types'
import axios from 'axios'


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
      uploadModal: false,
      selected: false,
      progress: 0,
    };
    this.onOpen = this.onOpen.bind(this);
    this.onDownload = this.onDownload.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onUnSelect = this.onUnSelect.bind(this)
    this.myUploadProgress = this.myUploadProgress.bind(this)
  }
  onSelect (e) {
    this.setState({selected: true})
    let getSelected = this.props.checkbox.selected;
      getSelected.push(this.props.music._id)
    console.log({selected: getSelected})
    this.props.checkbox.selected = getSelected
    console.log({afterSelect: this.props.checkbox.selected})
  }

  onUnSelect (e) {
    this.setState({selected: false})
    let unSelect = this.props.checkbox.selected
    let index = unSelect.indexOf(this.props.music._id);
    if (index !== -1) {
      unSelect.splice(index, 1);
    }
    console.log({selected: unSelect})
    this.props.checkbox.selected = unSelect
    console.log({selected: this.props.checkbox.selected})
  }

  onOpen(e) {
    this.setState({file: true})
  }
  onPlay (e) {
      this.setState({ file2: true })
    this.props.getAuthPlays(this.props.folder._id)

  }
  myUploadProgress = () => (progress) => {
    console.log(progress.loaded)
    let percentage = Math.floor((progress.loaded * 100) / this.props.music.length)
    console.log(percentage)
    this.setState({progress:percentage})
  }
  onDownload(e) {
    if(this.props.auth===null || this.props.auth.isAuthenticated===false) {
      this.setState({modalIsOpen: true})
    } else {
      e.preventDefault()
      this.setState({file: true})
      // this.props.downloadFile(this.props.music._id )
      axios.get(`/api/upload/downloadFile/${this.props.music._id}`, { responseType: 'blob',
        onDownloadProgress: this.myUploadProgress()}).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data], { type: 'audio/mp3' }))
        const link = document.createElement('a')
        console.log(url)
        link.href = url
        link.setAttribute('download', this.props.music.filename)
        document.body.appendChild(link)
        link.click()
      }).catch(err => {
        console.log(err)
        alert('There was an error in Downloading!! please try again later...')
      })
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
    let downloadTimes
    console.log({item:music})
    if(!this.state.file) {
      icon= (<button className='btn-sm btn' style={{background: 'green', color: 'white',marginRight: '10px'}}
                     onClick={this.onDownload.bind(this)}><i className="fa fa-download" aria-hidden="true"/>
      </button>)
    }else {
      {/*<img*/}
      {/*  src={downloading}*/}
      {/*  style={{ width: '25px', margin: 'auto', display: 'block' }}*/}
      {/*  alt="downloading..."*/}
      {/*/>*/}
      icon = (<button className='btn-sm btn' style={{background: 'white',marginRight: '10px'}}>
        {this.state.progress}%
      </button>)
    }
    let checkbox;
    if(this.state.selected===false) {
      checkbox=(<td>
        <button onClick={this.onSelect} style={{background:'white', color:'blue', borderStyle:'none'}}>
          <i className="far fa-check-square fa-2x"/></button></td>)
    }else {
      checkbox=(<td onClick={this.onUnSelect}
      ><button style={{background:'white', color:'blue', borderStyle:'none'}}>
        <i className="fas fa-check-square fa-2x"/></button></td>)

    }

    let size, unit
    if(music.length<1024) {
      size=Math.round(music.length*100) / 100
      unit='B'
    }
    if(music.length<1024*1024) {
      size = Math.round((music.length/1024)*100) / 100
      unit='KB'
    }else if(music.length<1024*1024*1024) {
      console.log(music.length/(1024*1024))
      size= Math.round((music.length/(1024*1024))*100) / 100
      unit='MB'
    } else if(music.length<1024*1024*1024*1024) {
      size=Math.round((music.length/(1024*1024*1024)))*100 / 100
      unit='GB'
    }else {
      size=Math.round((music.length/(1024*1024*1024*1024)))*100 / 100
      unit='TB'
    }

    let index =this.props.user.downloads.findIndex((item, i) => {
      return item.id === this.props.music._id
    })
    if(index!==-1) {
      downloadTimes=this.props.user.downloads[index].times
    }else {
      downloadTimes=0
    }
    return (
      //onTouchStart="this.classList.toggle('hover');

    <tr>
      {this.props.auth.user.role==='world' && {checkbox}}
      <td><span style={{ fontFamily: 'Arial', fontSize: '14px', overflow: 'hidden',width:'200px',
          OTextOverflow: 'ellipsis', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{music.filename}</span></td>
        <td>
          <span style={{ fontFamily: 'Arial', fontSize: '14px'}}>
            {size}{' '}{unit}</span>
        </td>
        <td >
          <audio controls onClick={this.onPlay.bind(this)}
                 src={`/api/upload/audio/${this.props.bookId}/${music.filename}`} style={{width:'400px'}}/>
        </td>
        {this.props.auth.user.role==='world' && <td>{icon}</td>}
        {this.props.auth.user.role==='world' && <td>{downloadTimes}</td>}
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
  bookId: PropTypes.string.isRequired,
  favourite: PropTypes.func.isRequired,
  unFavourite: PropTypes.func.isRequired,
  getAuthPlays: PropTypes.func.isRequired,
  checkbox: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  folder: state.folder,
  checkbox: state.checkbox
});

export default connect(mapStateToProps, { downloadFile, favourite, unFavourite, getAuthPlays })(BookItem);
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { addRating, changeRating, downloadFolder, favourite, unFavourite } from '../../actions/homeActions'
import Modal from 'react-modal'
import EditBook from './EditBook'
import UploadFiles from '../upload/UploadFiles'

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

class MasterItem extends Component {
  constructor () {
    super();
    this.state = {
      file: false,
      file2: false,
      modalIsOpen: false,
      uploadModal: false,
      favo: false,
      rating: 0,
      hasRated: false,
      percent: 50,
      alreadyMounted: false
    };
    this.onOpen = this.onOpen.bind(this);
    // this.onDownload = this.onDownload.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.openEditModal = this.openEditModal.bind(this)
  }
  componentDidMount () {
    let index = this.props.folder.fav.findIndex((item, i) => {
      return item.id===this.props.auth.id
    })
    if(index===-1) {
      this.setState({favo: false})
    }else {
      this.setState({favo: true})
    }
    let length = this.props.folder.rating.length*5
    console.log({length:length})
    let totalRatings = 0
    this.setState({noRatings: this.props.folder.rating.length})
    this.props.folder.rating.map(single => {
      totalRatings= totalRatings + single.rate
    })
    console.log(totalRatings)
    if(isNaN((totalRatings/length)*5)) {
      this.setState({percent: 0})

    }else {
      this.setState({percent: (totalRatings/length)*5})
    }
    let rateIndex = this.props.folder.rating.findIndex((item, i) => {
      return item.id===this.props.auth.user.id
    })
    console.log(rateIndex)
    if(!this.state.alreadyMounted)
      if(rateIndex===-1) {
        this.setState({hasRated: false, alreadyMounted: true})
      }else {
        this.setState({hasRated: true,
          rating: this.props.folder.rating[rateIndex].rate, alreadyMounted: true})
      }
  }

  onOpen(e) {
    this.setState({file: true})
  }
  onPlay (e) {
    window.location.href=`/audioBook/${this.props.folder._id}`
  }

  // onDownload(e) {
  //   if(this.props.auth===null || this.props.auth.isAuthenticated===false) {
  //     this.setState({modalIsOpen: true})
  //   } else {
  //     e.preventDefault()
  //     this.setState({file: true})
  //     this.props.downloadFolder(this.props.folder._id )
  //   }
  // }

  openEditModal () {
    this.setState({ modalIsOpen: true, uploadModal: false })
  }
  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  openModal () {
    this.setState({ modalIsOpen: true, uploadModal: true })
  }

  afterOpenModal () {

  }
  render () {
    const {folder} = this.props;
    let modalContent;
    // if(!this.state.file) {
    //   icon= (<button className='btn-sm btn' style={{background: 'green', color: 'white',marginRight: '10px'}}
    //                  onClick={this.onDownload.bind(this)}><i className="fa fa-download" aria-hidden="true"/>
    //   </button>)
    // }else {
    //   icon = (<button className='btn-sm btn' style={{background: 'white',marginRight: '10px'}}><img
    //     src={downloading}
    //     style={{ width: '25px', margin: 'auto', display: 'block' }}
    //     alt="downloading..."
    //   />
    //   </button>)
    // }
    if(this.state.modalIsOpen && this.state.uploadModal) {
      modalContent=(<UploadFiles bookId={folder._id}/>)
    }else if(this.state.modalIsOpen && !this.state.uploadModal) {
      modalContent = (
        <EditBook bookId={folder._id}/>)
    }
    return (
      <tr>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{folder.category}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{folder.title}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{folder.tracks}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{folder.language}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px'  }}>{folder.author}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '16px' }}>{folder.grade}</span></td>
        <td><button className='btn-sm btn' style={{background: 'green', color: 'white',marginRight: '10px'}}
                    onClick={this.onPlay.bind(this)}>View</button></td>
        <td>{<div ><i style={{color:'gold'}} className="fas fa-star fa-2x"/>{this.state.percent}/5</div>}</td>
          {/*<span>({this.state.noRatings})</span>*/}
        <td>
          <button onClick={this.openEditModal} style={{color:'blue'}} className='btn btn-sm'>
            <i className="fas fa-edit fa-2x"/></button>
        </td>
        <td>
          <button onClick={this.openModal} style={{color:'green'}} className='btn btn-sm'>
            <i className="fas fa-plus-circle fa-2x"/></button>

        </td>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal Data"
          ariaHideApp={false}
        ><div className='row col-md-12'>
          <div className='row'>
            {modalContent}
          </div>
          <div className='row'>
            <button className='btn btn-sm' onClick={this.closeModal} style={{color: 'white', background:'red'}}>close</button>
          </div>
        </div>
        </Modal>
      </tr>

    )
  }
}

MasterItem.propTypes = {
  folder: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  favourite: PropTypes.func.isRequired,
  unFavourite: PropTypes.func.isRequired,
  addRating: PropTypes.func.isRequired,
  changeRating: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {downloadFolder, favourite, unFavourite, addRating, changeRating})(MasterItem);
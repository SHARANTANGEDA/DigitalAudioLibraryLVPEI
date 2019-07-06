import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import URL from '../../../utils/URL'
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon, } from 'react-share';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import {
  FacebookShareCount,
  LinkedinShareCount,
  TwitterShareCount,
  WhatsappShareCount,
} from 'react-share';
import {
  addRating, changeRating, downloadFolder, favourite, unFavourite } from '../../../actions/homeActions'
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

class TableItem extends Component {
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
    this.onDownload = this.onDownload.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onFav = this.onFav.bind(this)
    this.onUnFav = this.onUnFav.bind(this)
    this.onStarClick = this.onStarClick.bind(this)
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
    console.log(length)
    let totalRatings = 0
      this.props.folder.rating.map(single => {
        totalRatings= totalRatings + single.rate
      })
    console.log(totalRatings)
    this.setState({percent: (totalRatings/length)*100})
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
    if(this.props.auth===null || this.props.auth.isAuthenticated===false) {
      this.setState({modalIsOpen: true})
    } else {
      this.setState({ file2: true })
      window.location.href=`/audioBook/${this.props.folder._id}`
    }
  }

  onStarClick (e) {
    this.setState({rating: e})
    if(this.state.hasRated) {
      this.props.changeRating(this.props.folder._id, e)
    }else {
      this.props.addRating(this.props.folder._id, e)
    }
  }
  onDownload(e) {
    if(this.props.auth===null || this.props.auth.isAuthenticated===false) {
      this.setState({modalIsOpen: true})
    } else {
      e.preventDefault()
      this.setState({file: true})
      this.props.downloadFolder(this.props.folder._id )
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
  onUnFav (e) {
    this.props.unFavourite(this.props.folder._id, this.props.folder.rating)
    this.setState({favo: false})

  }
  onFav (e) {
    this.props.favourite(this.props.folder._id, this.props.folder.rating)
    this.setState({favo: true})
  }
  render () {
    const {folder} = this.props;
    let icon,icon2;
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
    // icon2= (<button className='btn-sm btn' style={{background: 'whit', color: 'black',marginRight: '10px'}}
    //                   onClick={this.onPlay.bind(this)}><i className="fas fa-play"/>
    //   </button>)
    icon2=(
      <button className='btn-sm btn' style={{background: 'green', color: 'white',marginRight: '10px'}}
              onClick={this.onPlay.bind(this)}>View</button>
    )
    let rating
    if(isNaN(this.state.percent)) {
      rating=(
        <p style={{color: 'red'}}><i className="fas fa-heart fa-2x"/>90%</p>
      )
    }else {
      rating=(
        <p style={{color: 'red'}}><i className="fas fa-heart fa-2x"/>{this.state.percent}%</p>
      )
    }

    let share = (
      <p>share</p>
    )
    let fav
    if(this.state.favo) {
      fav = (
        <button onClick={this.onUnFav} style={{color:'red'}} className='btn btn-sm'><i className="fas fa-heart fa-2x"/></button>
      )
    }else {
      fav = (
        <button onClick={this.onFav} style={{color:'red'}} className='btn btn-sm'><i className="far fa-heart fa-2x"/></button>
      )
    }

    return (
      //onTouchStart="this.classList.toggle('hover');
      <tr>
        <td><span style={{ fontFamily: 'Arial', fontSize: '14px' }}>{folder.category}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '14px' }}>{folder.title}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '14px' }}>{folder.tracks}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '14px' }}>{folder.language}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '14px'  }}>{folder.author}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '14px' }}>{folder.grade}</span></td>
        <td>{icon}</td>
        <td>{icon2}</td>
        {this.props.auth.isAuthenticated ? <td>{fav}</td>: null}
        <td>{rating}</td>
        {this.props.auth.isAuthenticated ?<td><StarRatingComponent
          name="rating"
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
          renderStarIcon={() => {
            return (
              <span>
                  <i className='fas fa-star fa-2x'/>
                </span>
            )}}
          editing={true}
        /></td>: null}
        <td><div className='row' style={{margin:'3px'}}>
          <button style={{borderStyle:'none', background:'white'}}>
            <TwitterShareButton url={URL()+`audioBook/${this.props.folder._id}`}><TwitterIcon size={32} round={true} />
          </TwitterShareButton></button>
          <button style={{borderStyle:'none', background:'white'}}>
          <WhatsappShareButton url={URL()+`audioBook/${this.props.folder._id}`}><WhatsappIcon size={32} round={true} />
          </WhatsappShareButton></button>
          <button style={{borderStyle:'none', background:'white'}}>
          <FacebookShareButton url={URL()+`audioBook/${this.props.folder._id}`}><FacebookIcon size={32} round={true} />
          </FacebookShareButton></button>
          <button style={{borderStyle:'none', background:'white'}}>
          <LinkedinShareButton url={URL()+`audioBook/${this.props.folder._id}`}><LinkedinIcon size={32} round={true} />
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

TableItem.propTypes = {
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
export default connect(mapStateToProps, {downloadFolder, favourite, unFavourite, addRating, changeRating})(TableItem);
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import StarRatingComponent from 'react-star-rating-component';
import URL from '../../../utils/URL'
import './productCard.css'
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
  addRating, changeRating, downloadFolder, favourite, unFavourite } from '../../../actions/homeActions'
import downloading from '../../common/downloading.gif'
import Modal from 'react-modal'
import ModalLogin from '../../layout/ModalLogin'
import axios from 'axios'
import dwv from 'dwv'

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

class ProductCard extends Component {
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
      alreadyMounted: false,
      noRatings: 0
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
      <button className='buy--btn' style={{background: 'green', color: 'white',marginRight: '10px'}}
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

    let fav
    if(this.state.favo) {
      fav = (
        <button onClick={this.onUnFav} style={{color:'red', background: 'Transparent'}}
                className='btn btn-sm'><i className="fas fa-heart fa-2x"/></button>
      )
    }else {
      fav = (
        <button onClick={this.onFav} style={{color:'red', background: 'Transparent'}}
                className='btn btn-sm'><i className="far fa-heart fa-2x"/></button>
      )
    }

    return (
      //onTouchStart="this.classList.toggle('hover');
      <div className="product row" style={{maxWidth:'200px', borderStyle:'groove',  maxHeight:'420px'}}>


        <div className="col-md-4">
          <img src={`api/upload/displayImage/${this.props.folder._id}`} alt='not' style={{margin:'5px',  minHeight:'200px', minWidth:'150px'}}/>
          <div className='row d-flex justify-content-between'>
            <div>
              {icon2}
            </div>
            <div>
              {icon}
            </div>
          </div>

          {/*<div className="photo-container">*/}
              {/*<div className="controls" style={{margin:'5px'}}>*/}
                {/*<i className="material-icons">share</i>*/}
                {/*<i className="material-icons">favorite_border</i>*/}

              {/*</div>*/}
              {/*<img*/}
              {/*  src="https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png"*/}
              {/*  alt="green apple slice"/>*/}
            {/*<div className="photo-album">*/}
            {/*  <ul>*/}
            {/*    <li><img*/}
            {/*      src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png"*/}
            {/*      alt="green apple"/></li>*/}
            {/*    <li><img*/}
            {/*      src="https://res.cloudinary.com/john-mantas/image/upload/v1537303532/codepen/delicious-apples/half-apple.png"*/}
            {/*      alt="half apple"/></li>*/}
            {/*    <li><img*/}
            {/*      src="https://res.cloudinary.com/john-mantas/image/upload/v1537303160/codepen/delicious-apples/green-apple-flipped.png"*/}
            {/*      alt="green apple"/></li>*/}
            {/*    <li><img*/}
            {/*      src="https://res.cloudinary.com/john-mantas/image/upload/v1537303708/codepen/delicious-apples/apple-top.png"*/}
            {/*      alt="apple top"/></li>*/}
            {/*  </ul>*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
        <div className='col-md-12 row'>
          <div className='row d-flex justify-content-between'>
            <div ><i style={{color:'gold'}} className="fas fa-star fa-2x"/>{this.state.percent}/5
              <span>({this.state.noRatings})</span></div>
            {this.props.auth.isAuthenticated ? <div >{fav}</div>: null}
          </div>
        <div className=" product__info ">
          <div className="title">
            <h1>{folder.title}</h1>
            <span>{folder.category}</span>
          </div>
          {this.props.auth.isAuthenticated ?<div className="variant">
            <h3 style={{fontSize: '0.7em', letterSpacing: '1.2px', color: '#a6a6a6'}}>Rate this Audio Book</h3>
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={this.state.rating}
              onStarClick={this.onStarClick.bind(this)}
              renderStarIcon={() => {
                return (
                  <span>
                  <i className='fas fa-star '/>
                </span>
                )}}
              editing={true}
            />
          </div>: null}
          <div className="variant">
            <h3 style={{fontSize: '0.7em', letterSpacing: '1.2px', color: '#a6a6a6'}}>Share</h3>
            <div className='row' style={{margin:'1px'}}>
              <button style={{borderStyle:'none', background:'white'}}>
                <TwitterShareButton url={URL()+`audioBook/${this.props.folder._id}`}><TwitterIcon size={25} round={true} />
                </TwitterShareButton></button>
              <button style={{borderStyle:'none', background:'white'}}>
                <WhatsappShareButton url={URL()+`audioBook/${this.props.folder._id}`}><WhatsappIcon size={25} round={true} />
                </WhatsappShareButton></button>
              <button style={{borderStyle:'none', background:'white'}}>
                <FacebookShareButton url={URL()+`audioBook/${this.props.folder._id}`}><FacebookIcon size={25} round={true} />
                </FacebookShareButton></button>
              <button style={{borderStyle:'none', background:'white'}}>
                <LinkedinShareButton url={URL()+`audioBook/${this.props.folder._id}`}><LinkedinIcon size={25} round={true} />
                </LinkedinShareButton></button>

            </div>
          </div>
          <div className="description">
            <h3 style={{fontSize: '0.7em', letterSpacing: '1.2px', color: '#a6a6a6'}}>About The Book</h3>
            <ul>
              <li>This Book is recorded in {folder.tracks} tracks</li>
              <li>{folder.language}</li>
              <li>This book is preferred for {folder.grade}</li>
              <li>Written/Published by {folder.author}</li>
            </ul>
          </div>

        </div>
      </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Patient Data"
          ariaHideApp={false}
        >{<ModalLogin/>}</Modal>
      </div>

    )
  }
}

ProductCard.propTypes = {
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
export default connect(mapStateToProps, {downloadFolder, favourite, unFavourite, addRating, changeRating})
(ProductCard);


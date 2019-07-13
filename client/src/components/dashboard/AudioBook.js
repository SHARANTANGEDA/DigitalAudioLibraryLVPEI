import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import { getAudioBook } from '../../actions/homeActions'
import BookItem from '../PublicHome/Single/BookItem'

class AudioBook extends Component {
  constructor () {
    super()
    this.state = {

    }
  }
  componentDidMount () {
     this.props.getAudioBook(this.props.match.params.id)
  }


  render () {
    const { folders, loading } = this.props.folder
    let content, heading=null;
    if(loading || folders===null) {
      content=(<Spinner/>)
    } else {
      // console.log({patients:folders})
      heading=(
        <nav className='navbar navbar-expand-sm justify-content-between col-md-12' style={{ background:'#ffa726', width:'100%', height:'40px'}}>
          <Link to='/dashboard' className='btn' style={{background:'#ffa726', color: 'green'}}>
            BACK</Link>

            <h6 className='d-flex align-items-center'>
              <button className='btn btn-sm' style={{background:'#00006d', color:'white', height:'30px', fontSize:'14px'}}
              >Book Name</button>:{folders.music.title}</h6>
          <h6 className='d-flex align-items-center'>
            <button className='btn btn-sm' style={{background:'#00006d', color:'white', height:'30px', fontSize:'14px'}}
            >Author</button>:{folders.music.author}</h6>
          <h6 className='d-flex align-items-center'>
            <button className='btn btn-sm' style={{background:'#00006d', color:'white', height:'30px', fontSize:'14px'}}
            >Downloads</button>:{folders.music.downloads}</h6>
      </nav>)
        content=(  folders.files.map(folder => (
          <BookItem music={folder} bookId={folders.music._id} key={folder._id}/>
        ))
        )
    }
    return (
      <div className=' audioBook ' style={{minWidth: '100%'}}>
        <div className='row ' style={{minWidth: '100%'}}>
          {heading}
          <table className="table table-bordered mb-0" >
            <thead>
            <tr>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Select files for download</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Track Name</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Play Track</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Download Track</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Status</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Share</th>
              {/*<th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Share</th>*/}
            </tr>
            </thead>
            {content}
          </table>
        </div>
      </div>

    )
  }
}



AudioBook.defaultProps = {
  showActions: true
}

AudioBook.propTypes = {
  auth: PropTypes.object.isRequired,
  getAudioBook: PropTypes.func.isRequired,
  folder: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  folder: state.folder
})
export default connect(mapStateToProps,{getAudioBook})(AudioBook)

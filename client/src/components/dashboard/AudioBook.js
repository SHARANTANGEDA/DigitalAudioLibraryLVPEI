import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import {
  clearCheckBox,
  downloadFolder,
  downloadSelected,
  getAudioBook,
  getLoggedAudioBook
} from '../../actions/homeActions'
import BookItem from '../PublicHome/Single/BookItem'
import PublicBookItem from '../PublicHome/Single/PublicBookItem'

class AudioBook extends Component {
  constructor () {
    super()
    this.state = {}
    this.eraseSelections = this.eraseSelections.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.selectDownload = this.selectDownload.bind(this)
  }

  componentDidMount () {
    if(this.props.auth.isAuthenticated) {
      this.props.getLoggedAudioBook(this.props.match.params.id)
    }else {
      this.props.getAudioBook(this.props.match.params.id)
    }
    // console.log(this.props.auth.isAuthenticated)

  }

  eraseSelections (e) {
    this.props.clearCheckBox()
  }

  selectDownload (e) {
    console.log({ param: this.props.match.params.id })
    this.props.downloadSelected(this.props.match.params.id, { data: this.props.checkbox.selected })
  }

  async selectAll (e) {
    let selection = []
    this.props.folder.folders.files.map(async folder => {
      selection.push(folder._id)
    })
    this.props.checkbox.selected = selection
    this.props.downloadFolder(this.props.match.params.id)
  }

  render () {
    const { folders, loading } = this.props.folder
    let content, heading = null, headers=null
    if (loading || folders === null) {
      content = (<Spinner/>)
    } else {
      // console.log({patients:folders})
      heading = (
        <div className='App-content row d-flex justify-content-center' style={{margin:'0px', minWidth:'100%'}}>
          {this.props.auth.user.role==='world' &&
          <nav className='navbar navbar-expand-sm justify-content-between col-md-12'
               style={{ background: '#ffa726', width: '100%', height: '40px' }}>
            <Link to='/dashboard' onClick={this.eraseSelections} className='btn'
                  style={{ background: '#ffa726', color: 'green' }}>
              BACK</Link>
            <div className='d-flex justify-content-end'>
              <button onClick={this.selectDownload} style={{ background: '#ffa726' }}>
                Download Selected
              </button>
              <button onClick={this.selectAll} style={{ background: '#ffa726' }}>
                Download All
              </button>
              <button onClick={this.eraseSelections} style={{ background: '#ffa726' }}>
                Clear All
              </button>
            </div>

          </nav>
          }


          <nav className='container-fluid navbar col-md-12 w-100  d-flex justify-content-between '
               style={{
                 minWidth: '100%',
                 background: 'white',
                 left: 0,
                 right: 0,
                 border: 'none',
                 margin: '0px',
                 height: '50px',
               }}>
            <h5 className='d-flex align-items-center justify-content-start'
                style={{minWidth:'350px' }}>
              <h3 className='btn btn-sm'
                      style={{ background: '#00006d', color: 'white', height: '30px', fontSize: '14px',
                        marginRight:'15px'}}
              >Book Name
              </h3>
              {folders.music.title}</h5>
            <h5 className='d-flex align-items-center justify-content-start'
                style={{  minWidth:'350px' }}>
              <h3 className='btn btn-sm'
                      style={{ background: '#00006d', color: 'white', height: '30px', fontSize: '14px',
                        marginRight:'15px' }}
              >Author
              </h3>
              {folders.music.author}</h5>
            <h5 className='d-flex align-items-center justify-content-start'
                style={{ minWidth:'350px' }}>
              <h3 className='btn btn-sm'
                      style={{ background: '#00006d', color: 'white', height: '30px', fontSize: '14px', marginRight:'15px' }}
              >Downloads
              </h3>
              {folders.music.downloads}</h5>
          </nav>
        </div>
      )
      if(this.props.auth.isAuthenticated) {
        console.log({user:this.props.folder.folders.user})
        content = (folders.files.map(folder => (
            <BookItem music={folder} user={this.props.folder.folders.user} bookId={folders.music._id} key={folder._id}/>
          ))
        )
        headers=(
          <tr>
            {this.props.auth.user.role==='world' &&
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Select</th>}
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Track Name</th>
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1', minWidth:'100px' }}>File Size</th>
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Play Track</th>
            {this.props.auth.user.role==='world' &&
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Download Track</th>}
            {this.props.auth.user.role==='world' &&
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Status</th>}
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Share</th>
            {/*<th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Share</th>*/}
          </tr>
        )
      }else {
        content = (folders.files.map(folder => (
            <PublicBookItem music={folder} bookId={folders.music._id} key={folder._id}/>
          ))
        )
        headers= (
          <tr>
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Select</th>
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Track Name</th>
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1', minWidth:'100px' }}>File Size</th>

            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Play Track</th>
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Download Track</th>
            <th scope="col" style={{ fontSize: '10pt', background: '#c1c1c1' }}>Share</th>
            {/*<th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Share</th>*/}
          </tr>
        )
      }


    }
    return (
      <div className=' audioBook ' style={{ minWidth: '100%' }}>
        <div className='row ' style={{ minWidth: '100%' }}>
          {heading}
          <table className="table table-bordered mb-0">
            <thead>
            {headers}
            </thead>
            <tbody>
            {content}
            </tbody>
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
  folder: PropTypes.object.isRequired,
  clearCheckBox: PropTypes.func.isRequired,
  downloadFolder: PropTypes.func.isRequired,
  downloadSelected: PropTypes.func.isRequired,
  getLoggedAudioBook: PropTypes.func.isRequired,
  checkbox: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  folder: state.folder,
  checkbox: state.checkbox
})
export default connect(mapStateToProps, { getAudioBook,getLoggedAudioBook, clearCheckBox,
  downloadFolder, downloadSelected })(AudioBook)

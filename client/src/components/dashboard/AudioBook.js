import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Collapse } from 'react-collapse'
import PatientRow from '../display/Patients/PatientRow'
import Spinner from '../common/Spinner'
import PatientItem from '../display/Patients/PatientItem'
import Select from 'react-select'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { getAudioBook } from '../../actions/homeActions'
import TableItem from '../PublicHome/Single/TableItem'
import BookItem from '../PublicHome/Single/BookItem'

class AudioBook extends Component {
  constructor () {
    super()
    this.state = {

    }
  }
  componentDidMount () {
    if (this.props.auth.user.role === 'world') {
      this.props.getAudioBook(this.props.match.params.id)
    }
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
        <p>Book Name: {folders.music.title}</p>
        <p>Author: {folders.music.author}</p>
        <p>Downloads: {folders.music.downloads}</p>
        <Link to='/dashboard' className='btn' style={{background:'#ffa726', color: 'green'}}>
          BACK</Link>
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
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Track Name</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Download Track</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Play Track</th>
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

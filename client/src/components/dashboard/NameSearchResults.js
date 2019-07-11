import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
// import FolderRow from '../display/Folders/FolderRow'
import { getNameResults } from '../../actions/homeActions'

class NameSearchResults extends Component {
  constructor () {
    super()
  }
  componentDidMount () {
    console.log({param:this.props.match.params.id})
    this.props.getNameResults(this.props.match.params.id)
  }


  render () {
    const {resultsName, loading2} = this.props.search
    let allFoldersContent;
    if (loading2 || resultsName===null) {
      allFoldersContent = null
    } else {
      if(!resultsName.success || resultsName.name.length===0) {
        window.location.href='/detailsNotFound'
        allFoldersContent = (
          <h3>No record found with name '{this.props.match.params.id}'</h3>
        )
        } else {
          allFoldersContent = (
            <table className="table table-bordered table-striped mb-0">
              <thead>
              <tr>
                <th scope="col">Centre</th>
                <th scope="col">MR No</th>
                <th scope="col">Patient Name</th>
                <th scope="col">Age/Gender</th>
                <th scope="col">Date of upload</th>
                <th scope="col">type</th>
                <th scope="col">Remarks</th>
                <th scope="col">View</th>
                <th scope="col">Download</th>
                <th scope="col">Delete</th>
              </tr>
              </thead>
              <tbody>
              {/*<FolderRow folders={resultsName.name}/>*/}
              </tbody>
            </table>
          )
        }
      }
    return (
      <div className='nameSearchResults' style={{width: '100%'}}>
        <div style={{width: '100%'}}>
          <h2>Search Results</h2>
          {allFoldersContent}
        </div>
      </div>

    )
  }
}


NameSearchResults.propTypes = {
  auth: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  getNameResults: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
})
export default connect(mapStateToProps,{getNameResults})(NameSearchResults)

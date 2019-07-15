import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteFolder } from '../../actions/homeActions'

class DeleteBook extends Component {
  constructor (props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
  }
  onDelete () {
    this.props.deleteFolder(this.props.bookId)
  }

  render () {
      let profileContent = (
        <div>
          <div className="col-sm-12">
            <div className="row col-md-12 m-auto">
              <h2>Remove access of Entire Book</h2>
            </div>
            <h6> You can grant access again, Do you wish to continue?</h6>
            <div className="col-md-12 d-flex justify-content-end">
              <button className='btn btn-info' onClick={this.onDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )
    return (
      <div className="container-fluid bootstrap snippet editBook" style={{ maxWidth: '100%' }}>
        {profileContent}
      </div>
    )

  }
}

DeleteBook.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  bookId: PropTypes.string.isRequired,
  deleteFolder: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  account: state.account
})

export default connect(mapStateToProps,{deleteFolder})(DeleteBook)

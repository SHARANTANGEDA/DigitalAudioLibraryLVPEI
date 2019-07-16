import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { grantFolder } from '../../actions/homeActions'
import { Link } from 'react-router-dom'

class MediateLogin extends Component {
  constructor (props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
  }
  onDelete () {
    this.props.grantFolder(this.props.bookId)
  }

  render () {

    let  profileContent = (
      <div>
        <div className="col-sm-12">
          <div className="row col-md-12 m-auto">
            <h2>This action requires you to Login!</h2>
          </div>
          <h6>  You can create a free account if you don't already have one below</h6>
          <div className="col-md-12 d-flex justify-content-end">
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

MediateLogin.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  bookId: PropTypes.string.isRequired,
  grantFolder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  account: state.account
})

export default connect(mapStateToProps,{ grantFolder})(MediateLogin)

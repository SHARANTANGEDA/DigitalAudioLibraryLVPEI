import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { resetPassword } from '../../actions/profileActions'

import classnames from 'classnames'

class ResetPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newPassword: '',
      renewPassword: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }


  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
    const profileData = {
      emailId: this.props.emailId,
      newPassword: this.state.newPassword,
      renewPassword: this.state.renewPassword
    }
    this.props.resetPassword(profileData)
  }

  render () {
    const { errors } = this.state
    let profileContent = (
      <div>
        <div className="col-sm-9">
          <div className="row col-md-12 m-auto">
            <div className="col-sm-12" style={{ color: 'black'}}>
              <h4>Change Password</h4></div>
          </div>

          <div className="col-md-12 m-auto">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input readOnly
                  className={classnames('form-control form-control-lg')}
                  name="emailId" type="text"
                  value={this.props.emailId} onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <input
                  className={classnames('form-control form-control-lg', { 'is-invalid': errors.newPassword })}
                  placeholder="New Password"
                  name="newPassword" type="password"
                  value={this.state.newPassword} onChange={this.onChange}/>
                {'Enter a new Password different from previous one' &&
                <small className="form-text text-muted">{'Enter a new Password different from previous one'}</small>}
                {errors.newPassword && (<div className="invalid-feedback">{errors.newPassword}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  className={classnames('form-control form-control-lg', { 'is-invalid': errors.renewPassword })}
                  placeholder="Re-Enter Password"
                  name="renewPassword"
                  type="password"
                  value={this.state.renewPassword} onChange={this.onChange}/>
                {errors.renewPassword && (<div className="invalid-feedback">{errors.renewPassword}</div>
                )}
              </div>
              <div className="form-group">
                <div className="col-xs-12">
                  <button className="btn btn-primary w-30 my-1" type="submit">Confirm Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    )
    // }

    return (
      <div className="container bootstrap snippet resetPassword" style={{ maxWidth: '100%' }}>
        <div className="row" style={{ maxWidth: '100%' }}>
        </div>
        {profileContent}
      </div>
    )
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  emailId: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { resetPassword })(ResetPassword)

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import { getAllBooks, loginUser } from '../../actions/authActions'

class Login extends Component {
  constructor () {
    super();
    this.state = {
      emailId: '',
      password: '',
      errors: {}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount () {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if(nextProps) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      emailId: this.state.emailId,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  render() {
    const {errors} = this.state;

    return (
      <div className="login landing " style={{minWidth: '100%'}}>
        <div className="dark-overlay">
          <div className="container">
            <div className="row d-flex justify-content-center text-light">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Digital Audio Library</h1>
                <p className="lead" style={{color: 'white'}}>
                  {' '}
                  Sign in to access account
                </p>
                <hr />
              </div>
              <div className="col-md-6 text-center">

                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup placeholder="Email Address" error={errors.emailId}
                                  type="text" onChange={this.changeHandler} value={this.state.emailId} name="emailId"
                  />
                  <TextFieldGroup placeholder="Password" error={errors.password}
                                  type="password" onChange={this.changeHandler} value={this.state.password} name="password"
                  />
                  <input type="submit" className="btn btn-info btn-block mt-4"/>
                </form>
                <hr/>
                <p style={{color: 'white'}}>Don't have an account yet?,
                  <Link  to={"/register"} className={"btn btn-sm text-primary"}>Sign Up </Link> to register</p>
              </div>
            </div>
          </div>
          {/*<footer className=" text-white mt-5 p-4 text-center " style={{ height:'60px',left:0,*/}
          {/*  bottom:0,background:'#008cff',position: 'relative',*/}
          {/*  right:0}}>*/}
          {/*  Copyright &copy; {new Date().getFullYear()} L V Prasad Eye Institute*/}
          {/*</footer>*/}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser:PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors

});

export default connect(mapStateToProps,{loginUser,getAllBooks})(Login);

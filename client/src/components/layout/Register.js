import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaGroupField'
import { registerWorld } from '../../actions/authActions'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import Modal from 'react-modal'
import EnterPin from './EnterPin'

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
class Register extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      emailId: '',
      password: '',
      repassword: '',
      address: '',
      pinCode: '',
      city: '',
      state: '',
      country: null,
      countryOptions: countryList().getData(),
      modalIsOpen: false,
      errors: {}
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCatChange = this.onCatChange.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount () {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  openModal () {
    this.setState({ modalIsOpen: true })
  }
  afterOpenModal () {

  }

  closeModal () {
    this.setState({ modalIsOpen: false })
    window.location.href='/dashboard'
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }
  onCatChange (e) {
    this.setState({ country: e })
  }

  onSubmit (e) {
    e.preventDefault()
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
      password: this.state.password,
      repassword: this.state.repassword,
      address: this.state.address,
      pinCode: this.state.pinCode,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country.label
    }
    this.props.registerWorld(newUser);
    this.setState({modalIsOpen: true})
  }

  render () {
    const { errors } = this.state
    const customSelectStyles =  {
        control: (base, state) => ({
          ...base,
          height: '50px',
          'min-height': '34px',
          'max-height': '50px'
        }),
      menuList: base => ({
        ...base,
        minHeight: '200px',
        height: '200px'
      }),
    }
    return (
      <div className="register landing" style={{maxHeight:'100%'}}>
        <div className='dark-overlay' style={{maxHeight:'100%'}}>
        <div className="container " style={{maxHeight:'100%'}}>
          <div className="row">
            <div className="col-md-6 m-auto">
              <h2 className="text-center" style={{color: 'white'}}>Sign Up</h2>
              <p className="lead text-center"  style={{color: 'white'}}>Create a free account to downloads Audio books</p>
              <form noValidate onSubmit={this.onSubmit} className='text-center'>
                <div className="row">
                  <div className="col-md-6">
                    <TextFieldGroup placeholder="First Name" error={errors.firstName}
                      type="text" onChange={this.changeHandler} value={this.state.firstName} name="firstName"
                    />
                  </div>
                  <div className="col-md-6">
                      <TextFieldGroup placeholder="Last Name" error={errors.lastName}
                                      type="text" onChange={this.changeHandler} value={this.state.lastName} name="lastName"
                      />

                  </div>
                </div>
                <TextFieldGroup placeholder="Enter your Email Address" error={errors.emailId}
                                type="email" onChange={this.changeHandler} value={this.state.emailId} name="emailId"
                />
                <TextFieldGroup placeholder="Password" error={errors.password}
                                type="password" onChange={this.changeHandler} value={this.state.password} name="password"
                />
                <TextFieldGroup placeholder="Confirm Password" error={errors.repassword}
                                type="password" onChange={this.changeHandler} value={this.state.repassword} name="repassword"
                />
                <div className="row">
                  <div className="col-md-6">
                    <TextFieldGroup placeholder="Enter pin Code" error={errors.pinCode}
                                    type="text" onChange={this.changeHandler} value={this.state.pinCode} name="pinCode"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup placeholder="Enter City" error={errors.city}
                                    type="text" onChange={this.changeHandler} value={this.state.city} name="city"
                    />

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <TextFieldGroup placeholder="Enter State" error={errors.state}
                                    type="text" onChange={this.changeHandler} value={this.state.state} name="state"
                    />
                  </div>
                  <div className="col-md-6" style={{maxHeight:'150px'}}>
                    {/*<TextFieldGroup placeholder="Enter Country" error={errors.country}*/}
                    {/*                type="text" onChange={this.changeHandler} value={this.state.country} name="country"*/}
                    {/*/>*/}
                    <Select options={this.state.countryOptions}
                            className={classnames('isSearchable',
                              { 'is-invalid': errors.country })}
                            styles={customSelectStyles}
                            placeholder="Select Country"
                            name="country" value={this.state.country} onChange={this.onCatChange}>
                    </Select>
                    {errors.country && (
                      <div className="invalid-feedback">{errors.country}</div>
                    )}
                  </div>
                </div>
                <TextAreaFieldGroup placeholder="Enter your address here(optional)" error={errors.address}
                                    type="text" onChange={this.changeHandler} value={this.state.address} name="address"
                />
                  <input type="submit" className="btn btn-info btn-block mt-4" value='Verify Your Email & SignUp'/>
              </form>
            </div>
          </div>
        </div>
          <footer className=" text-white mt-5 p-4 text-center " style={{ height:'60px',left:0,
            bottom:0,background:'#008cff',
            right:0}}>
            Copyright &copy; {new Date().getFullYear()} L V Prasad Eye Institute
          </footer>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Confirm OTP"
          shouldCloseOnOverlayClick={false}
          modalOptions={{ dismissible: false }}
          shouldCloseOnEsc={false}
          ariaHideApp={false}
        >{<div className='d-flex justify-content-center'>
          <EnterPin/>
          <div>
            <button onClick={this.closeModal} className='btn btn-sm' style={{color:'white', background:'red'}}>
              <i className="fas fa-times"/></button>
          </div>
        </div>}</Modal>
      </div>
    );
  }
}

Register.propTypes = {
  registerWorld: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps,{registerWorld})(withRouter(Register));
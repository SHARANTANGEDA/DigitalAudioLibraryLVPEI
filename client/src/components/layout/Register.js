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
import isEmpty from '../../validation/is-empty'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
      dob: new Date(),
      gender: null,
      errors: {}
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCatChange = this.onCatChange.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.dateChange = this.dateChange.bind(this);
    this.onGenderChange = this.onGenderChange.bind(this)

  }

  dateChange(date) {
    this.setState({
      dob: date
    });
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
  onGenderChange(e) {
    this.setState({gender:e})
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
    if(newUser.country!==null && !isEmpty(newUser.firstName) && !isEmpty(newUser.lastName) && !isEmpty(newUser.country)
      && !isEmpty(newUser.state) && !isEmpty(newUser.city) && !isEmpty(newUser.password) && !isEmpty(newUser.repassword)
     && !isEmpty(newUser.address) && !isEmpty(newUser.pinCode) && !isEmpty(newUser.emailId) &&
      newUser.password===newUser.repassword) {
      this.setState({modalIsOpen: true})
    }
  }

  render () {
    const { errors } = this.state
    const eduArray = [
      {value: 'Pre-Primary', label: 'Pre-Primary'},
      {value: 'Primary', label: 'Primary'},
      {value: 'Upper Primary', label: 'Upper Primary'},
      {value: 'Secondary', label: 'Secondary'},
      {value: 'Senior Secondary', label: 'Senior Secondary'},
      {value: 'Under Graduate', label: 'Under Graduate'},
      {value: 'Post Graduate', label: 'Post Graduate'},
      {value: 'M.Phil', label: 'M.Phil'},
      {value: 'Diploma', label: 'Diploma'},
      {value: 'Post Graduate Diploma including Advanced Diploma',
        label: 'Post Graduate Diploma including Advanced Diploma'},
      {value: 'Integrated', label: 'Integrated'},
      {value: 'Certificate', label: 'Certificate'},
      {value: 'In-Service Training', label: 'In-Service Training'},
      {value: 'Adult Education', label: 'Adult Education'},
      {value: 'Education n.e.c', label: 'Education n.e.c'}
    ]
    const genderArray = [
      {value: 'Male', label: 'Male'},
      {value: 'Female', label: 'Female'},
      {value: 'Others', label: 'Others'}

    ]
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
    //landing
    //dark-overlay
    return (
      <div className="register " style={{maxHeight:'100%'}}>
        <div className='' style={{maxHeight:'100%'}}>
        <div className="container " style={{maxHeight:'100%'}}>
          <div className="row">
            <div className="col-md-12 m-auto">
              <h1 className="text-center" >Sign Up</h1>
              <p className="lead text-center" >Create a free account to downloads Audio books</p>
              <form noValidate onSubmit={this.onSubmit} className='text-center'>

                <h2 className='row col-md-12' style={{color:'white', background:'#00006d',fontSize:'30px',
                borderRadius:'5px'}}>Basic Details:</h2>
                <hr/>

                <div className="row">
                  <div className="row col-md-6">
                    <div className='col-md-4 d-flex align-items-center'>
                      <label htmlFor="firstName"><h4>First Name:</h4></label>
                    </div>
                    <div className='col-md-8'>
                      <TextFieldGroup placeholder="First Name" error={errors.firstName}
                                      type="text" onChange={this.changeHandler} value={this.state.firstName} name="firstName"
                      />
                    </div>

                  </div>
                  <div className="row col-md-6">
                    <div className='col-md-4  d-flex align-items-center'>
                      <label htmlFor="lastName"><h4 >Last Name:</h4></label>
                    </div>
                    <div className='col-md-8'>
                      <TextFieldGroup placeholder="Last Name" error={errors.lastName}
                                      type="text" onChange={this.changeHandler} value={this.state.lastName} name="lastName"
                      />
                    </div>
                  </div>
                </div>
                <div className="row col-md-10">
                  <div className='col-md-4 justify-content-start d-flex align-items-center'>
                    <label htmlFor="emailId"><h4 >Enter Email Address:</h4></label>
                  </div>
                  <div className='col-md-8'>
                    <TextFieldGroup placeholder="Enter your Email Address" error={errors.emailId}
                                    type="email" onChange={this.changeHandler} value={this.state.emailId} name="emailId"
                    />
                  </div>
                </div>
                <div className="row col-md-10">
                  <div className='col-md-4 justify-content-start d-flex align-items-center'>
                    <label htmlFor="password"><h4 >Enter Password:</h4></label>
                  </div>
                  <div className='col-md-8'>
                    <TextFieldGroup placeholder="Password" error={errors.password}
                                    type="password" onChange={this.changeHandler} value={this.state.password} name="password"
                    />
                  </div>
                </div>

                <div className="row col-md-10">
                  <div className='col-md-4 justify-content-start d-flex align-items-center'>
                    <label htmlFor="repassword"><h4 >Confirm Password:</h4></label>
                  </div>
                  <div className='col-md-8'>
                    <TextFieldGroup placeholder="Confirm Password" error={errors.repassword}
                                    type="password" onChange={this.changeHandler} value={this.state.repassword} name="repassword"
                    />
                  </div>
                </div>
                <h2 className='row col-md-12' style={{color:'white', background:'#00006d',fontSize:'30px',
                  borderRadius:'5px'}}>Personal Details:</h2>
                <hr/>

                <div className="row">
                  <div className="row col-md-6">
                    <div className='col-md-5 justify-content-start d-flex align-items-center'>
                      <label htmlFor="address"><h4 >Enter DOB:</h4></label>
                    </div>
                    <div className='col-md-7' >
                      <DatePicker
                        selected={this.state.dob}
                        onChange={this.dateChange}
                        showYearDropdown
                        showMonthDropdown
                        dateFormat="MMMM d, yyyy"
                        dropdownMode="select"
                      />
                    </div>
                  </div>
                  <div className="row col-md-6">
                    <div className='col-md-5  d-flex align-items-center'>
                      <label htmlFor="city"><h4 >Select Gender:</h4></label>
                    </div>
                    <div className='col-md-7'>
                      <Select options={genderArray}
                              className={classnames('isSearchable',
                                { 'is-invalid': errors.gender })}
                              placeholder="Select Gender"
                              name="country" value={this.state.gender} onChange={this.onGenderChange}>
                      </Select>
                      {errors.gender && (
                        <div className="invalid-feedback">{errors.gender}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row col-md-12">
                  <div className='col-md-5  d-flex align-items-center'>
                    <label htmlFor="city"><h4 >Select Educational Qualification:</h4></label>
                  </div>
                  <div className='col-md-7'>
                    <Select options={eduArray}
                            className={classnames('isSearchable',
                              { 'is-invalid': errors.qualification })}
                            placeholder="Select Qualification"
                            name="country" value={this.state.qualification} onChange={this.onGenderChange}>
                    </Select>
                    {errors.qualification && (
                      <div className="invalid-feedback">{errors.qualification}</div>
                    )}
                  </div>
                </div>
                <h2 className='row col-md-12' style={{color:'white', background:'#00006d',fontSize:'30px',
                  borderRadius:'5px'}}>Address Details:</h2>
                <hr/>
                <div className="row">
                  <div className="row col-md-6">
                    <div className='col-md-5 d-flex align-items-center'>
                      <label htmlFor="pinCode"><h4 >Enter Zip Code:</h4></label>
                    </div>
                    <div className='col-md-7'>
                      <TextFieldGroup placeholder="Enter pin Code" error={errors.pinCode}
                                      type="text" onChange={this.changeHandler} value={this.state.pinCode} name="pinCode"
                      />
                    </div>
                  </div>
                  <div className="row col-md-6">
                    <div className='col-md-4  d-flex align-items-center'>
                      <label htmlFor="city"><h4 >Enter City:</h4></label>
                    </div>
                    <div className='col-md-8'>
                      <TextFieldGroup placeholder="Enter City" error={errors.city}
                                      type="text" onChange={this.changeHandler} value={this.state.city} name="city"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="row col-md-6">
                    <div className='col-md-5 d-flex align-items-center'>
                      <label htmlFor="state"><h4 >Enter State:</h4></label>
                    </div>
                    <div className='col-md-7'>
                      <TextFieldGroup placeholder="Enter State" error={errors.state}
                                      type="text" onChange={this.changeHandler} value={this.state.state} name="state"
                      />
                    </div>
                  </div>
                  <div className="row col-md-6">
                    <div className='col-md-5  d-flex align-items-center'>
                      <label htmlFor="city"><h4 >Enter Country:</h4></label>
                    </div>
                    <div className='col-md-7'>
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
                </div>
                <div className="row col-md-12">
                  <div className='col-md-3 justify-content-start d-flex align-items-center'>
                    <label htmlFor="address"><h4 >Enter Address:</h4></label>
                  </div>
                  <div className='col-md-9'>
                    <TextAreaFieldGroup placeholder="Address is optional" error={errors.address}
                                        type="text" onChange={this.changeHandler} value={this.state.address} name="address"
                    />
                  </div>
                </div>
                <div className="col-md-12 d-flex justify-content-center text-center">
                  <input style={{maxWidth:'500px', background:'#00006d'}} type="submit" className="btn btn-info btn-block mt-4"
                         value='Verify Your Email & SignUp'/>

                </div>
                <hr/>
              </form>
            </div>
          </div>
        </div>
          {/*<footer className=" text-white mt-5 p-4 text-center " style={{ height:'60px',left:0,*/}
          {/*  bottom:0,background:'#008cff',*/}
          {/*  right:0}}>*/}
          {/*  Copyright &copy; {new Date().getFullYear()} L V Prasad Eye Institute*/}
          {/*</footer>*/}
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

const Validator = require('validator');
const getAge = require('./ageValidation/getAge');
const isEmpty = require('./is-empty');
module.exports = (data) => {
  let errors = {};
  data.emailId = !isEmpty(data.emailId) ? data.emailId : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.repassword = !isEmpty(data.repassword) ? data.repassword : '';
  data.pinCode = !isEmpty(data.pinCode) ? data.pinCode : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.dob = !isEmpty(data.dob) ? data.dob : '';
  data.gender = !isEmpty(data.gender) ? data.gender: '';
  data.qualification = !isEmpty(data.qualification) ? data.qualification: ''

  if(data.country===null || Validator.isEmpty(data.country.label)) {
    errors.country = 'Please enter the Country'
  }
  if(data.dob===null || Validator.isEmpty(data.dob)) {
    errors.dob='Please select the Date of Birth'
  }
  if(data.dob!==null && !Validator.isEmpty(data.dob)) {
    console.log(getAge(data.dob))
    let age=getAge(data.dob)

    if(age<=0) {
      errors.dob ='Please select a valid Date of birth'
    }else if(age<=1) {
      errors.dob ='You need to At least a year old to create the account'
    }else if(age>120) {
      errors.dob="It's un-believable that you are still alive!! Please contact us"
    }
  }
  if(data.gender===null || Validator.isEmpty(data.gender.value)) {
    errors.gender='Please select your gender'
  }
  if(data.qualification===null || Validator.isEmpty(data.qualification.value)) {
    errors.qualification='Please select your Qualification'

  }
  if (Validator.isEmpty(data.emailId)) {
    errors.emailId = 'Unique lab name is required';
  }
  if (!Validator.isEmail(data.emailId)) {
    errors.emailId = 'This is not valid Email Id';
  }
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = 'Please enter First Name'
  }
  if(Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Please enter Last Name'
  }
  if(Validator.isEmpty(data.pinCode)) {
    errors.pinCode = 'Please enter the pin code'
  }
  if(Validator.isEmpty(data.city)) {
    errors.city = 'Please enter the city'
  }
  if(Validator.isEmpty(data.state)) {
    errors.state = 'Please enter the state'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.repassword)) {
    errors.repassword = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.repassword)) {
    errors.repassword = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
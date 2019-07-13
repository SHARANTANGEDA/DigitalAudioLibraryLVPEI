const Validator = require('validator');
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
  if(data.country===null) {
    errors.country = 'Please enter the Country'
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

  if(Validator.isEmpty(data.pinCode)) {
    errors.pinCode = 'Please enter the pin code'
  }
  if(Validator.isEmpty(data.city)) {
    errors.city = 'Please enter the city'
  }
  if(Validator.isEmpty(data.state)) {
    errors.state = 'Please enter the state'
  }
  console.log(data.country)
  if(Validator.isEmpty(data.country)) {
    errors.country = 'Please enter the Country'
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
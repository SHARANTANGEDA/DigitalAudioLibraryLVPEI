const Validator = require('validator');
const isEmpty = require('../is-empty');
module.exports = (data,store) => {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.pinCode = !isEmpty(data.pinCode) ? data.pinCode : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = 'Please enter First Name'
  }
  if(Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Please enter Last Name'
  }
  if(Validator.equals(data.firstName,store.firstName)) {
    errors.firstName = 'It is same as previous First Name'
  }
  if(Validator.equals(data.lastName,store.lastName)) {
    errors.lastName = 'It is same as previous Last Name'
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
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
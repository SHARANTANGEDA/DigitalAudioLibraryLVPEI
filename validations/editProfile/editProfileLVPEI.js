const Validator = require('validator');
const isEmpty = require('../is-empty');
module.exports = (data,store) => {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  if(Validator.isEmpty(data.firstName)) {
    errors.firstName = 'Please enter First Name'
  }
  if(Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Please enter Last Name'
  }
  if(Validator.equals(data.firstName,store.firstName)) {
    errors.firstName = 'Please choose a different First Name'
  }
  if(Validator.equals(data.lastName,store.lastName)) {
    errors.lastName = 'Please choose a different Last Name'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
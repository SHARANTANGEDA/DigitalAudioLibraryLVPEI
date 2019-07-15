const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
  let errors = {};
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
  data.renewPassword = !isEmpty(data.renewPassword) ? data.renewPassword : '';

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = 'Password must be at least 6 characters';
  }
  if (Validator.isEmpty(data.renewPassword)) {
    errors.renewPassword = 'Confirm Password field is required';
  }
  if (!Validator.equals(data.newPassword, data.renewPassword)) {
    errors.renewPassword = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
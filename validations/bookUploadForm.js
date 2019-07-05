const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = (data) => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : '';
  data.author = !isEmpty(data.author) ? data.author : '';
  data.language = !isEmpty(data.language) ? data.language : '';
  data.grade = !isEmpty(data.grade) ? data.grade: '';
  data.organization = !isEmpty(data.organization) ? data.organization : '';
  data.category = !isEmpty(data.category) ? data.category : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title for book is required';
  }
  if (Validator.isEmail(data.author)) {
    errors.author = 'Book author name is required';
  }
  if(Validator.isEmpty(data.language)) {
    errors.language = 'Enter language in which the book is recorded'
  }

  if(Validator.isEmpty(data.grade)) {
    errors.grade = 'Enter the grade for which book is preferred'
  }
  if(Validator.isEmpty(data.organization)) {
    errors.organization = 'Please enter name of organization'
  }
  if(Validator.isEmpty(data.category)) {
    errors.category = 'Please select a category of the book'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
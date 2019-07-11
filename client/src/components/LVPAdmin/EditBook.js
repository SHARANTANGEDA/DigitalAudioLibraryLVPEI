import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Select from 'react-select'
import TextFieldGroup from '../common/TextFieldGroup'
import Spinner from '../common/Spinner'
import { getBookInfo, updateBook } from '../../actions/accountActions'

class EditBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      language: null,
      grade: '',
      organization: '',
      category: null,
      errors: {}
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onSelectType = this.onSelectType.bind(this)
    this.onSelectLang = this.onSelectLang.bind(this)
  }


  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if(nextProps.account.loading2===false && nextProps.account.book!==null) {
        this.setState({
          title: nextProps.account.book.title,
          author: nextProps.account.book.author,
          language: {value:nextProps.account.book.language, label:nextProps.account.book.language},
          grade: nextProps.account.book.grade,
          organization:  nextProps.account.book.organization,
          category:{ value:nextProps.account.book.category, label: nextProps.account.book.category}
        })
    }
  }
  componentDidMount () {
    this.props.getBookInfo(this.props.bookId)
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSelectLang (e) {
    this.setState({language: e})
  }
  onSelectType (e) {
    this.setState({category: e})
  }
  onSubmit (e) {
    e.preventDefault()
    const userData = {
      title: this.state.title,
      author: this.state.author,
      language: this.state.language.value,
      grade: this.state.grade,
      organization: this.state.organization,
      category: this.state.category.value,
    }
    this.props.updateBook(this.props.bookId,userData)
  }



  render () {
    const { errors } = this.state
    let  categoryArray=[{value: 'School (I – V)', label: 'School (I – V)'},
      {value: 'School (VI – X)', label: 'School (VI – X)'},
      {value: 'Intermediate (XI & XII)', label: 'Intermediate (XI & XII)'},
      {value: 'Undergraduate', label: 'Undergraduate'},
      {value: 'Postgraduate', label: 'Postgraduate'},
      {value: 'Law', label: 'Law'},
      {value: 'Psychology', label: 'Psychology'},
      {value: 'Competitive Exam', label: 'Competitive Exam'},
      {value: 'English Grammar', label: 'English Grammar'},
      {value: 'Children Stories', label: 'Children Stories'},
      {value: 'Religious', label: 'Religious'},
      {value: 'Other', label: 'Other'}]
    let langArray=[{value: 'Arabic', label: 'Arabic'},
      {value: 'Bengali', label: 'Bengali'},
      {value: 'Chinese', label: 'Chinese'},
      {value: 'English', label: 'English'},
      {value: 'French', label: 'French'},
      {value: 'German', label: 'German'},
      {value: 'Hindi', label: 'Hindi'},
      {value: 'Japanese', label: 'Japanese'},
      {value: 'Kannada', label: 'Kannada'},
      {value: 'Korean', label: 'Korean'},
      {value: 'Marathi', label: 'Marathi'},
      {value: 'Portuguese', label: 'Portuguese'},
      {value: 'Russian', label: 'Russian'},
      {value: 'Spanish', label: 'Spanish'},
      {value: 'Tamil', label: 'Tamil'},
      {value: 'Telugu', label: 'Telugu'},
      {value: 'Urdu', label: 'Urdu'}]
    const {loading2, book} = this.props.account
    let profileContent=null
    if(loading2 || book===null) {
      profileContent = (<Spinner/>)
    } else {
        profileContent = (
          <div>
            <div className="col-sm-12">
              <div className="row col-md-12 m-auto">
                <h2>Update Book Information</h2>
              </div>
              <div className="col-md-12 m-auto">
                <form noValidate onSubmit={this.onSubmit}>
                  <div style={{ minWidth: '100px', margin: '10px' }}>
                    <Select options={categoryArray}
                            className={classnames('isSearchable',
                              { 'is-invalid': errors.category })}
                            placeholder="Category"
                            name="category" value={this.state.category} onChange={this.onSelectType}>
                    </Select>
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>
                  <TextFieldGroup placeholder="Enter book title" error={errors.title}
                                  type="text" onChange={this.changeHandler} value={this.state.title} name="title"
                  />
                  <TextFieldGroup placeholder="Enter book author/publication" error={errors.author}
                                  type="text" onChange={this.changeHandler} value={this.state.author} name="author"
                  />
                  <div style={{ minWidth: '100px', margin: '10px'  }}>
                    <Select options={langArray}
                            className={classnames('isSearchable',
                              { 'is-invalid': errors.language })}
                            placeholder="Language"
                            name="category" value={this.state.language} onChange={this.onSelectLang}>
                    </Select>
                    {errors.language && (
                      <div className="invalid-feedback">{errors.language}</div>
                    )}
                  </div>
                  <TextFieldGroup placeholder="Preferred Grade" error={errors.grade}
                                  type="text" onChange={this.changeHandler} value={this.state.grade} name="grade"
                  />
                  <TextFieldGroup placeholder="Organization" error={errors.organization}
                                  type="text" onChange={this.changeHandler} value={this.state.organization} name="organization"
                  />

                  <input type="submit" className="btn btn-info btn-block mt-4"/>
                </form>
              </div>
            </div>
          </div>
        )
    }
    return (
      <div className="container-fluid bootstrap snippet editBook" style={{ maxWidth: '100%' }}>
        {profileContent}
      </div>
    )

  }
}

EditBook.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  bookId: PropTypes.string.isRequired,
  getBookInfo: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  account: state.account
})

export default connect(mapStateToProps,{getBookInfo, updateBook})(EditBook)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import classnames from 'classnames'
import { getSearchResults } from '../../actions/homeActions'

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      category: { value: 'mr.No', label: 'MR No' },
      errors: {},
      search: ''
    }
    this.onCatChange = this.onCatChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    const newSearch = {
      category: this.state.category.value,
      search: this.state.search,
    }
    console.log({search:newSearch})
    if(this.state.category.value==='mr.No') {
      this.props.getSearchResults(newSearch)
    }else if(this.state.category.value==='name') {
      console.log({name:`/nameSearchResults/${this.state.search}`})
      window.location.href=`/nameSearchResults/${this.state.search}`
    }
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log({ [e.target.name]: e.target.value })

  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onCatChange (e) {
    console.log({ category: e })
    this.setState({ category: e })
  }



  render () {
    const {results, loading} = this.props.search
    if(loading || results ===null) {

    }else {
      console.log({results:results})
      if(!results.success) {
        window.location.href='/detailsNotFound'
      } else {
        if(results.mrNo!==null) {
          window.location.href=`/displayFolder/${results.mrNo}`
        }
      }
    }
    const { category, errors } = this.state

    return (
        <div className="row container-fluid d-flex justify-content-between col-md-6">
          <div className=" input-group md-form form-sm form-2 pl-0" style={{ width: '500px', maxWidth: '700px' }}>
            <div style={{ minWidth: '100px' }}>
              <Select options={[{ value: 'mr.No', label: 'MR No' },{value:'name', label: 'Name'}]}
                      className={classnames('isSearchable',
                        { 'is-invalid': errors.category })}
                      placeholder="Category"
                      name="category" value={category} onChange={this.onCatChange}>
              </Select>
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>
            <input type="text"
                   className={classnames('form-control my-0 py-1 lime-border', { 'is-invalid': errors.search })}
                   placeholder="Search"
                   name="search"
                   value={this.state.search} onChange={this.onChange}/>
            {errors.search && (<div className="invalid-feedback">{errors.search}</div>
            )}
            <div className="input-group-append">
              <button type="submit" onClick={this.onSubmit} className="input-group-text cyan lighten-2">
                <i className="fas fa-search text-grey" aria-hidden="true"/>
              </button>
            </div>
          </div>
        </div>
    )
  }
}

SearchBar.propTypes = {
  auth: PropTypes.object.isRequired,
  getSearchResults: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
})

export default connect(mapStateToProps, {getSearchResults })(SearchBar)

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import { getAllBooks, loginUser } from '../../actions/authActions'
import Spinner from '../common/Spinner'
import Select from 'react-select'
import TableItem from '../PublicHome/Single/TableItem'
import ProductCard from '../PublicHome/ProductCard/ProductCard'

class Landing extends Component {
  constructor () {
    super();
    this.state = {
      emailId: '',
      password: '',
      currentPage: 1,
      todosPerPage: 25,
      category: null,
      errors: {}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectType = this.onSelectType.bind(this)

  }
  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount () {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }else {
      this.props.getAllBooks(this.props.match.params.id)
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if(nextProps) {
      this.setState({errors: nextProps.errors})
    }
  }
  onSelectType (e) {
    this.setState({category: e})
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      emailId: this.state.emailId,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    let categoryArray=[{value: 'School (I – V)', label: 'School (I – V)'},
      {value: 'School (VI – X)', label: 'School (VI – X)'},
      {value: 'Intermediate (XI & XII)', label: 'Intermediate (XI & XII)'},
      {value: 'Undergraduate', label: 'Undergraduate'},
      {value: 'Postgraduate', label: 'P`ostgraduate'},
      {value: 'Law', label: 'Law'},
      {value: 'Psychology', label: 'Psychology'},
      {value: 'Competitive Exam', label: 'Competitive Exam'},
      {value: 'English Grammar', label: 'English Grammar'},
      {value: 'Children Stories', label: 'Children Stories'},
      {value: 'Religious', label: 'Religious'},
      {value: 'Other', label: 'Other'}]
    const {errors} = this.state;
    const {loading, land} = this.props.auth
    const {  currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const pageNumbers = [];
    let allFoldersContent=null, heading, renderpn,noContent=null, spinner=null;
    if (loading || land===null) {
      spinner = (<Spinner/>)
    } else {
      if(land.all.length===0) {
        spinner=null
        noContent = (
          <h5>Nothing is uploaded yet, please check back later</h5>
        )
        heading=null
      }else {
        // allFoldersContent = (
        console.log(land.all)
        heading=null
        if(this.state.category===null || this.state.category.value==='all') {
          const currentFolder = land.all.slice(indexOfFirstTodo, indexOfLastTodo);
          const render = (  currentFolder.map(land => (
            <ProductCard folder={land} key={land._id}/>
            // <TableItem folder={land} key={land._id}/>
          )))
          for (let i = 1; i <= Math.ceil(land.all.length / todosPerPage); i++) {
            pageNumbers.push(i);
          }
          const renderPageNumbers = (
            pageNumbers.map(number => {
              return (
                <button className='page-item page-link'
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                >
                  {number}
                </button>
              );
            }))
          allFoldersContent=render
          renderpn = (
            <nav aria-label="...">
              <ul className="pagination pagination-sm">
                {renderPageNumbers}
              </ul>
            </nav>

          )

        } else {
          let newFolders = land.all.filter(folder => folder.category === this.state.category.value.toString())
          const currentFolder = newFolders.slice(indexOfFirstTodo, indexOfLastTodo);
          const render = (  currentFolder.map(folder => (
            <TableItem folder={land} key={land._id}/>
          )))
          for (let i = 1; i <= Math.ceil(newFolders.length / todosPerPage); i++) {
            pageNumbers.push(i);
          }
          const renderPageNumbers = pageNumbers.map(number => {
            return (
              <button className='page-item page-link'
                      key={number}
                      id={number}
                      onClick={this.handleClick}
              >
                {number}
              </button>
            );
          })
          allFoldersContent=render
          renderpn = (
            <nav aria-label="...">
              <ul className="pagination pagination-sm">
                {renderPageNumbers}
              </ul>
            </nav>

          )
        }
      }
    }
    return (
      <div className='container-fluid'>
        <div className="displayFolder " style={{width:'100%'}}>
          <div className=" row d-flex justify-content-start" >
            <nav className='navbar navbar-expand-sm justify-content-between col-md-12' style={{ background:'#ffa726', width:'100%', height:'40px'}}>
              {heading}
              <div className='col-md-4'>
                <Select
                  options={categoryArray}
                  className='isSearchable' placeholder="Select a book category to filter"
                  name="category" value={this.state.category} onChange={this.onSelectType}>
                </Select>
              </div>
            </nav>
            <div className='d-flex row justify-content-start' style={{margin:'20px', padding:'5px'}}>
              {allFoldersContent}
            </div>

            {/*<table className="table table-bordered  mb-0">*/}
            {/*  <thead>*/}
            {/*  <tr>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Category</th>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Book Title</th>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Number of Tracks</th>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Language</th>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Author</th>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Grade</th>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Download</th>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>View</th>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Rate</th>*/}
            {/*    <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Share</th>*/}
            {/*  </tr>*/}
            {/*  </thead>*/}
            {/*  <tbody>*/}
            {/*  </tbody>*/}
            {/*</table>*/}
            {noContent}
            {spinner}
          </div>
          <div className='d-flex justify-content-end'>
            {renderpn}
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser:PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors

});

export default connect(mapStateToProps,{loginUser,getAllBooks})(Landing);

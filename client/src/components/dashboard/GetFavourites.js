import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFavBooks } from '../../actions/homeActions'
import Spinner from '../common/Spinner'
import TableItem from '../PublicHome/Single/TableItem'
import Select from 'react-select'
import Warning from '../layout/Warning'


class GetFavourites extends Component {
  constructor () {
    super()
    this.state = {
      patient: '',
      errors: {},
      modalIsOpen: false,
      uploadModal: false,
      category: { value: 'all', label: 'Choose book Category to filter' },
      campusCode: { value: 'all', label: 'Choose Campus' },
      currentPage: 1,
      todosPerPage: 25,
      filter: null
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closeFlushModal = this.closeFlushModal.bind(this)
    this.onDiscard = this.onDiscard.bind(this)
    this.onSelectType = this.onSelectType.bind(this)
    this.codeSelect = this.codeSelect.bind(this)
  }

  componentDidMount () {
      this.props.getFavBooks(this.props.match.params.id)
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }



  afterOpenModal () {

  }

  onDiscard () {
    this.setState({ modalIsOpen: false, patient: '' })
    const mid = {
      mid: this.props.home.mid.mid
    }
    this.props.deleteResidual(mid)
  }

  closeFlushModal () {
    this.setState({ modalIsOpen: false, patient: '' })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSelectType (e) {
    this.setState({category: e})
  }
  codeSelect(e) {
    this.setState({campusCode: e})
  }

  render () {
    if(this.props.auth.user.role==='world') {
      let categoryArray=[{value:'all', label: 'all'},{value: 'School (I – V)', label: 'School (I – V)'},
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
      const {loading2, getFav} = this.props.report
      const {  currentPage, todosPerPage } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const pageNumbers = [];
      let allFoldersContent, heading, renderpn;
      console.log({getout: getFav})
      if (loading2 || getFav===null) {
        allFoldersContent = (<Spinner/>)
      } else {
        console.log({get: getFav})
        if(getFav.length===0) {
          allFoldersContent = (
            <h5>No favourites add one</h5>
          )
          heading=null
        }else {
          // allFoldersContent = (
          heading = null
          if(this.state.category===null || this.state.category.value==='all') {
            const currentFolder = getFav.slice(indexOfFirstTodo, indexOfLastTodo);
            const render = (  currentFolder.map(land => (
              <TableItem folder={land} key={land._id}/>
            )))
            for (let i = 1; i <= Math.ceil(getFav.length / todosPerPage); i++) {
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
            let newFolders = getFav.filter(folder => folder.category === this.state.category.value.toString())
            const currentFolder = newFolders.slice(indexOfFirstTodo, indexOfLastTodo);
            const render = (  currentFolder.map(folder => (
              <TableItem folder={folder} key={folder._id}/>
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
        <div className='container-fluid' style={{minWidth:'100%', padding: '0px'}}>
          <div className="displayFolder ">
            <div className="App-content row d-flex justify-content-center" >
              {!this.props.auth.user.verified ? <Warning/>: null}
              <nav className='navbar navbar-expand-sm justify-content-between col-md-12' style={{ background:'#ffa726', width:'100%', height:'40px'}}>
                {heading}
                <div className='col-md-3'>
                  <Select
                    options={categoryArray}
                    className='isSearchable' placeholder="Select a book category to filter"
                    name="category" value={this.state.category} onChange={this.onSelectType}>
                  </Select>
                </div>
              </nav>

              <table className="table table-bordered  mb-0">
                <thead>
                <tr>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Category</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Book Title</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Number of Tracks</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Language</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Author</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Grade</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>View</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Favourite</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Rating</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Rate</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Share</th>

                </tr>
                </thead>
                <tbody>
                {allFoldersContent}
                </tbody>
              </table>
            </div>
            <div className='d-flex justify-content-end'>
              {renderpn}
            </div>
          </div>
        </div>
      );
    }
  }
}

GetFavourites.propTypes = {
  home: PropTypes.object.isRequired,
  getFavBooks: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  home: state.home,
  auth: state.auth,
  report: state.report
})
export default connect(mapStateToProps, {getFavBooks})(GetFavourites)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import Select from 'react-select'
import { getReportData } from '../../actions/sAActions'
import ReportItem from './tableDisplay/ReportItem'
import { getReports } from '../../actions/homeActions'


class Report extends Component {
  constructor () {
    super()
    this.state = {
      patient: '',
      errors: {},
      modalIsOpen: false,
      uploadModal: false,
      currentPage: 1,
      todosPerPage: 25,
      category: null
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closeFlushModal = this.closeFlushModal.bind(this)
    this.openNextModal = this.openNextModal.bind(this)
    this.onDiscard = this.onDiscard.bind(this)
    this.onSelectType = this.onSelectType.bind(this)
    this.codeSelect = this.codeSelect.bind(this)
    this.onConvertToExcel = this.onConvertToExcel.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    if (this.props.auth.user.role === 'super_admin' ) {
      this.props.getReportData(this.props.match.params.id)
    }
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }

  onConvertToExcel () {
    this.props.getReports(this.props.match.params.id)
  }

  openNextModal () {
    this.setState({ uploadModal: true })
    const userData = {
      patient: this.state.patient
    }
    this.props.continueToUpload(userData)
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
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
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
    if(this.props.auth.user.role==='super_admin') {
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
      const {loading, report} = this.props.report
      const {  currentPage, todosPerPage } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const pageNumbers = [];
      let allFoldersContent,  renderpn;
      if (loading || report===null) {
        allFoldersContent = (<Spinner/>)
      } else {
        if(report.length===0) {
          allFoldersContent = (
            <h5>Nothing is uploaded yet, please check back later</h5>
          )
        }else {
          // allFoldersContent = (

          if(this.state.category===null || this.state.category.value==='all') {
            const currentFolder =report.slice(indexOfFirstTodo, indexOfLastTodo);
            const render = (  currentFolder.map(report => (
              <ReportItem folder={report} key={report._id}/>
              //{/*<ProductCard folder={land} key={land._id}/>*/}
            )))
            for (let i = 1; i <= Math.ceil(report.length / todosPerPage); i++) {
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
            let newFolders = report.filter(folder => folder.category === this.state.category.value.toString())
            const currentFolder = newFolders.slice(indexOfFirstTodo, indexOfLastTodo);
            const render = (  currentFolder.map(folder => (
              <ReportItem folder={folder} key={folder._id}/>
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
              <nav className='navbar navbar-expand-sm justify-content-between col-md-12'
                   style={{ background:'#ffa726', width:'100%', height:'40px'}}>
                  <button className='btn btn-primary' onClick={this.onConvertToExcel}
                      style={{ background: '#30ff00', color: 'white', borderStyle: 'solid', marginRight:'10px' }}>
                Convert to Excel</button>
              <div className='col-md-4'>
                <Select
                  options={categoryArray}
                  className='isSearchable' placeholder="Select a book category to filter"
                  name="category" value={this.state.category} onChange={this.onSelectType}>
                </Select>
              </div>
            </nav>
              <table className="table table-bordered  mb-0" style={{minWidth:'100%'}}>
                <thead>
                <tr>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Category</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Book Title</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Language</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Author/Publication</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Tracks</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Number of Downloads</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Number of Plays</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Favourites</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Rating</th>
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

Report.propTypes = {
  getReportData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  getReports: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  report: state.report
})
export default connect(mapStateToProps, {getReportData, getReports})(Report)

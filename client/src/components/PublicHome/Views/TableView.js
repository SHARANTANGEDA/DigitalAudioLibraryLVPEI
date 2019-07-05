import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Collapse } from 'react-collapse'
import Spinner from '../../common/Spinner'

class TableView extends Component {


  render () {
    const { patients } = this.props
    let content;
    if(patients===null) {
      content=(<Spinner/>)
    } else {
      const {  currentPage, todosPerPage } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const pageNumbers = [];
      let content,renderpn=null;
      if (patients.length === 0) {
        content = (
          <h5> Nothing is uploaded/modified in this time</h5>
        )
      } else {
        if (this.props.category === 'all') {
          const currentFolder = patients.slice(indexOfFirstTodo, indexOfLastTodo);
          const render = (currentFolder.map(folder => (
            <PatientItem patient={folder} key={folder.mrNo}/>
          )))
          for (let i = 1; i <= Math.ceil(patients.length / todosPerPage); i++) {
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
          content = (
            <tbody>
            {render}
            </tbody>
          )
          renderpn = (
            <nav aria-label="...">
              <ul className="pagination pagination-sm">
                {renderPageNumbers}
              </ul>
            </nav>
          )
        } else {
          let newFolders = patients.filter(folder => folder.centreCode === this.props.category.toString())
          const currentFolder = newFolders.slice(indexOfFirstTodo, indexOfLastTodo);
          const render = (currentFolder.map(folder => (
            <PatientItem patient={folder} key={folder.mrNo}/>
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
          content = (
            <tbody>
            {render}
            </tbody>
          )
          renderpn = (
            <nav aria-label="...">
              <ul className="pagination pagination-sm">
                {renderPageNumbers}
              </ul>
            </nav>
          )
        }
      }
      if(patients.length===0) {
        content=(
          <h5> Nothing is uploaded/modified in this time</h5>
        )
      }else {
        console.log(this.props.category)
      }
    }
    return (
      <div style={{width: '100%'}}>
        <div style={{width: '100%'}}>
          <table className="table table-bordered mb-0" >
            <thead>
            <tr>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Category</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Book Title</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Number of Tracks</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Language</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Author</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Grade</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Download</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Play</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Rate</th>
              <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Share</th>
            </tr>
            </thead>
          </table>
        </div>
      </div>

    )
  }
}

TableView.defaultProps = {
  showActions: true
}

TableView.propTypes = {
  auth: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(TableView)

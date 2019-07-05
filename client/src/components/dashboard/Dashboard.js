import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSADetails } from '../../actions/homeActions'
import Spinner from '../common/Spinner'
import Card from '@material-ui/core/Card'
import TableItem from '../PublicHome/Single/TableItem'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { getAllBooks } from '../../actions/authActions'
import Warning from '../layout/Warning'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '0',
    transform: 'translate(-50%, -50%)'
  }
}

class Dashboard extends Component {
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
    this.openNextModal = this.openNextModal.bind(this)
    this.onDiscard = this.onDiscard.bind(this)
    this.onSelectType = this.onSelectType.bind(this)
    this.codeSelect = this.codeSelect.bind(this)
  }

  componentDidMount () {
    if (this.props.auth.user.role === 'super_admin' || this.props.auth.user.role === 'lvpei') {
      this.props.getSADetails(this.props.match.params.id)
    }else if(this.props.auth.user.role === 'world') {
      this.props.getAllBooks(this.props.match.params.id)
    }
  }

  openModal () {
    this.setState({ modalIsOpen: true })
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
    if (this.props.auth.user.role === 'lvpei' || this.props.auth.user.role === 'super_admin') {
      const { loading, home } = this.props.home
      let showContent=null
      if (loading || home === null) {
        showContent = <Spinner/>
      } else {
        console.log({home: home})
        let { lvpei, world, school1, inter,
          school2,ug, law,psy,pg, ce, eg, cs, reg, ot, all} = home
        showContent = (
          <div className=' ' style={{minWidth:'100%', minHeight:'100%'}}>
            <div className='row d-flex justify-content-between' style={{margin: '5px'}}>
              <Card style={{
                backgroundColor: '#f44336', marginRight: '20px', padding:'5px', minWidth:'250px'//, maxHeight:
                // '100px',
                // maxWidth:
                // '250px'
              }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p style={{ color: 'white' }}>LVPEI Users</p>
                    <img style={{width:'auto'}} src={require('../../img/SAIcons/doctor.png')} alt=''/>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                      {lvpei.length}
                    </h1>
                  </div>
                </div>
              </Card>
              <Card style={{
                backgroundColor: '#00acc1', marginRight: '20px', padding:'5px', minWidth:'255px' }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p style={{ color: 'white' }}>Users across world</p>
                    <img style={{width:'50px', maxHeight:'50px'}} src={require('../../img/SAIcons/customers.png')} alt=''/>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                      {world.length}
                    </h1>
                  </div>
                </div>
              </Card>
              <Card style={{
                backgroundColor: '#4caf50', marginRight: '20px', padding:'5px', minWidth:'250px'
              }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-8'>
                    <p style={{ color: 'white' }}>Total Books</p>
                    <img style={{width:'auto'}} src={require('../../img/SAIcons/centerUser.png')} alt=''/>
                  </div>
                  <div className='d-flex justify-content-end col-md-4'>
                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                      {all.length}
                    </h1>
                  </div>
                </div>
              </Card>
            </div>
            <div style={{
              backgroundColor: '#d4d4d4', marginRight: '20px', padding:'5px', minWidth:'250px' }}
                 className='row  d-flex justify-content-between'>
              <div className='col-6 col-md-3'>
                <Card style={{ color: 'black',
                  margin: '5px', padding:'5px', minWidth:'250px', height:'100px'
                }}>
                  <div className='row'>
                    <div className='d-flex justify-content-start col-md-9'>
                      <p >School (I – V)</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-3 pull-right'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {school1.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card  style={{
                  color: 'black', margin: '5px', padding:'5px', minWidth:'250px', height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >School (VI – X)</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {school2.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card  style={{
                  color: 'black', margin: '5px', padding:'5px', minWidth:'250px', height:'100px'
                }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >Intermediate (XI & XII)</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {inter.length}
                      </h1>
                    </div>
                  </div>
                </Card>
              </div>
              <div className='col-6 col-md-3'>
                <Card  style={{color: 'black', margin: '5px', padding:'5px', minWidth:'250px'
                  , height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >Undergraduate</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {ug.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card  style={{color: 'black', margin: '5px', padding:'5px', minWidth:'250px'
                  , height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >Postgraduate</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {pg.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card  style={{color: 'black', margin: '5px', padding:'5px', minWidth:'250px'
                  , height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >Law</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{ fontWeight: 'bold' }}>
                        {law.length}
                      </h1>
                    </div>
                  </div>
                </Card>
              </div>
              <div className='col-6 col-md-3'>
                <Card  style={{color: 'black', margin: '5px', padding:'5px', minWidth:'250px'
                  , height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >Psychology</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {psy.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card  style={{color: 'black', margin: '5px', padding:'5px', minWidth:'250px'
                  , height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >Competitive Exam</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{ fontWeight: 'bold' }}>
                        {ce.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card  style={{color: 'black',margin: '5px', padding:'5px', minWidth:'250px'
                  , height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >English Grammar</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {eg.length}
                      </h1>
                    </div>
                  </div>
                </Card>
              </div>
              <div className='col-6 col-md-3' >
                <Card  style={{color: 'black', margin: '5px', padding:'5px', minWidth:'250px'
                  , height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >Children Stories</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{ fontWeight: 'bold' }}>
                        {cs.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card  style={{color: 'black', margin: '5px', padding:'5px', minWidth:'250px'
                  , height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >Religious</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {reg.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card style={{color: 'black', margin: '5px', padding:'5px', minWidth:'250px'
                  , height:'100px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-8'>
                      <p >Others</p>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{ fontWeight: 'bold' }}>
                        {ot.length}
                      </h1>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

          </div>
        )
      }
          return (
            <div>
              {showContent}
              <footer className="text-white mt-5 p-4 text-center" style={{ height:'40px ',left:0,
                bottom:0,background:'#008cff',
                right:0}}>
                Copyright &copy; {new Date().getFullYear()} L V Prasad Eye Institute
              </footer>
            </div>
          )
    }else if(this.props.auth.user.role==='world') {
      let categoryArray=[{value:'all', label: 'all'},{value: 'School (I – V)', label: 'School (I – V)'},
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
      const {loading, land} = this.props.auth
      const {  currentPage, todosPerPage } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const pageNumbers = [];
      let allFoldersContent, heading, renderpn;
      if (loading || land===null) {
        allFoldersContent = (<Spinner/>)
      } else {
        if(land.all.length===0) {
          allFoldersContent = (
            <h5>Nothing is uploaded yet, please check back later</h5>
          )
          heading=null
        }else {
          // allFoldersContent = (
          heading = null

          if(this.state.category===null || this.state.category.value==='all') {
            const currentFolder = land.all.slice(indexOfFirstTodo, indexOfLastTodo);
            const render = (  currentFolder.map(land => (
              <TableItem folder={land} key={land._id}/>
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
        <div>
          <div className="displayFolder">
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

                <Link to='/dashboard' className='btn' style={{background:'#ffa726', color: 'green'}}>
                  BACK</Link>
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
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Download</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>View</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Important</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Rating</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Rate</th>
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

Dashboard.propTypes = {
  home: PropTypes.object.isRequired,
  getSADetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  folder: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  home: state.home,
  auth: state.auth,
  folder: state.folder
})
export default connect(mapStateToProps, {getSADetails, getAllBooks})(Dashboard)

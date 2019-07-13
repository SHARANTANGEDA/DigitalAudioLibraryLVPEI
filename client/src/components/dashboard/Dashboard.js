import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSADetails } from '../../actions/homeActions'
import Spinner from '../common/Spinner'
import Card from '@material-ui/core/Card'
import TableItem from '../PublicHome/Single/TableItem'
import Select from 'react-select'
import { getAllBooks } from '../../actions/authActions'
import Warning from '../layout/Warning'

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

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
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
    function sort_by_key(array, key)
    {
      return array.sort(function(a, b)
      {
        let x = a[key]; let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
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
                backgroundColor: '#f44336', marginRight: '20px', padding:'5px', minWidth:'380px'//, maxHeight:
                // '100px',
                // maxWidth:
                // '250px'
              }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-4'>
                    <p style={{ color: 'white' }}>LVPEI Users</p>
                    <img style={{width:'auto'}} src={require('../../img/SAIcons/doctor.png')} alt=''/>
                  </div>
                  <div className='d-flex justify-content-end col-md-8'>
                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                      {lvpei.length}
                    </h1>
                  </div>
                </div>
              </Card>
              <Card style={{
                backgroundColor: '#00acc1', marginRight: '20px', padding:'5px', minWidth:'450px' }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-5'>
                    <p style={{ color: 'white' }}>Users across world</p>
                    <img style={{width:'65px', maxHeight:'90px'}} src={require('../../img/SAIcons/customers.png')} alt=''/>
                  </div>
                  <div className='d-flex justify-content-end col-md-7'>
                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                      {world.length}
                    </h1>
                  </div>
                </div>
              </Card>
              <Card style={{
                backgroundColor: '#4caf50', marginRight: '20px', padding:'5px', minWidth:'380px'
              }}>
                <div className='row d-flex justify-content-between'>
                  <div className=' col-md-4'>
                    <p style={{ color: 'white' }}>Total Books</p>
                    <img style={{width:'60px'}} src={require('../../img/icons/audioBook.png')} alt=''/>
                  </div>
                  <div className='d-flex justify-content-end col-md-8'>
                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>
                      {all.length}
                    </h1>
                  </div>
                </div>
              </Card>
            </div>
            <div style={{
              backgroundColor: '#d4d4d4', marginRight: '20px', padding:'5px', minWidth:'380px' }}
                 className='row  d-flex justify-content-between'>
              <div className='col-6 col-md-4'>
                <Card className='DashCard' style={{
                  margin: '5px', padding:'5px', minWidth:'380px'
                }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-4'>
                      <p >School (I – V)</p>
                      <img style={{width:'60px'}} src={require('../../img/icons/school.png')} alt=''/>
                    </div>
                    <div className='d-flex justify-content-end col-md-8'>
                      <h1 style={{  fontWeight: 'bold' }}>
                        {school1.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card className='DashCard' style={{
                  color: 'black', margin: '5px', padding:'5px', minWidth:'380px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-5'>
                      <p >School (VI – X)</p>
                      <img style={{width:'60px'}} src={require('../../img/icons/school.png')} alt=''/>
                    </div>
                    <div className='d-flex justify-content-end col-md-7'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {school2.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card className='DashCard' style={{
                  color: 'black', margin: '5px', padding:'5px', minWidth:'380px'
                }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-6'>
                      <p >Intermediate (XI & XII)</p>
                      <img style={{width:'60px'}} src={require('../../img/icons/school.png')} alt=''/>

                    </div>
                    <div className='d-flex justify-content-end col-md-6'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {inter.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card className='DashCard' style={{color: 'black', margin: '5px', padding:'5px', minWidth:'380px'
                  }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-6'>
                      <p >Undergraduate</p>
                      <img style={{width:'90px'}} src={require('../../img/icons/graduate.png')} alt=''/>

                    </div>
                    <div className='d-flex justify-content-end col-md-6'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {ug.length}
                      </h1>
                    </div>
                  </div>
                </Card>
              </div>
              <div className='col-6 col-md-4'>

                <Card className='DashCard' style={{color: 'black', margin: '5px', padding:'5px', minWidth:'380px'
                  }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-4'>
                      <p >Postgraduate</p>
                      <img style={{width:'90px'}} src={require('../../img/icons/graduate.png')} alt=''/>
                    </div>
                    <div className='d-flex justify-content-end col-md-8'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {pg.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card className='DashCard' style={{color: 'black', margin: '5px', padding:'5px', minWidth:'380px'
                  }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-4'>
                      <p >Law</p>
                      <img style={{width:'60px'}} src={require('../../img/icons/hammer.png')} alt=''/>
                    </div>
                    <div className='d-flex justify-content-end col-md-4'>
                      <h1 style={{ fontWeight: 'bold' }}>
                        {law.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card className='DashCard'  style={{color: 'black', margin: '5px', padding:'5px', minWidth:'380px'
                 }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-4'>
                      <p >Psychology</p>
                      <img style={{width:'50px'}} src={require('../../img/icons/psy.png')} alt=''/>
                    </div>
                    <div className='d-flex justify-content-end col-md-8'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {psy.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card className='DashCard' style={{color: 'black', margin: '5px', padding:'5px', minWidth:'380px'
                  }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-6'>
                      <p >Competitive Exam</p>
                      <img style={{width:'60px'}} src={require('../../img/icons/competitveExam.png')} alt=''/>

                    </div>
                    <div className='d-flex justify-content-end col-md-6'>
                      <h1 style={{ fontWeight: 'bold' }}>
                        {ce.length}
                      </h1>
                    </div>
                  </div>
                </Card>
              </div>
              <div className='col-6 col-md-4'>

                <Card className='DashCard' style={{color: 'black',margin: '5px', padding:'5px', minWidth:'380px'
                  }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-5'>
                      <p >English Grammar</p>
                      <img style={{width:'58px'}} src={require('../../img/icons/alpha.png')} alt=''/>

                    </div>
                    <div className='d-flex justify-content-end col-md-7'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {eg.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card className='DashCard' style={{color: 'black', margin: '5px', padding:'5px', minWidth:'380px'
                  }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-5'>
                      <p >Children Stories</p>
                      <img style={{width:'80px'}} src={require('../../img/icons/stories.png')} alt=''/>

                    </div>
                    <div className='d-flex justify-content-end col-md-7'>
                      <h1 style={{ fontWeight: 'bold' }}>
                        {cs.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card className='DashCard' style={{color: 'black', margin: '5px', padding:'5px', minWidth:'380px'
                  }}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-4'>
                      <p >Religious</p>
                      <img style={{width:'60px'}} src={require('../../img/icons/world.png')} alt=''/>
                    </div>
                    <div className='d-flex justify-content-end col-md-8'>
                      <h1 style={{fontWeight: 'bold' }}>
                        {reg.length}
                      </h1>
                    </div>
                  </div>
                </Card>
                <Card className='DashCard' style={{color: 'black', margin: '5px', padding:'5px', minWidth:'380px'}}>
                  <div className='row d-flex justify-content-between'>
                    <div className=' col-md-4'>
                      <p >Others</p>
                      <img style={{width:'60px'}} src={require('../../img/icons/others.png')} alt=''/>
                    </div>
                    <div className='d-flex justify-content-end col-md-8'>
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
              <footer className="text-white mt-5 p-4 text-center" style={{ height:'30px ',left:0,
                bottom:0,background:'#008cff',minWidth: '100%',
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
        {value: 'Postgraduate', label: 'Postgraduate'},
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
             // <ProductCard folder={land} key={land._id}/>
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
            let currentFolder = newFolders.slice(indexOfFirstTodo, indexOfLastTodo);
            // const sortByKey = (array, key) => array.sort(function (a, b) {
            //   let x = a[key];
            //   let y = b[key];
            //   // (x < y) ? -1 : ((x > y) ? 1 : 0)
            //   return (x<y);
            // })
            currentFolder = sort_by_key(currentFolder, 'title');
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
          <div className="displayFolder " >
            <div className="App-content row d-flex justify-content-center" >
              {!this.props.auth.user.verified ? <Warning/>: null}
              <nav className='navbar navbar-expand-sm justify-content-between col-md-12' style={{ background:'#ffa726',
                width:'100%', height:'40px'}}>
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
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1', minWidth:'200px'}}>Book Title</th>
                  <th scope="col" style={{ fontSize: '10pt', background:'#c1c1c1'}}>Tracks</th>
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

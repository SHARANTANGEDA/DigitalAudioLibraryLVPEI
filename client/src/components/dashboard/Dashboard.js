import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSADetails } from '../../actions/homeActions'
import Spinner from '../common/Spinner'
import Card from '@material-ui/core/Card'
import { getAllBooks, getCatalogue } from '../../actions/authActions'
import { Link } from 'react-router-dom'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

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
      filter: null,

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
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    if (this.props.auth.user.role === 'super_admin' || this.props.auth.user.role === 'lvpei') {
      this.props.getSADetails(this.props.match.params.id)
    }else if(this.props.auth.user.role === 'world') {
      this.props.getCatalogue(this.props.match.params.id)
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
        let x = a[key].toUpperCase(); let y = b[key].toUpperCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
    if (this.props.auth.user.role === 'lvpei' || this.props.auth.user.role === 'super_admin') {
      const { loading, home } = this.props.home
      let showContent=null
      if (loading || home === null) {
        showContent = <Spinner/>
      } else {
        // console.log({home: home})
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
                <Link to='/dashboard/School (I – V)' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/School (VI – X)' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
                  <Card className='DashCard' style={{
                    color: 'black', margin: '5px', padding:'5px', minWidth:'380px'}}>
                    <div className='row d-flex justify-content-between'>
                      <div className=' col-md-5'>
                        <p >School (VI – X)</p>
                        <img style={{width:'60px'}} src={require('../../img/icons/school.png')} alt=''/>
                      </div>
                      <div className='d-flex justify-content-end col-md-7'>
                        <h1 style={{ fontWeight: 'bold' }}>
                          {school2.length}
                        </h1>
                      </div>
                    </div>
                  </Card>
                </Link>
                <Link to='/dashboard/Intermediate (XI & XII)' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Undergraduate' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
              </div>
              <div className='col-6 col-md-4'>
                <Link to='/dashboard/Postgraduate' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Law' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Psychology' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Competitive Exam' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
              </div>
              <div className='col-6 col-md-4'>
                <Link to='/dashboard/English Grammar' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Children Stories' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Religious' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Other' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
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

      const { loading2, cat } = this.props.auth
      let showContent=null
      if (loading2 || cat === null) {
        showContent = <Spinner/>
      } else {
        let {school1, inter,
          school2,ug, law,psy,pg, ce, eg, cs, reg, ot, all} = cat
        showContent = (
          <div className=' ' style={{minWidth:'100%', minHeight:'100%'}}>
            <div className='row d-flex justify-content-center' style={{margin: '5px'}}>
              <Link to='/home/all' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
                <Card style={{
                  backgroundColor: '#4caf50', marginRight: '20px', padding:'5px', minWidth:'450px'
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
              </Link>
            </div>
            <div style={{
              backgroundColor: '#d4d4d4', marginRight: '20px', padding:'5px', minWidth:'380px' }}
                 className='row  d-flex justify-content-between'>
              <div className='col-6 col-md-4'>
                <Link to='/dashboard/School (I – V)' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/School (VI – X)' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
                  <Card className='DashCard' style={{
                    color: 'black', margin: '5px', padding:'5px', minWidth:'380px'}}>
                    <div className='row d-flex justify-content-between'>
                      <div className=' col-md-5'>
                        <p >School (VI – X)</p>
                        <img style={{width:'60px'}} src={require('../../img/icons/school.png')} alt=''/>
                      </div>
                      <div className='d-flex justify-content-end col-md-7'>
                        <h1 style={{ fontWeight: 'bold' }}>
                          {school2.length}
                        </h1>
                      </div>
                    </div>
                  </Card>
                </Link>
                <Link to='/dashboard/Intermediate (XI & XII)' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Undergraduate' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
              </div>
              <div className='col-6 col-md-4'>
                <Link to='/dashboard/Postgraduate' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Law' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Psychology' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Competitive Exam' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
              </div>
              <div className='col-6 col-md-4'>
                <Link to='/dashboard/English Grammar' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Children Stories' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Religious' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
                <Link to='/dashboard/Other' style={{borderStyle:'none', margin:'0px', padding:'0px',color:'black'}}>
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
                </Link>
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
    }
    }
}

Dashboard.propTypes = {
  home: PropTypes.object.isRequired,
  getSADetails: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  folder: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired,
  getCatalogue: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  home: state.home,
  auth: state.auth,
  folder: state.folder
})
export default connect(mapStateToProps, {getSADetails, getAllBooks, getCatalogue})(Dashboard)

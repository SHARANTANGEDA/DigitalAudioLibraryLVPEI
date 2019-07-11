import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { getSearchResults } from '../../actions/homeActions'

class Navbar extends Component {
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
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
      window.location.href=`/nameSearchResults/${this.state.search}`
    }
  }

  openModal () {
    this.setState({ modalIsOpen: true })
  }
  afterOpenModal () {

  }

  closeModal () {
    this.setState({ modalIsOpen: false })
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

  onLogoutClick (e) {
    e.preventDefault()
    this.props.logoutUser()
  }


  render () {
    const { isAuthenticated, user } = this.props.auth
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
    const authLinkO = (
      <div className='d-flex justify-content-between align-content-end col-md-12'>
        <div  className="row col-md-6 d-flex justify-content-start align-items-center"
             style={{color:'white', verticalAlign: 'bottom'}}>
          <Link to='/dashboard'> <img style={{ maxWidth: '100px', maxHeight: '100px' }}
                            src={require('../../img/image.png')} alt=""/></Link>
         <h2>{' '}L V Prasad Eye Institute</h2>

        </div>
        <div className="row d-flex justify-content-end align-items-center" style={{color:'white'}}>
          <img style={{ maxWidth: '200px', maxHeight: '150px' }}
               src={require('../../img/invertedEye.png')} alt=""
          />
          <h3>Digital Audio Library</h3>
        </div>
      </div>

    )
    const guestLinkO = (
      <div className='d-flex justify-content-between align-content-end col-md-12'>
        <div className="row col-md-6 d-flex justify-content-start align-items-center"
             style={{color:'white', verticalAlign: 'bottom'}}>
          <Link to='/'> <img style={{ maxWidth: '130px', maxHeight: '130px' }}
                                      src={require('../../img/image.png')} alt=""/></Link>
          <h3>  {' '}L V Prasad Eye Institute</h3>

        </div>
        <div className="row d-flex justify-content-end align-items-center" style={{color:'white'}}>
          <img style={{ maxWidth: '200px', maxHeight: '150px' }}
               src={require('../../img/invertedEye.png')} alt=""
          />
          <h3>Digital Audio Library</h3>
        </div>
      </div>
    )
    const guestLink1 = (
      <ul className="navbar-nav components d-flex justify-content-around" style={{ height: '100%' }}>
        <li className='nav-item' style={{color: 'white',background:'#008cff' , borderRadius: '5px'
        }}>
          <Link className="nav-link" to="/home"
                style={{color: 'white', borderRadius: '5px' }}>
            {' '}View Audio Books</Link>
        </li>
        <li className='nav-item' style={{color: 'white',background:'#008cff' , borderRadius: '5px'
           }}>
          <Link className="nav-link" to="/"
                style={{color: 'white', borderRadius: '5px' }}>
            {' '}Login</Link>
        </li>

        <li className="nav-item pull-right" style={{color: 'white',background:'#008cff' , borderRadius: '5px'
           }}>
          <Link className='nav-link' to="/register" style={{color: 'white', borderRadius: '5px' }}>
            Register
          </Link>
        </li>
      </ul>
    )

    let authLinksIII=null
    if (isAuthenticated && (user.role==='super_admin')) {
      authLinksIII = (
          <ul className="navbar-nav components d-flex justify-content-between" style={{ height: '100%' }}>
            <li className='nav-item'  style={{color: 'white',background:'#008cff' , borderRadius: '5px'
               }}>
              <Link className='nav-link' to="/dashboard" style={{color: 'white', borderRadius: '5px' }}>
                Home
              </Link>
            </li>
            <li className='nav-item'  style={{color: 'white',background:'#008cff' , borderRadius: '5px'
            }}>
              <Link className='nav-link' to="/report" style={{color: 'white', borderRadius: '5px' }}>
                Usage Reports
              </Link>
            </li>
            <li className="nav-item dropdown" style={{color: 'white',background:'#008cff' , borderRadius: '5px'
               }}>
                <Link className="nav-link nav-item d-flex justify-content-around" to="" data-toggle="dropdown"
                      style={{color: 'white',background:'#008cff' , borderRadius: '5px'
                        ,minWidth:'150px' }}>
                  Users<i className="fas fa-caret-down"/>
                </Link>
              <ul className="dropdown-menu " >
                <li><Link className='nav-link' to="/createUser" style={{color: 'white'}}>
                  Create</Link></li>
                <li><Link className='nav-link' to="/activeLVP" style={{color: 'white'}}>
                  Current</Link></li>
                <li><Link className='nav-link' to="/deAssignedLVP" style={{color: 'white'}}>
                  De Assigned</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown" style={{color: 'white', borderRadius: '5px'
              ,minWidth:'200px' }}>
              <Link className="nav-link nav-item d-flex justify-content-around" to=""  data-toggle="dropdown"
                    style={{color: 'white', borderRadius: '5px' }}>
                {user.emailId}<i className="fas fa-caret-down"/>
              </Link>
              <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                <li className='nav-item' style={{minWidth:'200px'}}>
                  <Link className='nav-link' to="/changePassword" style={{color: 'white'}}>
                    Change Password
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item pull-right" style={{borderRadius: '5px' }}>
              <Link className="nav-link" to="/" onClick={this.onLogoutClick.bind(this)}
                    style={{color: 'white', borderRadius: '5px' }}>
                <i className="fa fa-power-off" aria-hidden="true"/>
                {'  '}Logout</Link>
            </li>
          </ul>
      )
    }else if(isAuthenticated && (user.role==='lvpei')) {
      authLinksIII = (
        <ul className="navbar-nav components" style={{ height: '100%' }}>
          <li className='nav-item' style={{color: 'white',background:'#008cff' , borderRadius: '5px' }}>
            <Link className='nav-link'  to="/dashboard" style={{color: 'white', borderRadius: '5px' }}>
              Home
            </Link>
          </li>
          <li className='nav-item' style={{color: 'white',background:'#008cff' , borderRadius: '5px'
            }}>
            <Link className='nav-link'  to="/uploadForm" style={{color: 'white', borderRadius: '5px' }}>
              Upload Book
            </Link>
          </li>
          <li className='nav-item' style={{color: 'white',background:'#008cff' , borderRadius: '5px'
          }}>
            <Link className='nav-link'  to="/lvpBooks" style={{color: 'white', borderRadius: '5px' }}>
              View All Books
            </Link>
          </li>
          <li className="nav-item dropdown " style={{color: 'white',background:'#008cff' , borderRadius: '5px'
            ,minWidth:'150px' }}>
            <Link className="nav-link nav-item d-flex justify-content-around" to=""  data-toggle="dropdown"
                  style={{color: 'white', borderRadius: '5px' }}>
              {user.emailId}<i className="fas fa-caret-down"/>
            </Link>
            <ul className="dropdown-menu " style={{color: 'white',background:'#008cff' , borderRadius: '5px'
              }}>
              <li><Link className='nav-link' to="/editProfile" style={{color: 'white'}}>
              My Account</Link></li>
              <li><Link className='nav-link' to="/changePassword" style={{color: 'white'}}>
                Change Password</Link></li>
            </ul>
          </li>
          <li className="nav-item pull-right" style={{color: 'white',background:'#008cff' , borderRadius: '5px'
            }}>
            <Link className="nav-link" to="/" onClick={this.onLogoutClick.bind(this)}
                  style={{color: 'white', borderRadius: '5px' }}>
              <i className="fa fa-power-off" aria-hidden="true"/>
              {'  '}Logout</Link>
          </li>
        </ul>
      )
    }else if(user.role==='world') {
      authLinksIII = (
        <ul className="navbar-nav components d-flex justify-content-around" style={{ height: '100%' }}>
          <li className='nav-item' style={{color: 'white',background:'#008cff' , borderRadius: '5px'
            }}>
            <Link className='nav-link' to="/dashboard" style={{color: 'white', borderRadius: '5px' }}>
              Home
            </Link>
          </li>
          <li className='nav-item' style={{color: 'white',background:'#008cff' , borderRadius: '5px'
          }}>
            <Link className='nav-link' to="/favourites" style={{color: 'white', borderRadius: '5px' }}>
              Favourite Books
            </Link>
          </li>
          <li className="nav-item dropdown " style={{color: 'white',background:'#008cff' , borderRadius: '5px'
             }}>
            <Link className="nav-link nav-item d-flex justify-content-around" to=""  data-toggle="dropdown"
                  style={{color: 'white', borderRadius: '5px' }}>
              {user.emailId}<i className="fas fa-caret-down"/>
            </Link>
            <ul className="dropdown-menu " >
              <li><Link className='nav-link' to="/editProfile" style={{color: 'white'}}>
                My Account</Link></li>
              <li><Link className='nav-link' to="/changePassword" style={{color: 'white'}}>
                Change Password</Link></li>
            </ul>
          </li>
          <li className="nav-item pull-right">
            <Link className="nav-link" to="/" onClick={this.onLogoutClick.bind(this)}
                  style={{color: 'white', borderRadius: '5px' }}>
              <i className="fa fa-power-off" aria-hidden="true"/>
              {'  '}Logout</Link>
          </li>
        </ul>
      )
    }

    return (
      <nav className="navbar navbar-expand-sm  col-md-12 " style={{background:'#008cff'}}>
        <div className="row container d-flex justify-content-between col-md-12">
          <div className='row  d-flex justify-content-between col-md-12' >
            {isAuthenticated ? authLinkO : guestLinkO}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="row collapse navbar-collapse justify-content-end" id="mobile-nav">
            {isAuthenticated ? authLinksIII: guestLink1}
          </div>
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getSearchResults: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
})

export default connect(mapStateToProps, {logoutUser, getSearchResults})(Navbar)

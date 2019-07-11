import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Sidebar extends Component {


  render () {

    const { isAuthenticated,user } = this.props.auth
    let authLinksIII=null
    if (isAuthenticated && (user.role==='super_admin')) {
      authLinksIII = (
        <nav id="sidebar" className='sidebar-nav-fixed affix' style={{ height: '100%' }}>
          <ul className="list-unstyled components" style={{ height: '100%' }}>
            <li>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <i className="fas fa-home"/>
                Home
              </Link>
            </li>
            <li>
            <Link to="/createUser" style={{ textDecoration: 'none' }}>
                <i className="fa fa-cog" aria-hidden="true"/>
                Create LVPEI user
              </Link>
            </li>
            <li>
            <Link to="/addDiagnosticCentre" style={{ textDecoration: 'none' }}>
                <i className="fa fa-cog" aria-hidden="true"/>
                Add a new Diagnostic centre
              </Link>
            </li>
            <li>
              <Link to="/activeCentres" style={{ textDecoration: 'none' }}>
                <i className="fa fa-cog" aria-hidden="true"/>
                Active Centres
              </Link>
            </li>
            <li>
              <Link to="/removedCentres" style={{ textDecoration: 'none' }}>
                <i className="fa fa-cog" aria-hidden="true"/>
                Inactive Centres
              </Link>
            </li>
            <li>
            <Link to="/changePassword" style={{ textDecoration: 'none' }}>
              <i className="fa fa-wrench" aria-hidden="true"/>
              Change Password
            </Link>
            </li>
          </ul>
        </nav>
      )
    }else if(isAuthenticated && (user.role==='diag_admin')) {
      authLinksIII = (<nav id="sidebar" className='sidebar-nav-fixed affix' style={{ minHeight: '100%' }}>
        <ul className="list-unstyled components" style={{ height: '100%' }}>
          <li>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <i className="fas fa-home"/>
              Home
            </Link>
          </li>
          <li>
            <Link to="/createUser" style={{ textDecoration: 'none' }}>
              <i className="fa fa-cog" aria-hidden="true"/>
              Create new user
            </Link>
          </li>
          <li>
            <Link to="/changePassword" style={{ textDecoration: 'none' }}>
              <i className="fa fa-wrench" aria-hidden="true"/>
              Change Password
            </Link>
          </li>
        </ul>
      </nav>)
    } else if(isAuthenticated && (user.role==='diag')) {
      authLinksIII = (<nav id="sidebar" className='sidebar-nav-fixed affix' style={{ height: '100%' }}>
        <ul className="list-unstyled components" style={{ height: '100%' }}>
          <li>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <i className="fas fa-home"/>
              Home
            </Link>
          </li>
          <li>
            <Link to="/changePassword" style={{ textDecoration: 'none' }}>
              <i className="fa fa-wrench" aria-hidden="true"/>
              Change Password
            </Link>
          </li>
        </ul>
      </nav>)
    } else if(isAuthenticated && (user.role==='lvpei')) {
      authLinksIII = (<nav id="sidebar" className='sidebar-nav-fixed affix' style={{ height: '100%' }}>
        <ul className="list-unstyled components" style={{ height: '100%' }}>
          <li>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <i className="fas fa-home"/>
              Home
            </Link>
          </li>
          <li>
            <Link to="/changePassword" style={{ textDecoration: 'none' }}>
              <i className="fa fa-wrench" aria-hidden="true"/>
              Change Password
            </Link>
          </li>
        </ul>

      </nav>)
    }
    return (
      <div style={{ minHeight: '100%'}}>
        {authLinksIII}
      </div>
    )
  }
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
  auth: state.auth,
  home: state.home,
})

export default connect(mapStateToProps)(Sidebar)

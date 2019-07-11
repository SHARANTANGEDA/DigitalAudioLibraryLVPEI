import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { deleteLVPEIUser, grantUserAccess, removeUserAccess } from '../../../actions/sAActions'
import getLocalDate from '../../../utils/getLocalDate'
import downloading from '../../common/downloading.gif'
import Modal from 'react-modal'
import ResetPassword from '../../MyAccount/ResetPassword'

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

class TableRowLVPEI extends Component {
  constructor () {
    super()
    this.state= {
      removeClick: false,
      grantClick: false,
      modalIsOpen: false
    }
    this.onRemoveAccess = this.onRemoveAccess.bind(this)
    this.onGrantAccess = this.onGrantAccess.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

  }

  onRemoveAccess(e) {
    console.log(this.props.data.emailId)
    this.props.removeUserAccess({emailId: this.props.data.emailId})
    this.setState({removeClick: true})
  }

  onGrantAccess(e) {
    this.props.grantUserAccess({emailId: this.props.data.emailId})
    this.setState({grantClick: true})
  }

  resetPassword (e) {

  }
  openModal () {
    this.setState({ modalIsOpen: true })
  }
  afterOpenModal () {}

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  render () {
    const { data } = this.props
    let content
    // if (this.props.data.access) {
    //   content = (
    //     <span style={{ fontSize: '13.3333330154419px', background: 'red', color: 'white', borderRadius: '5px' }}>
    //       <button onClick={this.onDelete} className=" btn btn-sm"
    //               style={{ background: 'red', color: 'white', borderRadius: '5px' }}>Remove</button>
    //     </span>
    //   )
    // }else {
    //
    // }
    if(this.props.data.access) {
      if(!this.state.removeClick) {
        content = (
          <span style={{ fontSize: '13.3333330154419px', background: 'red',color: 'white', borderRadius: '5px'}}>
          <button onClick={this.onRemoveAccess} className=" btn btn-sm" style={{background: 'red',color: 'white', borderRadius: '5px'}}>Remove Access
          </button>
        </span>
        )
      }else {
        content = (
          <span style={{ fontSize: '13.3333330154419px',color: 'white', borderRadius: '5px'}}>
            <img
              src={downloading}
              style={{ width: '25px', margin: 'auto', display: 'block' }}
              alt="processing..."
            />
        </span>
        )
      }

    }else {
      if(!this.state.grantClick) {
        content = (
          <span style={{ fontSize: '13.3333330154419px', background: 'green',color: 'white', borderRadius: '5px'}}>
          <button onClick={this.onGrantAccess} className=" btn btn-success" style={{background: 'green', borderRadius: '5px'}}>Grant Access</button>
        </span>
        )
      }else {
        content=(<span style={{ fontSize: '13.3333330154419px',color: 'white'}}>
          <img
            src={downloading}
            style={{ width: '25px', margin: 'auto', display: 'block' }}
            alt="processing..."
          />
        </span>
        )
      }

    }
    // else {
    //   content = (
    //     <span style={{ fontSize: '13.3333330154419px', background: 'green', color: 'white' }}>
    //       <button className=" btn btn-success" style={{ background: 'green', color: 'white', borderRadius: '5px' }}>
    //         Give Access</button>
    //     </span>
    //   )
    // }
    return (
      <tr className="">
        <td><span style={{ fontFamily: 'Arial', fontSize: '12px' }}>{data.emailId}</span></td>
        <td>
          <span style={{ fontFamily: 'Arial', fontSize: '12px' }}>{data.firstName + ' ' + data.lastName}</span>
        </td>
        <td>
          <span  style={{ fontFamily: 'Arial', fontSize: '12px' }}>
            {getLocalDate(data.time).substring(0,getLocalDate(data.time).indexOf(','))}</span>
        </td>
        <td>
          <span  style={{ fontFamily: 'Arial', fontSize: '12px' }}>
            {getLocalDate(data.time).substring(getLocalDate(data.time).indexOf(',')+1,getLocalDate(data.time).length)}
          </span>
        </td>
        <td>
          <span style={{ fontSize: '13.3333330154419px', background: 'green',color: 'white', borderRadius: '5px'}}>
          <button onClick={this.openModal} className=" btn btn-success" style={{background: 'blue', borderRadius: '5px'}}>
            Reset Password</button>
        </span>
        </td>
        <td>
          {content}
        </td>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Patient Data"
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          <div className="col-md-12 d-flex justify-content-end" style={{ width: '100%' }}>
            <button onClick={this.closeModal} className='btn btn-sm' style={{ background: 'red', color: 'white' }}>Close
            </button>
          </div>
          <ResetPassword emailId={data.emailId}/>
        </Modal>
      </tr>
    )
  }
}

TableRowLVPEI.defaultProps = {
  showActions: true
}

TableRowLVPEI.propTypes = {
  data: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteLVPEIUser: PropTypes.func.isRequired,
  removeUserAccess: PropTypes.func.isRequired,
  grantUserAccess: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  faculty: state.faculty
})
export default connect(mapStateToProps, {deleteLVPEIUser, removeUserAccess, grantUserAccess})(TableRowLVPEI)

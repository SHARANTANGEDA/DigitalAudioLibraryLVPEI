import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import TableRowLVPEI from './TableRowLVPEI'

class ShowTable extends Component {
  render() {
    const  {data,index}  = this.props;
    console.log({'DataFeed':data});
    if(index.type==='lvpei') {
      return data.map(data => (
        <TableRowLVPEI data={data} key={data._id}/>
      ));
    }

  }
}

ShowTable.propTypes = {
  data: PropTypes.array.isRequired,
  index: PropTypes.object.isRequired
};

export default ShowTable;

import React from 'react'
import { connect } from "react-redux";
import {setTableItems} from '../actions'
import TableComp from '../components/TableComp'
function Table(props) {
  const renderPage = () =>{
    props.tableItems.map()
  }
  
  return (
    <div>
      <TableComp tableItems={props.tableItems}></TableComp>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    tableItems: state.tableItems,
  };
};
export default connect(mapStateToProps, {
  setTableItems,
})(Table);

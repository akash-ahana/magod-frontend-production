import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import EditOperatorTable from "./EditOperatorTable";
import EditOperatorForm from "./EditOperatorForm";


export default function EditOperators() {

  const [getOperatorlist, setgetOperatorList] = useState([]);
  const getOperatorData = () => {
    axios.get(baseURL + "/EditOperator/getOperator", {}).then((response) => {
      // console.log(response.data);
      setgetOperatorList(response.data);
    });
  };

  useEffect(() => {
    getOperatorData();
  }, []);

  //row select shiftIncharge
  const [rowselectOperator, setRowSelectOperator] = useState({});
  const selectedRowFunOperator = (item, index) => {
    let list = { ...item, index: index };
    setRowSelectOperator(list);
  };

  //Default first row select
  useEffect(() => {
    if (getOperatorlist.length > 0 && !rowselectOperator.Name) {
      selectedRowFunOperator(getOperatorlist[0], 0); // Select the first row
    }
  }, [getOperatorlist, rowselectOperator, selectedRowFunOperator]);


  return (
 <div className="row">
      <h4 className="title mb-4">Edit Operator Setup Form</h4>
      <div className="col-md-5">
        <EditOperatorTable
          getOperatorlist={getOperatorlist}
          rowselectOperator={rowselectOperator}
          selectedRowFunOperator={selectedRowFunOperator}
        />
      </div>
      <div className="col-md-5 ms-5">
        <EditOperatorForm rowselectOperator={rowselectOperator} 
        getOperatorlist={getOperatorlist}
        setgetOperatorList={setgetOperatorList}
        setRowSelectOperator={setRowSelectOperator}
        getOperatorData={getOperatorData}
        />
      </div>
    </div> 
     )
}

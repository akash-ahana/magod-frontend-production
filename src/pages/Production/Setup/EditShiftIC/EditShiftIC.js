import React, { useEffect, useState } from "react";
import ShiftInChargeTable from "./ShiftInChargeTable";
import FormShiftIc from "./FormShiftIc";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";

export default function EditShiftIC() {
  const [getShiftIclist, setgetShiftIcList] = useState([]);
  const getShiftIcData = () => {
    axios.get(baseURL + "/editShiftIc/getShiftIc", {}).then((response) => {
      console.log(response.data);
      setgetShiftIcList(response.data);
    });
  };

  useEffect(() => {
    getShiftIcData();
  }, []);

  //row select shiftIncharge
  const [rowselectShiftIc, setRowSelectShiftIc] = useState({});
  const selectedRowFunShiftIc = (item, index) => {
    let list = { ...item, index: index };
    setRowSelectShiftIc(list);
  };

  //Default first row select
  useEffect(() => {
    if (getShiftIclist.length > 0 && !rowselectShiftIc.Name) {
      selectedRowFunShiftIc(getShiftIclist[0], 0); // Select the first row
    }
  }, [getShiftIclist, rowselectShiftIc, selectedRowFunShiftIc]);

  return (
    <div className="row">
      <h4 className="title mb-4">Edit ShiftIncharge Setup Form</h4>
      <div className="col-md-5">
        <ShiftInChargeTable
          getShiftIclist={getShiftIclist}
          rowselectShiftIc={rowselectShiftIc}
          selectedRowFunShiftIc={selectedRowFunShiftIc}
        />
      </div>
      <div className="col-md-5 ms-5">
        <FormShiftIc rowselectShiftIc={rowselectShiftIc} 
        getShiftIcData={getShiftIcData}
        setgetShiftIcList={setgetShiftIcList}
        setRowSelectShiftIc={setRowSelectShiftIc}
        />
      </div>
    </div>
  );
}

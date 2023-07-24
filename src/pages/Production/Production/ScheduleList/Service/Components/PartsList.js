import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";
import "../Styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useMemo } from "react";


export default function PartsList({
  TaskNo,
  getpartslistdata,
  partlistdata,
  setPartlistdata,
}) {


  //Process Table(Right First table) data
  const [newpartlistdata, setNewPartlistdata] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isClearedDisabled, setIsClearedDisabled] = useState(true);

  useEffect(() => {
    getpartslistdata();
  }, [TaskNo]);

  const onChangeInput = (e, TaskNo, key) => {
    const { name, value } = e.target;
    console.log("value", value);
    console.log("key", key);
    const NewEditData = partlistdata;
    NewEditData[key].QtyCleared = value;
    setPartlistdata(NewEditData);
    setNewPartlistdata(NewEditData);
  };

  const clearAllonClick = () => {
    console.log(
      "Clear All Button is Clicked",
      "Parts List Data is ",
      partlistdata
    );
    const constpartListData = partlistdata;
    console.log("Const part list data is ", constpartListData);
    for (let i = 0; i < constpartListData.length; i++) {
      constpartListData[i].QtyCleared = constpartListData[i].QtyProduced;
    }
    console.log("Updated constPartListData is ", constpartListData);
    setPartlistdata(constpartListData);
    setNewPartlistdata(constpartListData);
    setSelectedRows([]); // Clear selected rows
    setIsClearedDisabled(true); // Disable the Save Cleared button
  };


  const onChangeCleared = (e, item, key) => {
    const newConstPartList = partlistdata.slice(); // Create a copy of the partlistdata array
    const newValue = parseInt(e.target.value); // Convert the input value to an integer

    if (!isNaN(newValue)) {
      newConstPartList[key].QtyCleared = newValue; // Update QtyCleared with the new value
      setPartlistdata(newConstPartList); // Update the state with the modified data

      if (newValue > newConstPartList[key].QtyProduced) {
        toast.error("Cleared cannot be greater than Produced!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      updateClearedDisabledState(newConstPartList); // Update the disabled state of the Save Cleared button
    }
  };

  const updateClearedDisabledState = (data) => {
    const isDisabled = data.every((row) => row.QtyCleared === row.QtyProduced);
    setIsClearedDisabled(isDisabled);
  };

  const saveClearedonClick = () => {
    console.log(
      "Save Cleared button is clicked",
      " task parts table state is ",
      partlistdata
    );
    axios
      .post(
        baseURL + "/scheduleListProfile/scheduleListSaveCleared",
        partlistdata
      )
      .then((response) => {
        //setPartlistdata(response.data);
        // console.log(response.boby);
        toast.success(" Cleared Saved", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      // Add the selected row object to the array
      setSelectedRows([...selectedRows, row]);
    } else {
      // Remove the selected row object from the array
      setSelectedRows(
        selectedRows.filter((selectedRow) => selectedRow.id !== row.id)
      );
    }
    updateClearedDisabledState(partlistdata); // Update the disabled state of the Save Cleared button
  };

  const clearSelected = () => {
    const updatedPartListData = partlistdata.map((row) => {
      if (selectedRows.some((selectedRow) => selectedRow.id === row.id)) {
        return { ...row, QtyCleared: row.QtyProduced };
      }
      return row;
    });

    setPartlistdata(updatedPartListData);
    updateClearedDisabledState(updatedPartListData); // Update the disabled state of the Save Cleared button
  };

  //ONSELECT
  const [selectPartList, setSelectPartList] = useState({})
  const rowSelectFun = (item, index) => {
    let list = { ...item, index: index }
    // console.log("ScheduleNo",item.ScheduleNo)
    setSelectPartList(list);
  }


  useMemo(() => {
    setSelectPartList({ ...partlistdata[0], index: 0 });
  }, [partlistdata[0]]);


  return (
    <div>
      <ToastContainer />
      <div className="row mt-2">
        <button
          className="button-style mt-2 group-button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={clearAllonClick}
        >
          Clear All
        </button>

        <button
          className="button-style mt-2 group-button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={clearSelected}
        >
          Clear Selected
        </button>

        <button
          className="button-style mt-2 group-button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={saveClearedonClick}
        >
          Save Cleared
        </button>
      </div>

      <div className="mt-4" style={{ height: "160px", overflowY: "scroll" }}>
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor">
            <tr>
              <th></th>
              <th>DwgName</th>
              <th>Programed</th>
              <th>Produced</th>
              <th>Cleared</th>
              {/* <th>Task_Part_ID</th>
              <th>NcTaskId</th>
              <th>TaskNo</th>
              <th>SchDetailsId</th>
              <th>PartId</th>
              <th>QtyToNest</th>
              <th>QtyCleared</th>
              <th>QtyProduced</th>
              <th>QtyNested</th>
              <th>Remarks</th>
              <th>LOC</th>
              <th>Pierces</th>
              <th>Part_Area</th>
              <th>Unit_Wt</th>
              <th>HasBOM</th>
              <th>QtnDetailId</th> */}
            </tr>
          </thead>

          <tbody className="tablebody">
            {partlistdata.map((item, key) => {
              return (
                <tr
                  key={item.id}
                  onClick={() => rowSelectFun(item, key)}
                  className={key === selectPartList?.index ? "selcted-row-clr" : ""}>               
                     <td>
                    <input
                      style={{ marginLeft: "20px" }}
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedRows.some((row) => row.id === item.id)}
                      onChange={(event) => handleCheckboxChange(event, item)}
                    />
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.DwgName}</td>
                  <td>{item.QtyToNest}</td>
                  <td>{item.QtyProduced}</td>
                  <td>
                    <div>
                      <input
                        className="table-cell-editor "
                        name="cleared"
                        defaultValue={item.QtyCleared}
                        type="number"
                        onBlur={(e) => onChangeCleared(e, item, key)}
                        placeholder="Type Cleared"
                      />
                    </div>
                  </td>
                  {/* <td>{item.Task_Part_ID}</td>
                  <td>{item.NcTaskId}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.TaskNo}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.SchDetailsId}</td>
                  <td>{item.PartID}</td>
                  <td>{item.QtyToNest}</td>
                  <td>{item.QtyCleared}</td>
                  <td>{item.QtyProduced}</td>
                  <td>{item.QtyNested}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.Remarks}</td>
                  <td>{item.LOC}</td>
                  <td>{item.Pierces}</td>
                  <td>{item.Part_Area}</td>
                  <td>{item.Unit_Wt}</td>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </td>
                  <td></td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

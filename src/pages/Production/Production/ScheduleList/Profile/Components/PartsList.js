import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";
import "../Styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useMemo } from "react";
import { useGlobalContext } from "../../../../../../Context/Context";

export default function PartsList({
  TaskNo,
  getpartslistdata,
  partlistdata,
  setPartlistdata,
}) {
  const {
    getSchedulistdata,
    getSchedulistfabricationdata,
    getSchedulistservicedata,
  } = useGlobalContext();
  const [saveCleared, setSaveCleared] = useState(false);

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  // Process Table(Right First table) data
  const [newpartlistdata, setNewPartlistdata] = useState([]);
  const onChangeInput = (e, TaskNo, key) => {
    const { name, value } = e.target;
    const NewEditData = partlistdata;
    NewEditData[key].QtyCleared = value;
    setPartlistdata(NewEditData);
    setNewPartlistdata(NewEditData);
  };

  // CLEAR ALL
  const clearAllonClick = () => {
    const constpartListData = partlistdata;
    for (let i = 0; i < constpartListData.length; i++) {
      constpartListData[i].QtyCleared = constpartListData[i].QtyProduced;
    }
    console.log(constpartListData);
    setPartlistdata(constpartListData);
    setNewPartlistdata(constpartListData);
    setSaveCleared(true);
  };

 /// CLEAR SELECTED
const clearSelected = () => {
  const updatedPartListData = [...partlistdata];
  // Iterate through the selectedRows and update QtyCleared with QtyProduced for all selected rows
  updatedPartListData.forEach((item, index) => {
    if (selectedRows.includes(item)) {
      updatedPartListData[index].QtyCleared = item.QtyProduced;
    }
  });

    setPartlistdata(updatedPartListData);
    setNewPartlistdata(updatedPartListData);
    setSelectedRows([]);
    setSaveCleared(false);
  };

  // SAVE CLEARED
  const saveClearedonClick = () => {
    // Check if there is at least one row where QtyProduced is not equal to QtyCleared
    const hasUnsavedData = partlistdata.some(item => item.QtyProduced !== item.QtyCleared);
    
    if (!saveCleared) {
      // There is at least one row where QtyProduced is not equal to QtyCleared
      axios
        .post(
          baseURL + "/scheduleListProfile/scheduleListSaveCleared",
          partlistdata
        )
        .then((response) => {
          toast.success("Cleared Saved", {
            position: toast.POSITION.TOP_CENTER,
          });
          // After saving, update the data
          // getSchedulistdata();
          // getSchedulistfabricationdata();
          // getSchedulistservicedata();
          // console.log("executed first API");
        });
    } else {
      // All rows have QtyProduced equal to QtyCleared
      axios
        .post(
          baseURL + "/scheduleListProfile/scheduleListSaveClearedCompleted",
          partlistdata
        )
        .then((response) => {
          toast.success("Cleared Saved", {
            position: toast.POSITION.TOP_CENTER,
          });
          // After saving, update the data
          getSchedulistdata();
          getSchedulistfabricationdata();
          getSchedulistservicedata();
          console.log("executed second API");
        });
    }
  };

  // SelectedRow
  const [selectedRows, setSelectedRows] = useState([]);
  const handleCheckboxChange = (item) => {
    setSelectedRows((prevRows) => {
      if (prevRows.includes(item)) {
        return prevRows.filter((row) => row !== item);
      } else {
        return [...prevRows, item];
      }
    });
  };

  // const handleSelectAll = (event) => {
  //   if (event.target.checked) {
  //     // Select all rows
  //     setSelectedRows(partlistdata);
  //   } else {
  //     // Deselect all rows
  //     setSelectedRows([]);
  //   }
  // };

  const onChangeCleared = (e, item, key) => {
    const newConstPartList = [...partlistdata]; // Create a copy of the partlistdata array
    const newValue = parseInt(e.target.value); // Convert the input value to an integer
    if (!isNaN(newValue) && newValue <= newConstPartList[key].QtyProduced) {
      newConstPartList[key].QtyCleared = newValue; // Update QtyCleared if it's a valid value
    } else {
      newConstPartList[key].QtyCleared = ""; // Reset QtyCleared if the value is invalid
    }
    setPartlistdata(newConstPartList);
    if (newValue > newConstPartList[key].QtyProduced) {
      // Display an alert message if Cleared is greater than Produced
      toast.error("Cleared cannot be greater than Produced!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    getpartslistdata();
    setSelectedRows([]);
  }, [TaskNo]);

  //ONSELECT
  const [selectPartList, setSelectPartList] = useState({});
  const rowSelectFun = (item, index) => {
    let list = { ...item, index: index };
    // console.log("ScheduleNo",item.ScheduleNo)
    setSelectPartList(list);
  };

  useMemo(() => {
    setSelectPartList({ ...partlistdata[0], index: 0 });
  }, [partlistdata[0]]);

  // const isClearedDisabled =
  //   selectedRows.length === 0 &&
  //   partlistdata.every((row) => row.QtyCleared === row.QtyProduced);



  //select ALL
  const handleSelectAll = () => {
    const allRowsSelected = selectPartList.length === partlistdata.length;
    setSelectPartList(allRowsSelected ? [] : partlistdata);
  };

  // console.log(partlistdata);

  return (
    <div>
      <ToastContainer />
      <div className="row">
        <div className="col-md-12">
          <button className="button-style group-button" onClick={clearSelected}>
            Clear Selected
          </button>

          <button
            className="button-style group-button"
            onClick={clearAllonClick}
          >
            Clear All
          </button>

          <button
            className="button-style group-button"
            onClick={saveClearedonClick}
          >
            Save Cleared
          </button>
        </div>
      </div>

      <div className="mt-1" style={{ height: "120px", overflowY: "scroll" }}>
        <Table striped className="table-data border table-space">
          <thead className="tableHeaderBGColor">
            <tr>
              <th onClick={handleSelectAll}></th>
              <th>DwgName</th>
              <th>Programmed</th>
              <th>Produced</th>
              <th style={{ textAlign: "center" }}>Cleared</th>
              {/* <th>Task_Part_ID</th>
              <th>NcTaskId</th>
              <th>TaskNo</th>
              <th>SchDetailsId</th>
              <th>PartId</th>
              <th>QtyToNest</th>
              <th>QtyCleared</th>
              <th>QtyCleared</th>
              <th>QtyProduced</th>
              <th>Remarks</th>
              <th>LOC</th>
              <th>Pierces</th>
              <th>Part_Area</th>
              <th>Unit_Wt</th>
              <th>HasBOM</th>
              <th>QtnDetailId</th> */}
            </tr>
          </thead>

          <tbody className="tablebody ">
            {partlistdata.map((item, key) => {
              const isChecked = selectedRows.some((row) => row === item);
              return (
                <tr
                  key={item.id}
                  onClick={() => rowSelectFun(item, key)}
                  className={
                    key === selectPartList?.index ? "selcted-row-clr" : ""
                  }
                >
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedRows.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </td>
                  <td>{item.DwgName}</td>
                  <td >{item.QtyToNest}</td>
                  <td >{item.QtyProduced}</td>
                  <td>
                    <div>
                      <input
                        className="table-cell-editor"
                        style={{ textAlign: "center" }}
                        name="cleared"
                        type="number"
                        placeholder="Type Cleared"
                        value={item.QtyCleared}
                        onChange={(e) => onChangeCleared(e, item, key)}
                        onKeyDown={blockInvalidChar}
                        inputMode="numeric"
                      />
                    </div>
                  </td>
                  {/* <td>{item.Task_Part_ID}</td>
                  <td style={{ textAlign: "center" }}>{item.NcTaskId}</td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {item.TaskNo}
                  </td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                    {item.SchDetailsId}
                  </td>
                  <td style={{ textAlign: "center" }}>{item.PartID}</td>
                  <td style={{ textAlign: "center" }}>{item.QtyToNest}</td>
                  <td style={{ textAlign: "center" }}>{item.QtyCleared}</td>
                  <td style={{ textAlign: "center" }}>{item.QtyProduced}</td>
                  <td style={{ textAlign: "center" }}>{item.QtyProduced}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.Remarks}</td>
                  <td style={{ textAlign: "center" }}>{item.LOC}</td>
                  <td style={{ textAlign: "center" }}>{item.Pierces}</td>
                  <td style={{ textAlign: "center" }}>{item.Part_Area}</td>
                  <td style={{ textAlign: "center" }}>{item.Unit_Wt}</td>
                  <td>
                    <input
                      style={{ marginLeft: "20px" }}
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

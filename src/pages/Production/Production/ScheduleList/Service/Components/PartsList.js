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
  const [saveCleared, setSaveCleared] = useState(false);

  useEffect(() => {
    getpartslistdata();
  }, [TaskNo]);

  const onChangeInput = (e, TaskNo, key) => {
    const { name, value } = e.target;
    console.log("value", value);
    console.log("key", key);
    const NewEditData = partlistdata;
    NewEditData[key].QtyProduced = value;
    setPartlistdata(NewEditData);
    setNewPartlistdata(NewEditData);
  };

  const clearAllonClick = () => {
    const constpartListData = partlistdata;
    for (let i = 0; i < constpartListData.length; i++) {
      constpartListData[i].QtyProduced = constpartListData[i].QtyNested;
    }
    setPartlistdata(constpartListData);
    setNewPartlistdata(constpartListData);
    setSelectedRows([]); // Clear selected rows
    setIsClearedDisabled(true); // Disable the Save Cleared button
    setSaveCleared(true);
  };

  const onChangeCleared = (e, item, key) => {
    const newConstPartList = partlistdata.slice(); // Create a copy of the partlistdata array
    const newValue = parseInt(e.target.value); // Convert the input value to an integer

    if (!isNaN(newValue)) {
      newConstPartList[key].QtyProduced = newValue; // Update QtyProduced with the new value
      setPartlistdata(newConstPartList); // Update the state with the modified data

      if (newValue > newConstPartList[key].QtyNested) {
        toast.error("Cleared cannot be greater than Produced!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      updateClearedDisabledState(newConstPartList); // Update the disabled state of the Save Cleared button
    }
  };

  const updateClearedDisabledState = (data) => {
    const isDisabled = data.every((row) => row.QtyProduced === row.QtyNested);
    setIsClearedDisabled(isDisabled);
  };

  const saveClearedonClick = () => {
    // Check if there is at least one row where QtyNested is not equal to QtyProduced
    const hasUnsavedData = partlistdata.some(
      (item) => item.QtyNested !== item.QtyProduced
    );
    if (hasUnsavedData) {
      // There is at least one row where QtyNested is not equal to QtyProduced
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
          console.log("executed first API");
        });
    } else {
      // All rows have QtyNested equal to QtyProduced
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
          console.log("executed second API");
        });
    }
  };

  const handleCheckboxChange = (item) => {
    setSelectedRows((prevRows) => {
      if (prevRows.includes(item)) {
        return prevRows.filter((row) => row !== item);
      } else {
        return [...prevRows, item];
      }
    });
  };

  const clearSelected = () => {
    const updatedRows = partlistdata.map((row) => {
      if (selectedRows.includes(row)) {
        return { ...row, QtyProduced: row.QtyNested };
      }
      return row;
    });
    setPartlistdata(updatedRows);
    setSelectedRows([]);
    setSaveCleared(false);
  };

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

  return (
    <div>
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

      <div className="mt-1" style={{ height: "130px", overflowY: "scroll" }}>
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
              <th>QtyProduced</th>
              <th>QtyNested</th>
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
                  <td style={{ whiteSpace: "nowrap" }}>{item.DwgName}</td>
                  <td>{item.QtyToNest}</td>
                  <td>{item.QtyNested}</td>
                  <td>
                    <div>
                      <input
                        className="table-cell-editor "
                        name="cleared"
                        Value={item.QtyProduced}
                        type="number"
                        onBlur={(e) => onChangeCleared(e, item, key)}
                        placeholder="Type Cleared"
                        inputMode="numeric"
                      />
                    </div>
                  </td>
                  {/* <td>{item.Task_Part_ID}</td>
                  <td>{item.NcTaskId}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.TaskNo}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.SchDetailsId}</td>
                  <td>{item.PartID}</td>
                  <td>{item.QtyToNest}</td>
                  <td>{item.QtyProduced}</td>
                  <td>{item.QtyNested}</td>
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

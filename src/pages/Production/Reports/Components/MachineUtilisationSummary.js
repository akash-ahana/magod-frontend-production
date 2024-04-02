import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../../../../Context/Context";
import CustomModal from "../../CustomModal";

export default function MachineUtilisationSummary({ dateSelect, status }) {
  const {
    multiplerowSelect,
    setMultipleRowSelect,
    handleCheckboxChange1,
    machineutilisationSummartdata,
    setMachineutilisationSummarydata,
  } = useGlobalContext();

  const [rowSelected, setRowSelected] = useState({});

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState(rowSelected.LaserOn || "");
  const [modalShow6, setModalShow6] = useState(false);

  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setRowSelected(list);
  };

  const updateUtilisationSummary = () => {
    // console.log("rowSelected.TotalOn",rowSelected.TotalOn)
    if (!rowSelected || !inputValue1) {
      // Check if rowSelected and inputValue1 are valid
      return;
    }
    const updatedRow = {
      ...rowSelected,
      TotalOff: inputValue1,
      TotalOn:rowSelected.TotalOn,
      ProdON:1440 - inputValue1,
    };
    // Update the selected row in the machineutilisationSummartdata array
    const updatedData = machineutilisationSummartdata.map((item, index) =>
      index === rowSelected.index ? updatedRow : item
    );
    // Update the machineutilisationSummartdata with the updatedData
    setMachineutilisationSummarydata(updatedData);
    // Show a success toast
  };

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
    // console.log(event.target.value);
  };

  const handleInputChange2 = (event) => {
    const updatedMachineUtilisationData = [...machineutilisationSummartdata];
    // Find the index of the selected machine in the machineutilisationSummartdata array
    const selectedIndex = updatedMachineUtilisationData.findIndex(item => item.Machine === rowSelected.Machine);
    // Update the LaserOn value of the selected machine
    updatedMachineUtilisationData[selectedIndex].LaserOn = event.target.value;
    // console.log("updatedMachineUtilisationData",updatedMachineUtilisationData);
    // Update the machineutilisationSummartdata with the updated data
    setMachineutilisationSummarydata(updatedMachineUtilisationData);
    setInputValue2(event.target.value);
  };

  
  
  const onValueChange = (index, field, value) => {
    const updatedMachineUtilisationSummary = [...machineutilisationSummartdata]; // Create a copy of the array
    // Update the specific item's field with the new value
    updatedMachineUtilisationSummary[index] = {
      ...updatedMachineUtilisationSummary[index],
      [field]: value,
    };
    setMachineutilisationSummarydata(updatedMachineUtilisationSummary);
  };


  const saveUtilisationSummary = () => {
    axios
      .post(baseURL + "/reports/saveMachineUtilisationSummary", {
        machineutilisationSummartdata,
        Date: dateSelect,
      })
      .then((res) => {
        // console.log("require response mus", res.data);
        setModalShow6(true);
        // Introduce a delay of, for example, 1000 milliseconds (1 second)
        setTimeout(() => {
          axios
            .post(baseURL + "/reports/muData", {
              Date: dateSelect,
            })
            .then((res) => {
              // console.log(res.data);
              setMachineutilisationSummarydata(res.data);
              // toast.success("Changes Saved", {
              //   position: toast.POSITION.TOP_CENTER,
              // });
            });
        }, 1000); // 1000 milliseconds = 1 second
      });
  };

  const closeModal = () => {
    setModalShow6(false);
  };

  const modalData = {
    title: "Reports",
    content: "Changes Saved",
  };

  // useMemo(() => {
  //   setRowSelected({ ...machineutilisationSummartdata[0], index: 0 });
  //   setInputValue2([]);
  // }, [machineutilisationSummartdata[0]]);

  useEffect(() => {
    setInputValue2(rowSelected.LaserOn || "");
  }, [rowSelected]);

  useEffect(() => {
    setInputValue1(rowSelected.TotalOff || 0);
    setInputValue2(rowSelected.LaserOn || "");
  }, [rowSelected]);

  /////
  useEffect(() => {
    if (machineutilisationSummartdata.length > 0 && !rowSelected.Machine) {
      selectedRowFun(machineutilisationSummartdata[0], 0); // Select the first row
    }
  }, [machineutilisationSummartdata, rowSelected, selectedRowFun]);

  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-4" style={{ fontSize: "13px" }}>
          <p>
            <b>{rowSelected.Machine}</b>
          </p>
          <p>
            <b>Total On {rowSelected.TotalOn}</b>
          </p>
          <p>
            <b>Production</b> {rowSelected.ProdON}
          </p>
          <p>
            <b>Non Production</b> {rowSelected.NonProdOn}
          </p>

          <div className="row">
            <div className="col-md-4" style={{ marginLeft: "-20px" }}>
              <label>Total Off</label>
            </div>
            <div className="col-md-4" style={{ marginLeft: "-20px" }}>
              <input
                name={inputValue1}
                value={inputValue1}
                onChange={handleInputChange1}
              />
            </div>
            <div className="col-md-4">
              <button
                className={`button-style group-button ${
                  status ? "disabled" : ""
                }`}
                type="button"
                style={{
                  width: "120px",
                  marginTop: "-10px",
                  marginLeft: "-10px",
                }}
                onClick={() => updateUtilisationSummary()}
                disabled={status}
              >
                Update Production
              </button>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-4" style={{ marginLeft: "-20px" }}>
              <label>Laser ON</label>
            </div>
            <div className="col-md-4" style={{ marginLeft: "-20px" }}>
              <input
                name={inputValue2}
                value={inputValue2}
                onChange={handleInputChange2}
              />
            </div>
            <div className="col-md-4">
              <button
                className={`button-style group-button ${
                  status ? "disabled" : ""
                }`}
                type="button"
                style={{
                  width: "120px",
                  marginTop: "-10px",
                  marginLeft: "-10px",
                }}
                onClick={saveUtilisationSummary}
                disabled={status}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div
            style={{
              maxWidth: "800px",
              overflowX: "scroll",
              height: "300px",
              overflowY: "scroll",
            }}
          >
            <Table striped className="table-data border">
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        multiplerowSelect.length ===
                        machineutilisationSummartdata.length
                      }
                      onChange={() =>
                        setMultipleRowSelect((prevRows) =>
                          prevRows.length ===
                          machineutilisationSummartdata.length
                            ? []
                            : machineutilisationSummartdata
                        )
                      }
                    />
                  </th>

                  <th>Machine</th>
                  <th>TotalOn</th>
                  <th>TotalOff</th>
                  <th>ProdOn</th>
                  <th>NonProdOn</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                {machineutilisationSummartdata.map((item, key) => {
                  return (
                    <tr
                      key={key}
                      onClick={() => selectedRowFun(item, key)}
                      className={
                        key === rowSelected?.index ? "selcted-row-clr" : ""
                      }
                    >
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={multiplerowSelect.includes(item)}
                          onChange={() => handleCheckboxChange1(item)}
                        />
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>{item.Machine}</td>

                      <td className="table-cell-align">
                      <input 
                          className="table-cell-editor"
                          value={item.TotalOn}
                          onChange={(e) =>
                            onValueChange(key, "TotalOn", e.target.value)
                          }
                        />
                      </td>

                      <td className="table-cell-align">
                        <input 
                          className="table-cell-editor"
                          value={item.TotalOff}
                          onChange={(e) =>
                            onValueChange(key, "TotalOff", e.target.value)
                          }
                        />
                      </td>

                      <td className="table-cell-align">
                        <input
                        className="table-cell-editor"
                        value={item.ProdON}
                        onChange={(e) =>
                          onValueChange(key, "ProdON", e.target.value)
                        }
                        />
                        </td>

                      <td className="table-cell-align">
                        <input
                        className="table-cell-editor"
                        value={item.NonProdOn}
                        onChange={(e) =>
                          onValueChange(key, "NonProdOn", e.target.value)
                        }
                        />
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <CustomModal
        show={modalShow6}
        handleClose={closeModal}
        data={modalData}
      />
    </div>
  );
}

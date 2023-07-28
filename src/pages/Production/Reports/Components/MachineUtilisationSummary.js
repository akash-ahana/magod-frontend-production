import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../../../../Context/Context";

export default function MachineUtilisationSummary({ dateSelect, status }) {
  const {
    multiplerowSelect,
    setMultipleRowSelect,
    handleCheckboxChange1,
    machineutilisationSummartdata,
    setMachineutilisationSummarydata,
  } = useGlobalContext();

  console.log(machineutilisationSummartdata);
  const [rowSelected, setRowSelected] = useState({});

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState(rowSelected.LaserOn || "");
  
  const selectedRowFun = (item, index) => {
    let list = { ...item, index: index };
    setRowSelected(list);
  };

  const updateUtilisationSummary = () => {
    axios
      .post(baseURL + "/reports/UpdateMachineUtilisationSummary", {
        rowSelected: rowSelected,
        TotalOff: inputValue1,
        LaserOn: inputValue2,
      })
      .then((res) => {
        console.log("require response mus", res.data);
      });

    axios
      .post(baseURL + "/reports/muData", {
        Date: dateSelect,
      })
      .then((res) => {
        console.log(res.data);
        setMachineutilisationSummarydata(res.data);
      });
  };

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const saveUtilisationSummary = () => {
    toast.success("Changes Saved", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useMemo(() => {
    setRowSelected({ ...machineutilisationSummartdata[0], index: 0 });
    setInputValue2([])
  }, [machineutilisationSummartdata[0]]);

  console.log("Utilisation summary ",rowSelected)
  console.log(inputValue2)

  
  useEffect(() => {
    setInputValue2(rowSelected.LaserOn || "");
  }, [rowSelected]);
  


  useEffect(() => {
    setInputValue1(rowSelected.TotalOff || "");
    setInputValue2(rowSelected.LaserOn || "");
  }, [rowSelected]);

  
  return (
    <div className="col-md-12">
      <ToastContainer />

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
                      <td className="table-cell-align">{item.TotalOn}</td>
                      <td className="table-cell-align">{item.TotalOff}</td>
                      <td className="table-cell-align">{item.ProdON}</td>
                      <td className="table-cell-align">{item.NonProdOn}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

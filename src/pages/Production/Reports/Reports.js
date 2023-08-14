import axios from "axios";
import React, { useState, useEffect } from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { baseURL } from "../../../api/baseUrl";
import NabTab from "./Components/NavTab";
import DailyReportPrintModal from "./Pdfs/PrintDailyReports/DailyReportPrintModal";
import PrepareReportModal1 from "./Components/PrepareReportModal1";
import { useGlobalContext } from "../../../Context/Context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Reports() {

  const moment = require('moment');
  const today = moment();
  let Date=today.format("YYYY-MM-DD");
  //  console.log(Date);

  const {
    machineutilisationSummartdata,
    setMachineutilisationSummarydata,
    multiplerowSelect,
  } = useGlobalContext();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(-1);
  const [isPageRefreshed, setIsPageRefreshed] = useState(true);
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(-1);

  const selectedMachineFun = (item, index) => {
    setSelectedMachineIndex(index);
    setSelectedLabelIndex(-1);
  };

  useEffect(() => {
    const isPageRefreshed = localStorage.getItem("isPageRefreshed") === "true";
    setIsPageRefreshed(isPageRefreshed);
    localStorage.setItem("isPageRefreshed", false);
  }, []);

  const machinelogRowSelect = (index) => {
    const selectedRowData = machineLogData[index];
    // Check if the selected row is already in the selectedRows array
    const isSelected = selectedRows.some((row) => row.data === selectedRowData);
    if (isSelected) {
      // If the selected row is already selected, remove it from the selectedRows array
      const updatedSelectedRows = selectedRows.filter(
        (row) => row.data !== selectedRowData
      );
      setSelectedRows(updatedSelectedRows);
    } else {
      // If the selected row is not already selected, add it to the selectedRows array
      setSelectedRows([...selectedRows, { data: selectedRowData }]);
    }
  };

  //Onchange
  const [status, setStatus] = useState("");
  const [productionTaskSummary, setProductionTaskSummary] = useState([]);
  const [machineLogData, setMachineLogData] = useState([]);
  //Select Date
  const [dateSelect, SetDateSelect] = useState(Date);
  const handleChangeSelectDate = (e) => {
    SetDateSelect(e.target.value);
    axios
      .post(baseURL + "/reports/getMachineUtilisationSummary", {
        Date: e.target.value,
      })
      .then((res) => {
        console.log("require response mus", res.data);
        setMachineutilisationSummarydata(res.data.data);
      });
    axios
      .post(baseURL + "/reports/productTaskSummary", { Date: e.target.value })
      .then((response) => {
        //  console.log("data", response.data.data);
        setProductionTaskSummary(response.data);
      });
    axios
      .post(baseURL + "/reports/machineLog", { Date: e.target.value })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }
        console.log(response.data);
        setMachineLogData(response.data);
        setMachineName('')
      });
  };

  // //STATUS CODE
  useEffect(() => {
    axios
      .post(baseURL + "/reports/getStatusPrintReport", {
        Date: dateSelect,
      })
      .then((res) => {
        console.log(res.data)
        setStatus(res.data);
      }); 
  }, [dateSelect]);

  const [prepareReport1, setPrepareReport] = useState("");
  const openPrepareReport1 = () => {
    let machinesWithNegativeValues = []; // Array to store machines with negative values

    multiplerowSelect.forEach((row) => {
      if (row.NonProdOn < 0) {
        machinesWithNegativeValues.push(row); // Add machine to the array
      }
    });
    selectedRows.forEach((row) => {
      if (row.MachineTime < 0) {
        machinesWithNegativeValues.push(row); // Add machine to the array
      }
    });
    machineLogData.forEach((row) => {
      if (row.MachineTime < 0) {
        machinesWithNegativeValues.push(row); // Add machine to the array
      }
    });
    machineutilisationSummartdata.forEach((row) => {
      if (row.NonProdOn < 0) {
        machinesWithNegativeValues.push(row); // Add machine to the array
      }
    });
    if (machinesWithNegativeValues.length > 0) {
      const firstMachine = machinesWithNegativeValues[0].Machine;
      toast.error(`Please check ${firstMachine}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setPrepareReport(true);
    }
    if (machinesWithNegativeValues.length > 0) {
      const firstMachine = machinesWithNegativeValues[0].Machine;
      toast.error(`Please check ${firstMachine}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      // Set status to true to enable the "Print Daily Report" button
      setStatus(true);
      setPrepareReport(true);
    }
  };


  const[selectedMachine,setSelectedMachine]=useState({});
  const[machineName,setMachineName]=useState('')
  //Machine OnClick
  const machineSelected = (Machine,item, index) => {
    console.log("The Machine Selected is ", Machine);
    let list = { ...item, index: index };
    setSelectedMachine(list);
    setMachineName(list.MachineName);
    axios
      .post(baseURL + "/reports/machineOnclick", {
        Date: dateSelect,
        Machine: Machine,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }
        console.log("require response mus", response.data);
        setMachineLogData(response.data);
      });
  };
  console.log(machineName);


  //OnClick Shift
  const[selectedShift,setSelectedShft]=useState({})
  const ShiftSelected = (Shift, Machine,item,index) => {
    let list = { ...item, index: index };
    setSelectedShft(list);
    console.log("The  Selected is ", Shift, Machine);
    axios
      .post(baseURL + "/reports/shiftOnClick", {
        Date: dateSelect,
        Shift: Shift,
        Machine: Machine,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }
        console.log("require response mus", response.data);
        setMachineLogData(response.data);
      });
  };

  //Onclick MainTreeView
  const treeViewHeader = (index) => {
    axios
      .post(baseURL + "/reports/machineLog", { Date: dateSelect })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }
        console.log(response.data);
        setMachineLogData(response.data);
        setSelectedLabelIndex(index);
    setSelectedMachineIndex(-1);
    setIsPageRefreshed(false);
    localStorage.setItem("isPageRefreshed", false);
      });
  };

  let [lazerUser, setLazerUser] = useState(
    JSON.parse(localStorage.getItem("LazerUser"))
  );

  // console.log(multiplerowSelect,selectedRows)
  const [reportsTreeViewData, setReportsTreeView] = useState([]);
  useEffect(() => {
    axios
      .post(baseURL + "/reports/reportsTreeView", { Date:dateSelect ||Date })
      .then((response) => {
        console.log(" RESPONSE ", response.data);
        setReportsTreeView(response.data);
      });
  }, [dateSelect]);
  console.log(reportsTreeViewData)

  const dataSource = [
    {
      type: "Machines",
      collapsed: true,
      serverData: reportsTreeViewData.map((data, index) => ({
        ...data,
        labelIndex: index,
      })),
    },
  ];

  //ONCLICK PRINTDAILY REPORT
  const [opendailyReport, setOpendailyReport] = useState("");
  const[pDFData,setPDFData]=useState([])
  const openPrintdailyPdf = () => {
    if (status == false) {
      toast.error("Prepare Report Before Printing", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setOpendailyReport(true);
      //TRY PDF
      axios
      .post(baseURL + "/reports/printDailyReport", {
        Date: dateSelect,
      })
      .then((res) => {
        console.log(res.data);
        setPDFData(res.data);
      });
      
    }
  };

  ////INPUT VALUE
  const [preparedby, setPreparedby] = useState(lazerUser.data[0].Name);
  const InputChange=(e)=>{
    setPreparedby(e.target.value);
  }

  let roleValue = localStorage.getItem("Role");
console.log(roleValue);

  return (
    <div>
      <ToastContainer />

      <DailyReportPrintModal
        opendailyReport={opendailyReport}
        setOpendailyReport={setOpendailyReport}
        pdfData={pDFData}
        dateSelect={dateSelect}
        preparedby={preparedby}
        roleValue={roleValue}
      />

      <PrepareReportModal1
        prepareReport1={prepareReport1}
        setPrepareReport={setPrepareReport}
        dateSelect={dateSelect}
      />

      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Daily Production Report</h4>
        </div>
      </div>

      <div className="col-md-12">
        <div className="row">
          <div className="col-md-2 mt-3">
            <input
              name="InstallDate"
              onChange={handleChangeSelectDate}
              type="date"
              required
              defaultValue={Date}
            />
          </div>

          <button
            className="button-style mt-3 group-button"
            type="button"
            style={{ width: "150px", marginLeft: "20px" }}
            onClick={openPrepareReport1}
          >
            Prepare Report
          </button>

          <button
            className="button-style mt-3  group-button"
            type="button"
            style={{ width: "150px", marginLeft: "20px" }}
            onClick={openPrintdailyPdf}
            // disabled={status===false ? true : false}
          >
            Print Daily Report
          </button>

          {/* <div className='col-md-3'>
           <label  
           className="">Prepared By</label>
                <input style={{marginTop:"-6px"}} className="in-field" required />
           </div> */}
          <div
            className="col-md-3 mt-2"
            style={{ display: "flex", gap:"20px" }}
          >
            <label className="mt-1 form-label" style={{ whiteSpace: "nowrap" }}>
              Prepared By
            </label>
            <input
              className="in-field mt-2"
              name="preparedby"
              onChange={InputChange}
              value={preparedby}
            />
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="row mt-4">
          <div
            className="col-md-3"
            style={{
              height: "420px",
              overflowY: "scroll",
              fontSize: "14px",
              marginLeft: "-10px",
            }}
          >
            {dataSource.map((node, i) => {
              const type = node.type;
              const label = (
                <span onClick={()=>treeViewHeader(node.labelIndex)} 
                className={`node ${
                  selectedLabelIndex === node.labelIndex
                    ? "selcted-row-clr"
                    : ""
                }`}>
                  {type}
                </span>
              );
              return (
                <TreeView
                  key={type + "|" + i}
                  nodeLabel={label}
                  defaultCollapsed={false}
                >
                  {node.serverData.map((data,key) => {
                    const label2 = (
                      <span
                        style={{ fontSize: "13px" }}
                        onClick={() => {
                          selectedMachineFun(data, key);
                          machineSelected(data.MachineName,data,key);
                        }}
                        className={`node ${
                          key === selectedMachineIndex
                            ? "selcted-row-clr"
                            : ""
                        }`}
                      >
                        {data.MachineName}
                      </span>
                    );

                    return (
                      <TreeView
                        nodeLabel={label2}
                        key={data.name}
                        defaultCollapsed={true}
                      >
                        {data.Shifts.map((value,key) => {
                          const label3 = (
                            <span
                              style={{ fontSize: "13px" }}
                              onClick={() => {
                                ShiftSelected(value.Shift, data.MachineName,value,key);
                              }}
                              className={
                                key === selectedShift?.index
                                  ? "selcted-row-clr"
                                  : ""
                              }
                            >
                              {value.Shift} - {value.time}{" "}
                            </span>
                          );
                          return (
                            <>
                              <TreeView
                                nodeLabel={label3}
                                key={data.name}
                                defaultCollapsed={true}
                              >
                                {value.task.map((data) => {
                                  const label4 = (
                                    <span
                                      style={{ fontSize: "12px" }}
                                      className="node"
                                    >
                                      {data.action} - {data.time}
                                    </span>
                                  );
                                  return (
                                    <>
                                      <TreeView
                                        nodeLabel={label4}
                                        key={data.name}
                                        defaultCollapsed={true}
                                      >
                                        {data.operations.map((value) => {
                                          const label5 = (
                                            <span
                                              style={{ fontSize: "11px" }}
                                              className="node"
                                            >
                                              {value.Operation} - {value.time}
                                            </span>
                                          );
                                          return (
                                            <>
                                              <TreeView
                                                nodeLabel={label5}
                                                key={data.name}
                                                defaultCollapsed={true}
                                              ></TreeView>
                                            </>
                                          );
                                        })}
                                      </TreeView>
                                    </>
                                  );
                                })}
                              </TreeView>
                            </>
                          );
                        })}
                      </TreeView>
                    );
                  })}
                </TreeView>
              );
            })}
          </div>
          <div className="col-md-9">
            <NabTab
              machineutilisationSummartdata={machineutilisationSummartdata}
              productionTaskSummary={productionTaskSummary}
              machineLogData={machineLogData}
              dateSelect={dateSelect}
              setMachineLogData={setMachineLogData}
              setMachineutilisationSummarydata={
                setMachineutilisationSummarydata
              }
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              machinelogRowSelect={machinelogRowSelect}
              status={status}
              machineName={machineName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

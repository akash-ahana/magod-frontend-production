import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import Table from "react-bootstrap/Table";
import axios from "axios";
import SecondTable from "./SecondTable";
import DailyShiftTable from "./DailyShiftTable";
import CreateweekModal from "./Modals/CreateweekModal";
import SetMachineModal from "./Modals/SetMachineModal";
import DeleteshiftModal from "./Modals/DeleteshiftModal";
import DeleteMachineoperatorweekModal from "./Modals/DeleteMachineoperatorweekModal";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../api/baseUrl";
import ModalPrintWeeklyPlan from "./PdfPrinter/WeeklyshiftTable/ModalPrintWeeklyPlan";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function NewCalender(props) {
  //Header Component
  const [dataShiftTypes, setDataShiftTypes] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");

  const [dataShiftIncharge, setDataShiftIncharge] = useState([]);
  const [selectedShiftIncharge, setSelectedShiftIncharge] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [dataMachineList, setGetShiftTypesData] = useState([]);
  const [dataOperatorList, setDataOperatorList] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");

  const getShiftTypesData = async () => {
    const { data } = await axios.get(baseURL + `/shiftEditor/typesOfShifts`);
    //console.log('Shift Types' , data)
    setDataShiftTypes(data);
  };

  const getMachineListData = async () => {
    const { data } = await axios.get(
      baseURL + `/productionSetup/getallmachines`
    );
    //console.log('Machine List' , data)
    setGetShiftTypesData(data);
  };

  const getOperatorListData = async () => {
    const { data } = await axios.get(
      baseURL + `/shiftEditor/getMachineOperators`
    );
    //console.log('Operator List',data);
    setDataOperatorList(data);
  };

  const getShiftInchargeData = async () => {
    const { data } = await axios.get(
      baseURL + `/shiftEditor/shiftInchargeList`
    );
    //console.log('Shift In Charge',data);
    setDataShiftIncharge(data);
  };

  const handleShiftTypeChange = (e) => {
    setSelectedShift(e.target.value);
    console.log("Shift type:", e.target.value);
  };

  const handleShiftIncharge = (e) => {
    //console.log("Shift in charge selected");
    setSelectedShiftIncharge(e.target.value);
    console.log("Selected machine:", e.target.value);
  };

  const handleMachineChange = (e) => {
    console.log("Machine changed");
    setSelectedMachine(e.target.value);
  };

  const handleOperatorList = (e) => {
    //console.log("Operator List Selected");
    setSelectedOperator(e.target.value);
  };

  // console.log('Selected Shift after setting ', selectedShift)
  // console.log('Selected Machine after setting ', selectedMachine)
  // console.log('Selected Operator after Setting', selectedOperator);
  // console.log('Selected Shift In Charge', selectedShiftIncharge)

  useEffect(() => {
    getShiftTypesData();
    getMachineListData();
    getShiftInchargeData();
    getOperatorListData();
  }, []);

  //Calender Component

  const [date, setDate] = useState(new Date());
  console.log(date);

  const [selectedWeek, setSelectedWeek] = useState([""]);
  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [isChecked6, setIsChecked6] = useState(false);
  const [isChecked7, setIsChecked7] = useState(true);

  const handleOnChangeCheckBox1 = () => {
    setIsChecked(!isChecked);
  };

  const handleOnChangeCheckBox2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleOnChangeCheckBox3 = () => {
    setIsChecked3(!isChecked3);
  };

  const handleOnChangeCheckBox4 = () => {
    setIsChecked4(!isChecked4);
  };
  const handleOnChangeCheckBox5 = () => {
    setIsChecked5(!isChecked5);
  };
  const handleOnChangeCheckBox6 = () => {
    setIsChecked6(!isChecked6);
  };
  const handleOnChangeCheckBox7 = () => {
    setIsChecked7(!isChecked7);
  };

  const [weekState, setWeekState] = useState([]);
  const [weekState1, setWeekState1] = useState([]);
  // const [secondTableShiftState, setSecondTableShiftState] = useState([])

  // useEffect(() => {
  //   const res =  axios.post('http://172.16.20.61:5000/shiftEditor/getWeeklyShiftPlanSecondTable', weekState).then((response) => {console.log(response)
  //   setSecondTableShiftState(response.data)})
  // },[weekState])

  //const [checkedItems, setCheckedItems] = useState(allIsHolidayCheckboxes); //plain object as state
  let sunday = selectedWeek[6];
  const checkbox1 = useRef();
  const checkbox2 = useRef();
  const checkbox3 = useRef();
  const checkbox4 = useRef();
  const checkbox5 = useRef();
  const checkbox6 = useRef();
  const checkbox7 = useRef();

  //Modal for CreateWeek shift
  const [openweekshift, setOpenweekshift] = React.useState("");
  const openCreateshiftmodal = () => {
    setOpenweekshift(true);
    // setOpenweekshift(true);
  };

  //WeekTable Component
  const createWeeklyShiftPlan = async (data) => {
    setWeekState([
      {
        checkboxValue: 0,
        isChecked: checkbox1.current.checked,
        ShiftDate: selectedWeek[0],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 1,
        isChecked: checkbox2.current.checked,
        ShiftDate: selectedWeek[1],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 2,
        isChecked: checkbox3.current.checked,
        ShiftDate: selectedWeek[2],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 3,
        isChecked: checkbox4.current.checked,
        ShiftDate: selectedWeek[3],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 4,
        isChecked: checkbox5.current.checked,
        ShiftDate: selectedWeek[4],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 5,
        isChecked: checkbox6.current.checked,
        ShiftDate: selectedWeek[5],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
      {
        checkboxValue: 6,
        isChecked: checkbox7.current.checked,
        ShiftDate: selectedWeek[6],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
      },
    ]);

    const NewWeekState = [...weekState];
  };

  //Calender Component Function
  const selectWeek = (e) => {
    setDate(e);
    createWeek(e);
  };

  const dateFormatter = (inputDate) => {
    let intermediateDate = moment(inputDate).format();
    const onlyDate = intermediateDate.split("T");
    let dateSplit = onlyDate[0].split("-");
    let year = dateSplit[0];
    let month = dateSplit[1];
    let day = dateSplit[2];
    let finalDay = day + "/" + month + "/" + year;
    // console.log('FINAL DAY IS ' , finalDay)

    return finalDay;
  };

  const createWeek = (cuurentDate) => {
    setMachineOperatorTableData([]);

    //console.log('Create Week Array ')
    let weekArray = [];
    if (cuurentDate.toString().includes("Mon")) {
      for (let i = 0; i < 7; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }

      setSelectedWeek(weekArray);
    } else if (cuurentDate.toString().includes("Tue")) {
      for (let i = 1; i > 0; i--) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() - i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }

      for (let i = 0; i < 6; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
      setSelectedWeek(weekArray);
    } else if (cuurentDate.toString().includes("Wed")) {
      for (let i = 2; i > 0; i--) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() - i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }

      for (let i = 0; i < 5; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
      setSelectedWeek(weekArray);
    } else if (cuurentDate.toString().includes("Thu")) {
      for (let i = 3; i > 0; i--) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() - i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }

      for (let i = 0; i < 4; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
      setSelectedWeek(weekArray);
    } else if (cuurentDate.toString().includes("Fri")) {
      for (let i = 4; i > 0; i--) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() - i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }

      for (let i = 0; i < 3; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
      setSelectedWeek(weekArray);
    } else if (cuurentDate.toString().includes("Sat")) {
      for (let i = 5; i > 0; i--) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() - i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }

      for (let i = 0; i < 2; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
      setSelectedWeek(weekArray);
    } else if (cuurentDate.toString().includes("Sun")) {
      for (let i = 6; i > 0; i--) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() - i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }

      for (let i = 0; i < 1; i++) {
        var datenew = new Date(cuurentDate);
        datenew.setDate(datenew.getDate() + i);
        let newDate = dateFormatter(datenew);
        weekArray.push(newDate);
      }
      setSelectedWeek(weekArray);
    }
  };
  const [rowselect, setRowselect] = useState({});
  const rowSelectFun = (item, index) => {
    let list = { item, index: index };
    setRowselect(list);
  };
  

  // Default row select for Date table
  useMemo(() => {
    setRowselect({ item: selectedWeek[0], index: 0 });
  }, [selectedWeek[0]]);
  const [SingleDayShiftPlan4thTable, setSingleDayShiftPlan4thTable] = useState([]);
  const getSingleDayShiftPlan4thTable = () => {
    const res = axios
      .post(baseURL + "/shiftEditor/getDailyShiftPlanTable", {
        ShiftDate: rowselect,
      })
      .then((response) => {
        console.log("DAILY SHIFT RESPONSE IS  ", response);
        if (response.data === "") {
          console.log("response data is null");
        } else {
          console.log("SINGLE DAY SHIFT PLAN 4TH TABLE ", response.data);
          if (response.data.length === 0) {
            console.log("DATA IS EMPTY");
          } else {
            console.log("DATA IS PRESENT");
            for (let i = 0; i < response.data.length; i++) {
              let dateSplit = response.data[i].ShiftDate.split("-");
              let year = dateSplit[2];
              let month = dateSplit[1];
              let day = dateSplit[0];
              let finalDay = year + "-" + month + "-" + day;
              console.log("RESPONSE SHIFT DATE IS ", finalDay);
              response.data[i].ShiftDate = finalDay;

              let dateSplitFromTime = response.data[i].FromTime.split("-");
              console.log(
                " DATE SPLIT RESPONSE From tIME IS ",
                dateSplitFromTime
              );
              let yearFromTime = dateSplitFromTime[0];
              let monthFromTime = dateSplitFromTime[1];
              let dayFromTimeINITIAL = dateSplitFromTime[2].split(" ");
              let dayFromTimeFinal = dayFromTimeINITIAL[0];
              let time = dayFromTimeINITIAL[1];
              let finalDayFromTime =
                dayFromTimeFinal +
                "-" +
                monthFromTime +
                "-" +
                yearFromTime +
                " " +
                time;
              console.log("RESPONSE From tIME IS ", finalDayFromTime);
              response.data[i].FromTime = finalDayFromTime;

              let dateSplitToTime = response.data[i].ToTime.split("-");
              console.log(" DATE SPLIT RESPONSE To tIME IS ", dateSplitToTime);
              let yearToTime = dateSplitToTime[0];
              let monthToTime = dateSplitToTime[1];
              let dayToTimeINITIAL = dateSplitToTime[2].split(" ");
              let dayToTimeFinal = dayToTimeINITIAL[0];
              let time1 = dayToTimeINITIAL[1];
              let finalDayToTime =
                dayToTimeFinal +
                "-" +
                monthToTime +
                "-" +
                yearToTime +
                " " +
                time1;
              console.log("RESPONSE To tIME IS ", finalDayToTime);
              response.data[i].ToTime = finalDayToTime;
              //data[i].FromTime = finalDayFromTime
            }
          }
          setSingleDayShiftPlan4thTable(response.data);
        }
      });
  };

  useEffect(() => {
    getSingleDayShiftPlan4thTable();
  }, [rowselect]);

  const [secondTableShiftState, setSecondTableShiftState] = useState([]);
  // console.log(selectedWeek);
  const getSecondTableData = () => {
    const res = axios
      .post(
        baseURL + "/shiftEditor/getWeeklyShiftPlanSecondTable",
        selectedWeek
      )
      .then((response) => {
        console.log("Api response is ", response);
        if (response.data === "") {
          console.log("response data is null");
        } else {
          setSecondTableShiftState(response.data);
        }
      });
  };
  // console.log('Second Table Sift State in New Calender component', secondTableShiftState)
  // console.log(selectedWeek)
  useEffect(() => {
    getSecondTableData();
  }, [selectedWeek]);

  const onSetMachineOperators = () => {
    setWeekState1([
      {
        checkboxValue: 0,
        isChecked: checkbox1.current.checked,
        ShiftDate: selectedWeek[0],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 1,
        isChecked: checkbox2.current.checked,
        ShiftDate: selectedWeek[1],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 2,
        isChecked: checkbox3.current.checked,
        ShiftDate: selectedWeek[2],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 3,
        isChecked: checkbox4.current.checked,
        ShiftDate: selectedWeek[3],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 4,
        isChecked: checkbox5.current.checked,
        ShiftDate: selectedWeek[4],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 5,
        isChecked: checkbox6.current.checked,
        ShiftDate: selectedWeek[5],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
      {
        checkboxValue: 6,
        isChecked: checkbox7.current.checked,
        ShiftDate: selectedWeek[6],
        Shift: selectedShift,
        Shift_Ic: selectedShiftIncharge,
        Machine: selectedMachine,
        Operator: selectedOperator,
      },
    ]);
  };

  const [rowselectDailyShiftTable, setRowselectDailyShiftTable] = useState("");
  const rowSelectFunForDailyShiftTable = (item, index) => {
    let list = { ...item, index: index };
    // console.log("ScheduleNo",item.ScheduleNo)
    //setScheduleid(item.OrdSchNo);
    setRowselectDailyShiftTable(list);
  };

  //Open Set Machine Modal
  const [opensetmachine, setOpensetmachine] = useState("");
  const openSetMachinemodal = () => {
    setOpensetmachine(true);
  };

  //MachineOperator Table
  const [machineOperatorTableData, setMachineOperatorTableData] = useState([]);
  console.log(rowselectDailyShiftTable);

  const getMachineOperatorTableData = () => {
    let constRowSelectDailyShiftTable = rowselectDailyShiftTable;
    if (
      typeof constRowSelectDailyShiftTable !== "undefined" &&
      constRowSelectDailyShiftTable != null
    ) {
    } else {
    }
    const res = axios
      .post(
        baseURL + "/shiftEditor/getMachineOperatorsShift",
        rowselectDailyShiftTable
      )
      .then((response) => {
        console.log("Api response is ", response);
        if (response.data === "") {
          // console.log('response data is null')
        } else {
          // console.log(response.data);
          setMachineOperatorTableData(response.data);
        }
      });
  };

  //Delete Weekshift
  const [opendeleteshift, setOpendeleteshift] = useState("");
  const openDeleteshiftmodal = () => {
    setOpendeleteshift(true);
  };
  const onClickDeleteWeekShift = () => {
    //  console.log('Delete Week Shift Clicked ', 'Shift Selected is ', selectedShift, 'selected week is ', selectedWeek)
    axios
      .post(baseURL + "/shiftEditor/deleteWeekShift", {
        selectedShift: selectedShift,
        selectedWeek: selectedWeek,
      })
      .then((response) => {
        console.log(response);
        getSecondTableData();
        getSingleDayShiftPlan4thTable();
        // setWeekState1('')
      });
  };

  //DELETE MACHINE OPERATOR FOR WEEK
  const onClickDeleteWeekOperatorMachine = () => {
    // console.log(' Delete Operator for week is clicked ' , ' Shift Selected is ' , selectedShift , ' Selected Week is ' , selectedWeek , ' selected Machine is ' , selectedMachine , ' Selected Operator is ' ,selectedOperator )
    axios
      .post(baseURL + "/shiftEditor/deleteWeekOperatorForMachine", {
        selectedShift: selectedShift,
        selectedWeek: selectedWeek,
        selectedMachine: selectedMachine,
        selectedOperator: selectedOperator,
      })
      .then((response) => {
        console.log(response);
        getMachineOperatorTableData();
        getSecondTableData();
        setWeekState1("");
      });
  };
  const [opendeleteoperator, setOpendeleteoperator] = useState("");
  const openDeletemachineoperator = () => {
    setOpendeleteoperator(true);
  };
  
  const createWeekPlannEW = async () => {
    console.log("button clicked");
    const { data } = await axios.post(
      baseURL + "/shiftEditor/getWeeklyShiftPlanSecondTable",
      selectedWeek
    );
    console.log(data);
  };

  // Open Print Pdf
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const openPdfmodel = () => {
    if (selectedWeek[0] === "") {
      toast.error("Please Select Dates", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setOpenPrintModal(true);
    }
  };

  return (
    <>
      <ToastContainer />

      <ModalPrintWeeklyPlan
        openPrintModal={openPrintModal}
        setOpenPrintModal={setOpenPrintModal}
        selectedWeek={selectedWeek}
      />

      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Production Department: Shift Editor</h4>
        </div>
      </div>

      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">
            <h6 className="mt-2">Weekly Shift Editor</h6>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Shift</label>
                <select className="ip-select" onChange={handleShiftTypeChange}>
                  <option selected>Select Shift</option>
                  {dataShiftTypes.map((dataShiftTypes) => (
                    <option value={dataShiftTypes}>{dataShiftTypes}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3" style={{ marginTop: "20px" }}>
                <button
                  className="button-style mt-2 group-button mt-4"
                  style={{ width: "150px" }}
                  onClick={() => {
                    openCreateshiftmodal();
                    createWeeklyShiftPlan();
                  }}
                >
                  Create Week Shift
                </button>
              </div>              <div className="col-md-3">
                <label className="form-label">Machine</label>
                <select className="ip-select" onChange={handleMachineChange}>
                  <option selected>Select Machine</option>
                  {dataMachineList.map((dataMachineList) => (
                    <option value={dataMachineList.refName}>
                      {dataMachineList.refName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3" style={{ marginTop: "20px" }}>
                <button
                  className="button-style mt-2 group-button mt-4"
                  style={{ width: "200px" }}
                  onClick={() => {
                    onSetMachineOperators();
                    openSetMachinemodal();
                  }}
                >
                  Set Machine Operator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ////// */}

      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">
            <div style={{ color: "red", fontSize: "14px" }}>
              <b>
                {selectedWeek[0]} Monday To {selectedWeek[6]} Sunday
              </b>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Shift Incharge</label>
                <select className="ip-select" onChange={handleShiftIncharge}>
                  <option selected>Select Shift Incharge</option>
                  {dataShiftIncharge.map((dataShiftIncharge) => (
                    <option value={dataShiftIncharge}>
                      {dataShiftIncharge}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3" style={{ marginTop: "20px" }}>
                <button
                  className="button-style mt-2 group-button mt-3"
                  style={{ width: "150px" }}
                  // onClick={onClickDeleteWeekShift}
                  onClick={openDeleteshiftmodal}
                >
                  Delete Week Shift
                </button>
              </div>              <div className="col-md-3">
                <label className="form-label">Operator</label>
                <select className="ip-select" onChange={handleOperatorList}>
                  <option selected>Select Operator</option>
                  {dataOperatorList.map((dataOperatorList) => (
                    <option value={dataOperatorList.Name}>
                      {dataOperatorList.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3" style={{ marginTop: "20px" }}>
                <button
                  className="button-style mt-2 group-button mt-3"
                  style={{ width: "200px" }}
                  onClick={openDeletemachineoperator}
                >
                  Delete Machine Operator
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3"></div>

          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-3" style={{ marginTop: "20px" }}>
                <button
                  className="button-style  group-button"
                  style={{ width: "150px" }}
                  onClick={openPdfmodel}
                >
                  Print Weekly Plan
                </button>
              </div>              <div className="col-md-3"></div>
              
            </div>
          </div>
        </div>
      </div>
      <hr
        style={{
          backgroundColor: "black",
          height: "3px",
        }}
      />
      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <div style={{ display: "flex" }}>
        <div>
          <div>
            <div
              style={{ width: "260px", fontSize: "13px", marginTop: "23px" }}
            >
              <ReactCalendar
                onChange={(e) => {
                  selectWeek(e);
                }}
                showWeekNumbers
                showFixedNumberOfWeeks
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              {/* <div> */}
              {/* <div> */}
              <div style={{ width: "130px", border: "1px" }}>
                <Table bordered>
                  <thead style={{ textAlign: "center" }}>
                    <tr>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody className="tablebody">
                    {selectedWeek.map((rank, i, row) => {
                      return (
                        <>
                          <tr
                            onClick={() => rowSelectFun(rank, i)}
                            className={
                              i === rowselect?.index ? "selcted-row-clr" : ""
                            }
                          >
                            <td>{rank}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>

            <div>
              <Table
                bordered
                style={{ width: "130px", border: "1px", height: "180px" }}
              >
                <thead style={{ textAlign: "center" }}>
                  <tr>
                    <th>Holiday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ height: "38px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox1}
                          checked={isChecked}
                          onChange={handleOnChangeCheckBox1}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "38px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox2}
                          checked={isChecked2}
                          onChange={handleOnChangeCheckBox2}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "38px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox3}
                          checked={isChecked3}
                          onChange={handleOnChangeCheckBox3}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "38px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox4}
                          checked={isChecked4}
                          onChange={handleOnChangeCheckBox4}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "38px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox5}
                          checked={isChecked5}
                          onChange={handleOnChangeCheckBox5}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "37px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox6}
                          checked={isChecked6}
                          onChange={handleOnChangeCheckBox6}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "37px" }}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          ref={checkbox7}
                          defaultChecked={true}
                          checked={isChecked7}
                          onChange={handleOnChangeCheckBox7}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <div>
          <SecondTable week={secondTableShiftState} />
        </div>

        <DailyShiftTable
          SingleDayShiftPlan4thTable={SingleDayShiftPlan4thTable}
          setSingleDayShiftPlan4thTable={setSingleDayShiftPlan4thTable}
          rowSelectFunForDailyShiftTable={rowSelectFunForDailyShiftTable}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          selectedWeek={selectedWeek}
          getMachineOperatorTableData={getMachineOperatorTableData}
          machineOperatorTableData={machineOperatorTableData}
          setRowselectDailyShiftTable={setRowselectDailyShiftTable}
          getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
          getSecondTableData={getSecondTableData}
          rowselect={rowselect}
        />
      </div>

      <CreateweekModal
        openweekshift={openweekshift}
        setOpenweekshift={setOpenweekshift}
        selectedShift={selectedShift}
        selectedShiftIncharge={selectedShiftIncharge}
        selectedWeek={selectedWeek}
        weekState={weekState}
        getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
        getSecondTableData={getSecondTableData}
        setWeekState={setWeekState}
        createWeeklyShiftPlan={createWeeklyShiftPlan}
      />

      <SetMachineModal
        opensetmachine={opensetmachine}
        setOpensetmachine={setOpensetmachine}
        selectedMachine={selectedMachine}
        selectedOperator={selectedOperator}
        selectedWeek={selectedWeek}
        weekState1={weekState1}
        setWeekState1={setWeekState1}
        getSecondTableData={getSecondTableData}
        getMachineOperatorTableData={getMachineOperatorTableData}
        getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
        selectedShift={selectedShift}
      />

      <DeleteshiftModal
        opendeleteshift={opendeleteshift}
        setOpendeleteshift={setOpendeleteshift}
        onClickDeleteWeekShift={onClickDeleteWeekShift}
        selectedShiftIncharge={selectedShiftIncharge}
        selectedShift={selectedShift}
        selectedWeek={selectedWeek}
      />
      
      <DeleteMachineoperatorweekModal
        opendeleteoperator={opendeleteoperator}
        setOpendeleteoperator={setOpendeleteoperator}
        openDeletemachineoperator={openDeletemachineoperator}
        onClickDeleteWeekOperatorMachine={onClickDeleteWeekOperatorMachine}
        selectedShift={selectedShift}
        selectedMachine={selectedMachine}
        selectedWeek={selectedWeek}
        selectedOperator={selectedOperator}
      />

      {/* <PrintWeeklyplan selectedWeek={selectedWeek}/> */}
    </>
  );
}

export default NewCalender;

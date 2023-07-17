import React, { useState, useEffect } from 'react';
import axios from "axios";
import AddOperatorModal from './Modals/AddOperatorModal';
import DeleteOperatorForDay from './Modals/DeleteOperatorfordayModal';
import { baseURL } from '../../../api/baseUrl';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function DailyOperator(props) {
  const [selectedMachine, setSelectedMachine] = useState('');
  const [dataMachineList, setDataMachineList] = useState([]);
  const [dataOperatorList, setDataOperatorList] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState('');

  const getMachineListData = async () => {
    const { data } = await axios.get(baseURL + `/productionSetup/getallmachines`);
    setDataMachineList(data);
  };

  const getOperatorListData = async () => {
    const { data } = await axios.get(baseURL + `/shiftEditor/getMachineOperators`);
    setDataOperatorList(data);
  };

  const handleMachineChange = (e) => {
    setSelectedMachine(e.target.value);
  };

  const handleOperatorChange = (e) => {
    setSelectedOperator(e.target.value);
  };

  const createDailyOperatorList = () => {
    axios.post(baseURL + '/shiftEditor/setMachineOperatorDay', {
      ShiftDate: props.data.ShiftDate,
      Shift: props.data.Shift,
      FromTime: props.data.FromTime,
      ToTime: props.data.ToTime,
      Machine: selectedMachine,
      Operator: selectedOperator,
      DayShiftID: props.data.DayShiftId
    }).then((response) => {
      console.log(response);
      props.getMachineOperatorTableData();
      toast.success('Machine Operator Added', {
        position: toast.POSITION.TOP_CENTER
      });
    });
  };

  const onDeleteOperatorForDay = () => {
    axios.post(baseURL + '/shiftEditor/deleteMachineOperatorDay', props.rowselectMachineOperator)
      .then((response) => {
        console.log(response);
        props.getMachineOperatorTableData();
        toast.success('Machine Operator Deleted', {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  useEffect(() => {
    getMachineListData();
    getOperatorListData();
    setSelectedMachine(props.rowselectMachineOperator.Machine);
    setSelectedOperator(props.rowselectMachineOperator.Operator);
  }, [props.rowselectMachineOperator]);

  const openAddOperator = () => {
    // Implement your logic for opening the AddOperatorModal here
  };

  const openDeleteOperator = () => {
    // Implement your logic for opening the DeleteOperatorForDay modal here
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "lightgrey", marginTop: "5px", marginLeft: "5px", fontSize: "14px" }}>
      <ToastContainer />
      <div>
        <div style={{ color: "red" }}><b>{props.data.Shift} Shift</b></div>
      </div>
      <div className="col-md-11" style={{ display: "flex" }}>
        <div style={{ marginLeft: "5px" }}>
          <label className="form-label">Machine</label>
        </div>
        <div style={{ marginLeft: "33px", marginTop: "6px" }}>
          <select className="ip-select" onChange={handleMachineChange} value={selectedMachine}>
            {dataMachineList.map((dataMachineList) => (
              <option key={dataMachineList.refName} value={dataMachineList.refName}>
                {dataMachineList.refName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="col-md-11" style={{ display: "flex" }}>
        <div style={{ marginLeft: "5px" }} >
          <label className="form-label">Operator</label>
        </div>
        <div style={{ marginLeft: "30px", marginTop: "6px" }}>
          <select className="ip-select" onChange={handleOperatorChange} value={selectedOperator}>
            {dataOperatorList.map((dataOperatorList) => (
              <option key={dataOperatorList.Name} value={dataOperatorList.Name}>
                {dataOperatorList.Name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="button-style mt-2 group-button mt-4"
        style={{ width: "150px", fontSize: "14px" }}
        onClick={createDailyOperatorList}
      >
        Add Operator for Day
      </button>

      <button
        className="button-style mt-2 group-button mt-4"
        style={{ width: "160px", fontSize: "14px", marginBottom: "10px" }}
        onClick={onDeleteOperatorForDay}
      >
        Delete Operator For Day
      </button>
{/* 
      <AddOperatorModal
        addoperator={addoperator}
        setAddoperator={setAddoperator}
      />

      <DeleteOperatorForDay
        deleteoperator={deleteoperator}
        setDeleteoperator={setDeleteoperator}
      /> */}
    </div>
  );
}

export default DailyOperator;

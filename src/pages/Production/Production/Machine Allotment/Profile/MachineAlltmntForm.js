import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import NavTab from "./NavTab";
import TreeView from "react-treeview";
import ChangeMachineModal from "./ChangeMachineModal";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../../../.././api/baseUrl";
import CustomModal from "../../../CustomModal";

export default function MachineAlltmntForm() {
  const [machineProcessData, setMachineProcessData] = useState([]);
  const [machineList, setMachineList] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [machineSelect, setMachineSelect] = useState({});
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(-1);
  const [isPageRefreshed, setIsPageRefreshed] = useState(true);
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(-1);
  const [currentSelectedMachine, setCurrentSelectedMachine] = useState("");
  const [modalShow2, setModalShow2] = useState(false);


  useEffect(() => {
    const isPageRefreshed = localStorage.getItem("isPageRefreshed") === "true";
    setIsPageRefreshed(isPageRefreshed);
    localStorage.setItem("isPageRefreshed", false);
  }, []);

  const selectedMachineFun = (item, index) => {
    setSelectedMachineIndex(index);
    setSelectedLabelIndex(-1);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //open Change Machine Popup
  const [openModal, setOpenModal] = useState("");
  const openChangeMachineModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    // setSelectedRows([])
  };

  const [selectNcProgram, setSelectProgram] = useState({});
  const [ncProgramsTableData, setNcProgramsTableData] = useState([]);
  const [selectedMachineTreeView, setSelectedMachineTreeView] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const onClickMachine = (Machine, key) => {
    setSelectedRows([]);
    axios
      .post(baseURL + "/machineAllotment/getNCprogramTabTableData", {
        MachineName: Machine,
      })
      .then((response) => {
        setNcProgramsTableData(response.data);
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].isChecked = false;
        }
      });
    setSelectedMachineTreeView(Machine);
    setMachineList([]);
    setCurrentSelectedMachine(Machine);
  };

  //SELECTED ROWS IS THE STATE TO CHANGE THE MACHINES
  const handleCheckboxChange = (item, key) => {
    const constncProgramsTableData = ncProgramsTableData;
    if (ncProgramsTableData[key].isChecked === true) {
      constncProgramsTableData[key].isChecked = false;
    } else {
      constncProgramsTableData[key].isChecked = true;
    }
    setNcProgramsTableData(constncProgramsTableData);
    if (selectedRows.length === 0) {
      axios
        .post(
          baseURL +
            "/machineAllotment/machineAllotmentScheduleTableFormMachines",
          item
        )
        .then((response) => {
          setMachineList(response.data);
        });
      setSelectedRows([item]);
    } else {
      //  console.log()
      if (item.Operation === selectedRows[0].Operation) {
        if (selectedRows.includes(item)) {
          setSelectedRows(selectedRows.filter((r) => r !== item));
        } else {
          setSelectedRows([...selectedRows, item]);
        }
      } else {
        // toast.error("Please select a program with the same operation", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        setModalShow2(true);
        const constNCProgramsTableData = ncProgramsTableData;
        constNCProgramsTableData[key].isChecked = false;
        setNcProgramsTableData(constNCProgramsTableData);
      }
    }
  };

  
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const treeViewData = () => {
    setIsLoading(true); // Set loading state to true before fetching data
    axios
      .get(baseURL + "/machineAllotment/profileListMachineswithLoad")
      .then((response) => {
        setMachineProcessData(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching machine process data:", error);
        setIsLoading(false); // Set loading state to false in case of error
      });
  };
  useEffect(() => {
    treeViewData();
    onClickMachine();
  }, []);

  const dataSource = [
    {
      type: "Machines",
      collapsed: false,
      serverData: machineProcessData.map((data, index) => ({
        ...data,
        labelIndex: index,
      })),
    },
  ];

  // \\\\\\\\\\\\\\\\\/////////////////////

  const [open, setOpen] = useState("");
  const showPopup = () => {
    setOpen(true);
  };

  const clickChangeMachine = async () => {
    axios
      .post(baseURL + "/machineAllotment/changeMachineHeaderButton", {
        programs: selectedRows,
        newMachine: selectedMachine,
      })
      .then((response) => {
        handleClose();
      });
    setSelectedRows([]);
    setMachineList([]);
    console.log("Selected machine:", currentSelectedMachine.MachineName);
    axios
      .post(baseURL + "/machineAllotment/afterChangeMachine", {
        MachineName: currentSelectedMachine.MachineName,
      })
      .then((response) => {
        console.log(response.data)
        setNcProgramsTableData(response.data);
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].isChecked = false;
        }
      });
    };

  useMemo(() => {}, [machineProcessData[0]]);

  const onMachineChange = (e) => {
    setSelectedMachine(e.target.value);
  };

  const onClickMachineLabel = (index) => {
    axios
      .post(baseURL + "/machineAllotment/getNCprogramTabTableDatauseEffect", {
        MachineName: "Laser 6",
      })
      .then((response) => {
        console.log(response.data);
        setNcProgramsTableData(response.data);
      });
    setSelectedLabelIndex(index);
    setSelectedMachineIndex(-1);
    setIsPageRefreshed(false);
    localStorage.setItem("isPageRefreshed", false);
  };

  useEffect(() => {
    onClickMachineLabel();
  }, []);

  const closeModal = () => {
    setModalShow2(false);
  };
  const modalData = {
    title: 'Machine Allotment',
    content: 'Please select a program with the same operation'
  };



  return (
    <>
      <ToastContainer />
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Machine Allotment Form</h4>
        </div>
      </div>

      <div className="col-md-12 mt-3">
        <div className="row">
          <button
            className="button-style mt-2 group-button ms-2"
            style={{ width: "150px" }}
          >
            Save
          </button>

          <button
            className="button-style mt-2 group-button "
            style={{ width: "150px" }}
            onClick={openChangeMachineModal}
          >
            Change Machine
          </button>

          <div className="col-md-3">
            <select
              className="ip-select dropdown-field"
              onChange={onMachineChange}
            >
              <option>Select Machine</option>
              {machineList.map((value, key) => (
                <option value={value.refName} key={key}>
                  {value.refName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="row">
          <div
            className="col-md-3 mt-4"
            style={{
              overflowY: "scroll",
              overflowX: "scroll",
              fontSize: "12px",
              marginLeft: "-20px",
              height: "430px",
            }}
          >
            {isLoading ? (
              <div>
                <b>Loading...</b>
              </div>
            ) : (
              dataSource.map((node, i) => {
                const type = node.type;
                const label = (
                  <span
                    style={{ fontSize: "16px" }}
                    className={`node ${
                      selectedLabelIndex === node.labelIndex
                        ? "selcted-row-clr"
                        : ""
                    }`}
                    onClick={() => onClickMachineLabel(node.labelIndex)}
                  >
                    {type}
                  </span>
                );
                return (
                  <TreeView
                    key={type + "|" + i}
                    nodeLabel={label}
                    defaultCollapsed={false}
                  >
                    {node.serverData.map((data, key) => {
                      const label2 = (
                        <span
                          style={{
                            backgroundColor: "#C0C0C0",
                            fontSize: "14px",
                          }}
                          onClick={() => {
                            selectedMachineFun(data, key);
                            onClickMachine(data, key);
                          }}
                          className={`node ${
                            key === selectedMachineIndex
                              ? "selcted-row-clr"
                              : ""
                          }`}
                        >
                          {data.MachineName} &nbsp;{data.formattedLoad}
                        </span>
                      );

                      return (
                        <TreeView
                          nodeLabel={label2}
                          key={data.name}
                          defaultCollapsed={false}
                        >
                          <ul>
                            {data.process.map((value) => {
                              return (
                                <>
                                  <li
                                    className="node"
                                    style={{
                                      marginLeft: "-10px",
                                      fontSize: "11px",
                                    }}
                                  >
                                    {value.RefProcess} &nbsp;{" "}
                                    {value.formattedLoad}
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        </TreeView>
                      );
                    })}
                  </TreeView>
                );
              })
            )}
          </div>
          <div className="col-md-9 mt-4">
            <NavTab
              machineSelect={machineSelect}
              ncProgramsTableData={ncProgramsTableData}
              selectNcProgram={selectNcProgram}
              setNcProgramsTableData={setNcProgramsTableData}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        </div>
      </div>
      <ChangeMachineModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedRows={selectedRows}
        selectedMachine={selectedMachine}
        clickChangeMachine={clickChangeMachine}
        handleClose={handleClose}
      />
            <CustomModal show={modalShow2} handleClose={closeModal} data={modalData} />
    </>
  );
}

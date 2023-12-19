import React from "react";
import { useGlobalContext } from "../../../../../Context/Context";
import { useState } from "react";
import ShowStatusPdfModal from "./PrintPdF/ShowStatus/ShowStatusPdfModal";
import ShowPartsPdfModal from "./PrintPdF/ShowParts/ShowPartsPdfModal";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";
import ShowProgramsPdfModal from "./PrintPdF/ShowPrograms/ShowProgramsPdfModal";
import { Typeahead } from "react-bootstrap-typeahead";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Row,
  Col,
  Form,
  FormLabel,
  FormCheck,
  Button,
} from "react-bootstrap";
import ProductionListModal from "./PrintPdF/ProductionList/ProductionListModal";

export default function ScheduleHeader({
  rowselect,
  processrowselect,
  partlistdata,
  programlistdata,
  custdata,
  selectCust,
  getShowPartsData,
  showParts
}) {
  const { schedulelistdata, setSchedulelistdata, schedulelistdatas } =
    useGlobalContext();
    const [allotmentTable, setAllotmentTable] = useState([]);

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  const [openShowStatus, setOpenShowStatus] = useState("");
  const openShowStatusPdf = () => {
    setOpenShowStatus(true);
  };

  const [openShowparts, setOpenShowParts] = useState("");
  const openShowPartsPdf = () => {
    setOpenShowParts(true);
    getShowPartsData();
  };

  const [openShowPrograms, setOpenShowPrograms] = useState("");
  const openShowProgram = () => {
    setOpenShowPrograms(true);
  };

  const [openProductionList, setOpenProductionList] = useState("");
  const openProductionListPdf = () => {
    setOpenProductionList(true);
  };

  // const searchText = (e) => {
  //   let number = e.target.value;
  //   let filteredData = schedulelistdata.filter((data) => {
  //     return data.OrdSchNo.startsWith(number);
  //   });
  //   if (filteredData.length > 0) {
  //     setSchedulelistdata(filteredData);
  //   }
  //   if (e.target.value.length === 0) {
  //     setSchedulelistdata(schedulelistdatas);
  //   }
  // };

  const [programmedtatus, setProgrammedstatus] = useState([]);
  const [completedStatus, setCompletedStatus] = useState([]);
  const [productionStatus, setProductionStatus] = useState([]);
  const [taskedStatus, setTaskedStatus] = useState([]);

  // const[showStatusdata,setShowStatusdata]=useState({})

  const handleChangeCustomer = (e) => {
    // setSelectedCustomer(e.target.value);
  };

  const getPrintStatus = () => {
    // Programmed Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusProgrammed")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // FOR TgtDelDate
          let dateSplit = response.data[i].schTgtDate.split(" ");
          let date = dateSplit[0].split("-");
          let year = date[0];
          let month = date[1];
          let day = date[2];
          let finalDay = day + "-" + month + "-" + year + " ";
          response.data[i].schTgtDate = finalDay;
        }
        for (let i = 0; i < response.data.length; i++) {
          // Delivery_date
          let dateSplit1 = response.data[i].Delivery_Date.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let finalDay1 = day1 + "-" + month1 + "-" + year1 + " ";
          response.data[i].Delivery_Date = finalDay1;
        }
        setProgrammedstatus(response.data);
        //  console.log(response)
      });
    //  Completed Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusCompleted")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // FOR TgtDelDate
          let dateSplit = response.data[i].schTgtDate.split(" ");
          let date = dateSplit[0].split("-");
          let year = date[0];
          let month = date[1];
          let day = date[2];
          let finalDay = day + "-" + month + "-" + year + " ";
          response.data[i].schTgtDate = finalDay;
        }
        for (let i = 0; i < response.data.length; i++) {
          // Delivery_date
          let dateSplit1 = response.data[i].Delivery_Date.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let finalDay1 = day1 + "-" + month1 + "-" + year1 + " ";
          response.data[i].Delivery_Date = finalDay1;
        }
        setCompletedStatus(response.data);
        //  console.log(response)
      });

    //Production Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusProduction")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // FOR TgtDelDate
          let dateSplit = response.data[i].schTgtDate.split(" ");
          let date = dateSplit[0].split("-");
          let year = date[0];
          let month = date[1];
          let day = date[2];
          let finalDay = day + "-" + month + "-" + year + " ";
          response.data[i].schTgtDate = finalDay;
        }
        for (let i = 0; i < response.data.length; i++) {
          // Delivery_date
          let dateSplit1 = response.data[i].Delivery_Date.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let finalDay1 = day1 + "-" + month1 + "-" + year1 + " ";
          response.data[i].Delivery_Date = finalDay1;
        }
        setProductionStatus(response.data);
        //  console.log(response)
      });

    //Tasked Status
    axios
      .get(baseURL + "/scheduleListProfile/schedulesListStatusTasked")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          // FOR TgtDelDate
          let dateSplit = response.data[i].schTgtDate.split(" ");
          let date = dateSplit[0].split("-");
          let year = date[0];
          let month = date[1];
          let day = date[2];
          let finalDay = day + "-" + month + "-" + year + " ";
          response.data[i].schTgtDate = finalDay;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].Delivery_Date.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let finalDay1 = day1 + "-" + month1 + "-" + year1 + " ";

          response.data[i].Delivery_Date = finalDay1;
        }
        setTaskedStatus(response.data);
        //  console.log(response)
      });
  };

  const showStatusData = [
    { status: "Programmed", data: programmedtatus },
    // { status: "Completed", data: completedStatus },
    { status: "Production", data: productionStatus },
    { status: "Tasked", data: taskedStatus },
  ];

  // const jsonData=JSON.stringify(arrays)
  // console.log(arrays);

  const [getCustomerDetails, setGetCustomerDetails] = useState([]);
  const getCustomerList = () => {
    axios
      .get(baseURL + "/scheduleListProfile/allcustomersData")
      .then((response) => {
        console.log(response.data);
        setGetCustomerDetails(response.data);
      });
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  //TRY SEARCH
  const [searchInput, setSearchInput] = useState("");
  const searchText1 = (e) => {
    const searchText = e.target.value;
    const sanitizedSearchText = searchText.replace(/[^0-9 ]/g, ''); // Remove non-numeric characters except spaces
    setSearchInput(sanitizedSearchText);
  
    // Apply the filter on allotmentTable based on the search input value
    const filteredData = schedulelistdatas.filter((data) =>
      data.OrdSchNo.startsWith(sanitizedSearchText)
    );
  
    setSchedulelistdata(filteredData);
  };
  

  const navigate = useNavigate();
  const onClickClose=()=>{
    navigate("/Production");
  }

  return (
    <div>
      <div className="col-md-12 col-sm-12">
        <div>
          <h4 className="title">Production Schedules Information</h4>
        </div>
      </div>

      <div>
        <div className="row"></div>
      </div>

      <div className="col-md-12 col-sm-12">
        <div className="">
          <div className="row">
            <div className="col-md-3 mt-4">
              <Form.Group controlId="CustName" style={{marginTop:"2px"}}>
                {custdata.length > 0 ? (
                  <Typeahead
                    options={custdata}
                    placeholder="Search Customer"
                    onChange={(label, event) => selectCust(label)}
                  />
                ) : (
                  ""
                )}
              </Form.Group>
            </div>

            <div className="col-md-2 mt-3">
              {/* <label className="form-label mt-2">Find Schedule</label> */}
              <input 
                className="in-field my-0 mt-3"
                placeholder="Search Schedule"
                onKeyDown={blockInvalidChar}
                type="text" // Change the input type to "text"
                value={searchInput} // Set the value to the state variable
                onChange={searchText1} // Call the searchText function on change
              />
            </div>

            {/* <button className="button-style mt-5 ms-5 group-button"
             style={{ width: "120px"}}>
              Reset Status
            </button> */}
            <div className="col-md-7 mt-2">
              <button
                className="button-style  group-button"
                style={{ width: "120px" }}
                onClick={() => {
                  openShowStatusPdf();
                  getPrintStatus();
                }}
              >
                Show Status
              </button>

              <button
                className="button-style mt-4 group-button"
                style={{ width: "120px" }}
                onClick={openShowPartsPdf}
              >
                Show Parts
              </button>

              <button
                className="button-style  group-button"
                style={{ width: "150px" }}
                onClick={openShowProgram}
              >
                Show Programs
              </button>

              <button
                className="button-style  group-button"
                style={{ width: "120px" }}
                onClick={openProductionListPdf}
              >
                Production list
              </button>
              <button className="button-style group-button" type='button'
       style={{ width: "120px"}} onClick={onClickClose}>
       Close
      </button>
            </div>
          </div>
        </div>
      </div>
      <ShowStatusPdfModal
        openShowStatus={openShowStatus}
        setOpenShowStatus={setOpenShowStatus}
        showStatusData={showStatusData}
      />

      <ShowPartsPdfModal
        openShowparts={openShowparts}
        setOpenShowParts={setOpenShowParts}
        rowselect={rowselect}
        processrowselect={processrowselect}
        partlistdata={showParts}
      />

      <ShowProgramsPdfModal
        openShowPrograms={openShowPrograms}
        setOpenShowPrograms={setOpenShowPrograms}
        rowselect={rowselect}
        processrowselect={processrowselect}
        programlistdata={programlistdata}
      />

      <ProductionListModal
        openProductionList={openProductionList}
        setOpenProductionList={setOpenProductionList}
      />
    </div>
  );
}

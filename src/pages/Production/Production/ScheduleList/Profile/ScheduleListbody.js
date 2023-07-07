import React, { useEffect, useMemo, useState } from "react";
import ProcessTable from "./ProcessTable";
import ScheduleListtable from "./ScheduleListtable";
import NavTab from "../Profile/Components/NavTab";
import axios from "axios";
import { useGlobalContext } from "../../../../../Context/Context";
import { baseURL } from "../../../../../api/baseUrl";

export default function ScheduleListbody({
  rowselect,
  setRowselect,
  rowSelectFun,
  scheduleid,
  processrowselect,
  setProcessrowselect,
  processtableSelectFun,
  taskno,
  getpartslistdata,
  partlistdata,
  setPartlistdata,
  getProgramlistdata,
  programlistdata,
  setProgramlistdata,
  TaskNo,
  custcode,
}) {
  const { schedulelistdata } = useGlobalContext();

  //First Table Row Select
  useMemo(() => {
    setRowselect({ ...schedulelistdata[0], index: 0 });
  }, [schedulelistdata[0]]);

  //Process Table(Right First table) data
  const [processtable, setProcesstable] = useState([]);
  let OrdSchNo = rowselect?.OrdSchNo;
  console.log(OrdSchNo);
  const getprocessTabledata = () => {
    if (OrdSchNo) {
      console.log("excuted");
      axios
        .post(baseURL + "/scheduleListProfile/schedulesListSecondTable", {
          ScheduleID: OrdSchNo,
        })
        .then((response) => {
          setProcesstable(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else console.log("empty");
  };

  useMemo(() => {
    setProcessrowselect({ ...processtable[0], index: 0 });
  }, [processtable[0]]);

  return (
    <div className="row mt-4">
      <div className="col-md-6 col-sm-12 mt-3">
        <ScheduleListtable
          rowSelectFun={rowSelectFun}
          rowselect={rowselect}
          setRowselect={setRowselect}
          custcode={custcode}
        />
      </div>

      <div className="col-md-6 col-sm-12">
        <div className="col-md-12 col-sm-12 mt-3">
          <ProcessTable
            scheduleid={scheduleid}
            processtable={processtable}
            getprocessTabledata={getprocessTabledata}
            processrowselect={processrowselect}
            processtableSelectFun={processtableSelectFun}
            OrdSchNo={OrdSchNo}
          />
        </div>
        <div>
          {" "}
          <NavTab
            taskno={taskno}
            processrowselect={processrowselect}
            getpartslistdata={getpartslistdata}
            partlistdata={partlistdata}
            setPartlistdata={setPartlistdata}
            getProgramlistdata={getProgramlistdata}
            programlistdata={programlistdata}
            setProgramlistdata={setProgramlistdata}
            TaskNo={TaskNo}
          />
        </div>
      </div>
    </div>
  );
}

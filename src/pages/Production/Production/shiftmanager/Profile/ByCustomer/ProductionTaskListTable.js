import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useGlobalContext } from "../../../../../../Context/Context";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";

export default function ProductionTaskListTable() {
  const {
    productionTaskList,
    SetProductionTaskList,
    getProductionTaskListData,
  } = useGlobalContext();
  // console.log(productionTaskList);

  useEffect(() => {
    getProductionTaskListData();
  }, [productionTaskList]);

  
  //
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...productionTaskList];
    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  };

  return (
    <div className="row mt-1">
      <div className="col-md-12 col-sm-12">
        <div
          style={{
            height: "240px",
            overflowX: "scroll",
            width: "850px",
            overflowY: "scroll",
          }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor table-space">
              <tr>
                <th onClick={() => requestSort("TaskNo")}>TaskNo</th>
                <th onClick={() => requestSort("Operation")}>Operation</th>
                <th onClick={() => requestSort("Mtrl_Code")}>Mtrl_Code</th>
                <th onClick={() => requestSort("NoOfSheets")} style={{textAlign:'right'}}>NoOfSheets</th>
                <th onClick={() => requestSort("NoOfDwgs")} style={{textAlign:'right'}}>NoOfDwgs</th>
                <th onClick={() => requestSort("DwgsNo")} style={{textAlign:'right'}}>DwgsNo</th>
                <th onClick={() => requestSort("DwgsNested")} style={{textAlign:'right'}}>DwgsNested</th>
                <th onClick={() => requestSort("PartsNested")} style={{textAlign:'right'}}>PartsNested</th>
                <th onClick={() => requestSort("TotalParts")} style={{textAlign:'right'}}>TotalParts</th>
                <th onClick={() => requestSort("NestCount")}>NestCount</th>
                <th onClick={() => requestSort("Priority")} style={{textAlign:'right'}}>Priority</th>
                <th onClick={() => requestSort("EstimatedTime")} style={{textAlign:'right'}}>EstimatedTime</th>
                <th onClick={() => requestSort("TaskProcessTime")} style={{textAlign:'right'}}>TaskProcessTime</th>
                <th onClick={() => requestSort("TaskPgmTime")} style={{textAlign:'right'}}>TaskPgmTime</th>
              </tr>
            </thead>

            {sortedData().map((item, key) => {
              return (
                <>
                  <tbody className="tablebody table-space">
                    <tr>
                      <td>{item.TaskNo}</td>
                      <td>{item.Operation}</td>
                      <td>{item.Mtrl_Code}</td>
                      <td style={{textAlign:'right'}}>{item.NoOfSheets}</td>
                      <td style={{textAlign:'right'}}>{item.DwgsNested}</td>
                      <td style={{textAlign:'right'}}>{item.NoOfDwgs}</td>
                      <td style={{textAlign:'right'}}>{item.PartsNested}</td>
                      <td style={{textAlign:'right'}}>{item.TotalParts}</td>
                      <td>{item.NestCount}</td>
                      <td style={{textAlign:'right'}}>{item.Priority}</td>
                      <td style={{textAlign:'right'}}>{item.EstimatedTime}</td>
                      <td style={{textAlign:'right'}}>{item.NestCount}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </Table>
        </div>
      </div>
    </div>
  );
}


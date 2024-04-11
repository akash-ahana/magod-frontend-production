import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

export default function ProcessTable({
  OrdSchNo,
  getprocessTabledata,
  processtable,
  processtableSelectFun,
  processrowselect,
}) {
  useEffect(() => {
    getprocessTabledata();
  }, [OrdSchNo]);

  return (
    <div style={{ height: "200px", overflowY: "scroll", overflowX: "scroll" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor table-space">
          <tr>
            <th>Status</th>
            <th>Task No</th>
            <th>Material</th>
            <th>Process</th>
            <th>Estimated Time</th>
            <th>Time Taken</th>
            <th>No of Dwgs</th>
            <th>Dwgs Nested</th>
            <th>Total Parts</th>
            <th>Parts Nested</th>
            <th>No of Sheets</th>
          </tr>
        </thead>
        <tbody className="tablebody table-cell-align table-space">
          {processtable.length === 0 ? (
            <tr>
              <td colSpan="11">No data found</td>
            </tr>
          ) : (
            processtable.map((item, key) => (
              <tr
                onClick={() => processtableSelectFun(item, key)}
                className={
                  key === processrowselect?.index ? "selcted-row-clr" : ""
                }
              >
                <td>{item.TStatus}</td>
                <td>{item.TaskNo}</td>
                <td>{item.Mtrl_Code}</td>
                <td>{item.MProcess}</td>
                <td>{item.EstimatedTime}</td>
                <td>{item.TaskProcessTime}</td>
                <td>{item.NoOfDwgs}</td>
                <td>{item.DwgsNested}</td>
                <td>{item.TotalParts}</td>
                <td>{item.PartsNested}</td>
                <td>{item.NoOfSheets}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

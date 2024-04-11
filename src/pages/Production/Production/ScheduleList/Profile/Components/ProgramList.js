import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";

export default function ProgramList({
  getProgramlistdata,
  programlistdata,
  TaskNo,
}) {
  //Process Table(Right First table) data
  //  console.log(programlistdata)

  useEffect(() => {
    getProgramlistdata();
  }, [TaskNo]);

  return (
    <div className="mt-1" style={{ height: "160px", overflowY: "scroll" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th>NCProgramNo</th>
            <th>Machine</th>
            <th>ActualTime</th>
            <th style={{ whiteSpace: "nowrap" }}>Estimated Time</th>
            <th>QtyAlloted</th>
            <th>QtyProcessed</th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {programlistdata.map((item, key) => {
            return (
              <>
                <tr>
                  <td style={{ whiteSpace: "nowrap" }}>{item.NCProgramNo}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.Machine}</td>
                  <td style={{ textAlign: "center" }}>{item.ActualTime}</td>
                  <td style={{ textAlign: "center" }}>{item.EstimatedTime}</td>
                  <td style={{ textAlign: "center" }}>{item.QtyAllotted}</td>
                  <td style={{ textAlign: "center" }}>{item.QtyCut}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

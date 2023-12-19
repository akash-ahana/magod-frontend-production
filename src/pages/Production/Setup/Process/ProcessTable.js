import axios from "axios";
import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function ProcessTable({
  processTab,
  selectRow,
  selectedRowFun,
}) {

  // console.log("Selected Row", selectRow)
  return (
    <div className="row mt-1">
      <div className="col-md-12 col-sm-12">
        <div
          style={{
            height: "350px",
            overflow: "scroll",
            maxWidth: "850px",
            marginLeft: "-10px",
          }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th>Process</th>
                <th>ProcessDescription</th>
                <th>RawMaterial</th>
              </tr>
            </thead>

            <tbody className="tablebody table-space">
              <>
                {processTab.map((data, key) => (
                  <tr
                    onClick={() => selectedRowFun(data, key)}
                    className={
                      key === selectRow?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td>{data.ProcessID}</td>
                    <td>{data.ProcessDescription}</td>
                    <td>{data.RawMaterial}</td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

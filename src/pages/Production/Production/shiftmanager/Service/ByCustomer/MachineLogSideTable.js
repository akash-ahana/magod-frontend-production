import axios from "axios";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../../api/baseUrl";
import { useState } from "react";

export default function MachineLogSideTable({
  setSelectmachinelog,
  selectmachinelog,
  selectMachineLogFun,
  machineList,
}) {
  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <div
          style={{ height: "234px", overflow: "scroll" }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th>Machine</th>
              </tr>
            </thead>

            {machineList.map((item, key) => {
              return (
                <>
                  <tbody className="tablebody">
                    <tr
                      onClick={() => selectMachineLogFun(item, key)}
                      className={
                        key === selectmachinelog?.index ? "selcted-row-clr" : ""
                      }
                    >
                      <td>{item.MachineName}</td>
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

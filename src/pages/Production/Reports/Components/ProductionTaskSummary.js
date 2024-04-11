import React, { useMemo } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";

export default function ProductionTaskSummary({ productionTaskSummary }) {
  const [selectrow, setSelectRow] = useState({});
  const selectRowFunction = (item, index) => {
    let list = { ...item, index: index };
    setSelectRow(list);
  };

  useMemo(() => {
    setSelectRow({ ...productionTaskSummary[0], index: 0 });
  }, [productionTaskSummary[0]]);

  return (
    <div
      className="mt-1"
      style={{
        maxWidth: "900px",
        overflowX: "scroll",
        height: "360px",
        overflowY: "scroll",
      }}
    >
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Machine</th>
            <th>Task No</th>
            <th>Mtrl Code</th>
            <th>Operation</th>
            <th>Machine Time</th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {productionTaskSummary.map((item, key) => {
            return (
              <>
                <tr
                  onClick={() => selectRowFunction(item, key)}
                  className={key === selectrow?.index ? "selcted-row-clr" : ""}
                >
                  <td>{item.Machine}</td>
                  <td>{item.TaskNo}</td>
                  <td>{item.Mtrl_Code}</td>
                  <td>{item.Operation}</td>
                  <td className="table-cell-align">{item.machineTime}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

import React, { useState, useEffect, useMemo } from "react";
import Table from "react-bootstrap/Table";

function MachineOperatorTable({
  rowselectMachineOperator,
  rowselectDailyShiftTable,
  machineOperatorTableData,
  getMachineOperatorTableData,
  rowSelectFun,
  setRowselectMachineOperator,
  selectedWeek,
}) {
  useEffect(() => {
    getMachineOperatorTableData();
  }, [rowselectDailyShiftTable]);

  useMemo(() => {
    setRowselectMachineOperator({ ...machineOperatorTableData[0], index: 0 });
  }, [machineOperatorTableData[0]]);

  console.log(machineOperatorTableData);

  return (
    <div
      className="mx-1"
      style={{
        width: "360px",
        height: "300px",
        overflowX: "scroll",
        overflowY: "scroll",
      }}
    >
      <Table striped className="table-data border " style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Machine</th>
            <th>Operator</th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {machineOperatorTableData.map((rank, i, row) => {
            return (
              <>
                <tr
                  onClick={() => rowSelectFun(rank, i)}
                  className={
                    i === rowselectMachineOperator?.index
                      ? "selcted-row-clr"
                      : ""
                  }
                >
                  {/* <td>{rank.ShiftDate}</td> */}
                  <td>{rank.Machine}</td>
                  <td>{rank.Operator}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default MachineOperatorTable;

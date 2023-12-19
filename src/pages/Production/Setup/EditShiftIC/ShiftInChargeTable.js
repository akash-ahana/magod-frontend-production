import React from "react";
import Table from "react-bootstrap/Table";

export default function ShiftInChargeTable({
  getShiftIclist,
  rowselectShiftIc,
  selectedRowFunShiftIc,
}) {
  return (
    <div style={{ height: "430px", overflowY: "auto" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Shift InCharge</th>
            <th>Skill Level</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className="tablebody table-space">
          {getShiftIclist.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No data to show
              </td>
            </tr>
          ) : (
            getShiftIclist.map((item, key) => (
              <tr
                key={key}
                onClick={() => selectedRowFunShiftIc(item, key)}
                className={
                  key === rowselectShiftIc?.index ? "selcted-row-clr" : ""
                }
              >
                <td>{item?.Name}</td>
                <td>{item?.Skill_Level}</td>
                <td>{item?.Status}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

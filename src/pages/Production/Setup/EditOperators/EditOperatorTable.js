import React from "react";
import Table from "react-bootstrap/Table";

export default function EditOperatorTable({
  getOperatorlist,
  rowselectOperator,
  selectedRowFunOperator,
}) {
  return (
    <div style={{ height: "430px", overflowY: "auto" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Operator</th>
            <th>Skill Level</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className="tablebody table-space">
          {getOperatorlist.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No data to show
              </td>
            </tr>
          ) : (
            getOperatorlist.map((item, key) => (
              <tr
                key={key}
                onClick={() => selectedRowFunOperator(item, key)}
                className={
                  key === rowselectOperator?.index ? "selcted-row-clr" : ""
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

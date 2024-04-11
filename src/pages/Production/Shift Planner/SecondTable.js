import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

// useEffect( () => {
// console.log('props from second table' , props)
// },[])

function SecondTable(props) {
  //  console.log('secondTableShiftState in second TABLE 1' , props.week)
  return (
    <div
      className="col-md-3"
      style={{
        width: "385px",
        height: "590px",
        overflowX: "scroll",
        overflowY: "scroll",
      }}
    >
      <div>
        <Table
          striped
          className="table-data border"
          style={{ marginLeft: "5px", border: "1px" }}
        >
          <thead className="tableHeaderBGColor">
            <tr>
              <th>ShiftDate</th>
              <th>Shift</th>
              <th style={{ whiteSpace: "nowrap" }}>Shift IC</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {props.week.map((rank, i, row) => {
              return (
                <>
                  <tr>
                    <td style={{ whiteSpace: "nowrap" }}>{rank.ShiftDate}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{rank.Shift}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{rank.Shift_Ic}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{rank.FromTime}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{rank.ToTime}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SecondTable;

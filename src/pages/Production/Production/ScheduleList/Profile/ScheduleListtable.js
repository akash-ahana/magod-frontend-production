import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useGlobalContext } from "../../../../../Context/Context";
import { baseURL } from "../../../../../api/baseUrl";

export default function ScheduleListtable({
  rowSelectFun,
  rowselect,
  getprocessTabledata,
  setRowselect,
  scheduleList,
  custcode,
}) {
  const {
    schedulelistdata,
    getSchedulistdata,
    selectedRows,
    setSelectedRows,
    handleCheckboxChange,
  } = useGlobalContext();

  useEffect(() => {
    getSchedulistdata();
  }, []);

  return (
    <div style={{ height: "500px", overflowY: "scroll", overflowX: "scroll" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Select</th>
            <th style={{ whiteSpace: "nowrap" }}>Schedule No</th>
            <th>Customer</th>
            <th style={{ whiteSpace: "nowrap" }}>TgtDelDate</th>
            <th style={{ whiteSpace: "nowrap" }}>Delivery_date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {schedulelistdata.map((item, key) => {
            const isChecked = selectedRows.some((row) => row === item);

            return (
              <tr
                onClick={() => rowSelectFun(item, key)}
                className={key === rowselect?.index ? "selcted-row-clr" : ""}
              >
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(item)}
                  />
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{item.OrdSchNo}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item.Cust_name}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item.schTgtDate}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item.Delivery_Date}</td>
                <td style={{ whiteSpace: "nowrap" }}>{item.Schedule_Status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

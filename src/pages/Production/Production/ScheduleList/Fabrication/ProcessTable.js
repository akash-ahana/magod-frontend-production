import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function ProcessTable({
  OrdSchNo,
  getprocessTabledata,
  processtable,
  processtableSelectFun,
  processrowselect
}) {
  useEffect(() => {
    getprocessTabledata();
  }, [OrdSchNo]);

 //
 const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
 const requestSort = (key) => {
   let direction = "asc";
   if (sortConfig.key === key && sortConfig.direction === "asc") {
     direction = "desc";
   }
   setSortConfig({ key, direction });
 };

 const sortedData = () => {
   const dataCopy = [...processtable];
   if (sortConfig.key) {
     dataCopy.sort((a, b) => {
       if (a[sortConfig.key] < b[sortConfig.key]) {
         return sortConfig.direction === "asc" ? -1 : 1;
       }
       if (a[sortConfig.key] > b[sortConfig.key]) {
         return sortConfig.direction === "asc" ? 1 : -1;
       }
       return 0;
     });
   }
   return dataCopy;
 };

  return (
    <div style={{ height: "200px", overflowY: "scroll", overflowX: "scroll" }}>
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor table-space">
          <tr>
            <th onClick={() => requestSort("Status")}>Status</th>
            <th onClick={() => requestSort("Task No")}>Task No</th>
            <th onClick={() => requestSort("Material")}>Material</th>
            <th onClick={() => requestSort("Process")}>Process</th>
            <th onClick={() => requestSort("Estimated Time")}>Estimated Time</th>
            <th onClick={() => requestSort("Time Taken")}>Time Taken</th>
            <th onClick={() => requestSort("No of Dwgs")}>No of Dwgs</th>
            <th onClick={() => requestSort("Dwgs Nested")}>Dwgs Nested</th>
            <th onClick={() => requestSort("Total Parts")}>Total Parts</th>
            <th onClick={() => requestSort("Parts Nested")}>Parts Nested</th>
            <th onClick={() => requestSort("No of Sheets")}>No of Sheets</th>
          </tr>
        </thead>
        <tbody className='tablebody table-cell-align table-space'>
          {processtable.length === 0 ? (
            <tr>
              <td colSpan="11">No data found</td>
            </tr>
          ) : (
            sortedData().map((item, key) => (
              <tr
                onClick={() => processtableSelectFun(item, key)}
                className={key === processrowselect?.index ? 'selcted-row-clr' : ''}
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

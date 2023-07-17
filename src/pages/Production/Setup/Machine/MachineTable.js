import React, { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import { useGlobalContext } from '../../../../Context/Context';

export default function MachineTable({ selectedRowFn, selectedRow }) {
  const { post, MachineTabledata } = useGlobalContext();

  console.log(selectedRow);

  return (
    <div className="row mt-1">
      <div>
        <div style={{ height: "430px", overflowY: "auto" }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Working</th>
              </tr>
            </thead>
            <tbody>
              {post.map((item, key) => {
                return (
                  <tr
                    key={key}
                    onClick={() => selectedRowFn(item, key)}
                    className={key === selectedRow?.index ? 'selected-row-clr' : ''}
                  >
                    <td>{item.manufacturer}</td>
                    <td>{item.Model}</td>
                    <td>
                      <input
                        className="form-check-input mt-2"
                        type="checkbox"
                        disabled
                        value=""
                        checked={item.Working === 0 ? false : true}
                        id="flexCheckDefault"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

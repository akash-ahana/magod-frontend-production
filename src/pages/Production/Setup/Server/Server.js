import React from 'react';
import Table from "react-bootstrap/Table";
import Modal from './Modal';

export default function Server() {
  return (
    <div>
       <h4 className="form-title">Magod MIS Setup</h4>
      <div className='row'>
      <div className='col-md-8 col-sm-12 mt-3'>
      <Table bordered>
      <thead style={{textAlign:"center"}}>
        <tr>
          <th></th>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody className='tablebody'>
        <tr>
          <td></td>
           <td>DataServer</td>
            <td>
            <div className="col-md-12">
              <div className="col-md-12 ">
                <input className="in-field" />
              </div>
              </div>
            </td>
        </tr>

        <tr>
        <td></td>
           <td>MailServer</td>
            <td>
            <div className="col-md-12">
              <div className="col-md-12 ">
                <input className="in-field" />
              </div>
              </div>
            </td>
        </tr>

        <tr>
        <td></td>
           <td>FileServer</td>
            <td>
            <div className="col-md-12">
              <div className="col-md-12 ">
                <input className="in-field" />
              </div>
              </div>
            </td>
        </tr>

        <tr>
        <td></td>
           <td>SigmaNestExcutablePath</td>
            <td>
            <div className="col-md-12">
              <div className="col-md-12 ">
                <input className="in-field" />
              </div>
              </div>
            </td>
        </tr>

        <tr>
        <td></td>
           <td>SigmanetConfigFilePath</td>
            <td>
            <div className="col-md-12">
              <div className="col-md-12 ">
                <input className="in-field" />
              </div>
              </div>
            </td>
        </tr>

        <tr>
        <td></td>
           <td>SigmaNestVersion</td>
            <td>
            <div className="col-md-12">
              <div className="col-md-12 ">
                <input className="in-field" />
              </div>
              </div>
            </td>
        </tr>
      </tbody>
    </Table>
    </div>
    </div>

    <div>
      <Modal/>
    </div>
  </div>
  )
}

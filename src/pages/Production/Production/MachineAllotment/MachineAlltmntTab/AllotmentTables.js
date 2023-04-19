import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

export default function AllotmentTables() {


  

  return (
    <>
      <div className="col-md-2 mb-1" >
        <div>
          <label >Find Schedule</label>
        </div>
        <div>
          <input className="in-field"  type='search' />
        </div>
      </div>

      <div className='row' >

        <div className='col-md-6' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '550px' }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th>Shedule no</th>
                <th>Delivery Date</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Special_instruction</th>

              </tr>
            </thead>

                  <tbody className='tablebody'>
                    <tr >
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
          </Table>

        </div >

        {/* Form */}

        <div className='col-md-6'  >
          <div className='' style={{ marginTop: '-65px' }} >


            <form className="form"  >
              <div className="ip-box form-bg">
                <div className="row">
                  <div className="row">
                    <div className="col-md-12 ">
                      <label className="">Customer</label>
                      <input className="in-field"
                        disabled={false}
                        name='refName' />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 ">
                      <label className="">Task no</label>
                      <input className="in-field"
                        disabled={false}
                        name='refName' />
                    </div>

                    <div className="col-md-6 ">
                      <label className="">Status</label>
                      <input className="in-field"
                        disabled={false}
                        name='refName' />
                    </div>

                  </div>


                  <div className="row">
                    <div className="col-md-12 ">
                      <label className="">Material</label>
                      <input className="in-field"
                        disabled={false}
                        name='refName' />
                    </div>
                  </div>


                  <div className="row">


                    <div className="col-md-6">
                      <div className="col-md-12 ">
                        <label className="">Process</label>
                        <input className="in-field mt-2" type='number'

                          name='TgtRate' />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="col-md-12 ">
                        <label className="">Select machine</label>
                        <select className="ip-select dropdown-field mt-3"
                          name='Machine_Type' >
                          <option>Laser cutting oxygen</option>

                        </select>
                      </div>
                    </div>


                  </div>


                  <div className="row">

                    <div className="col-md-6 ">
                      <label className="">Priority</label>
                      <input className="in-field"
                        disabled={false}
                        name='refName' />

                    </div>

                    <div className="col-md-6 mt-3">
                      <div className="ip-box form-bg mt-2 " style={{}}>
                        <div className='row'>

                          <button style={{width:"200px"}} className="button-style mt-2 group-button"
                          >
                            Change Machine
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-md-6 ">
                      <label className="">Machine</label>
                      <input className="in-field mt-2" name='remarks'

                      />
                    </div>

                    <div className="col-md-6 mt-3">
                      <div className="ip-box form-bg mt-2 " style={{ width: "140px" }}>
                        <div className='row'>

                          <button className="button-style mt-2 group-button"
                          >
                            ReleaseForProgramming
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>



              </div>
            </form>


            {/* //TABLE3 */}

            <div className='' style={{ height: "300px", overflowY: "scroll", overflowX: "scroll" }}>
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor">
                  <tr>

                    <th>Task no</th>
                    <th>Machine</th>
                    <th>Operation</th>
                    <th>Mtrl_code</th>
                    <th>Priority</th>
                    <th>Estimated time</th>


                  </tr>
                </thead>


                      <tbody className='tablebody'>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

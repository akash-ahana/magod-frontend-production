import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Popup from '../components/Popup';
import TableData from '../components/TableData';

export default function CustomModal({show, setShow}) {

  const [popup , setPopup] = React.useState(false);

   const handleClose = () => setShow(false);

   const handleOpen = ()=>{
    setPopup(true);
    setShow(false);
  }

  return (
    <div>
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Program Parts Inspection Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg ">
            <div className="row">
              <div className="col-md-3">
                <label className="form-label"> Task no</label>
                <input  className='in-field' />
              </div>
              <div className="col-md-2">
                <label className="form-label"> Quantity</label>
                <input  className='in-field' />
              </div>
              <div className="col-md-5">
                <label className="form-label"> Material</label>
                <input  className='in-field' />
              </div>

              <div className="col-md-2 mt-3">
              <Button variant="primary" type='submit'>
               Clear Parts 
              </Button>
              </div>

              <div className="col-md-3">
                <label className="form-label"> Program no</label>
                <input  className='in-field' />
              </div>

              <div className="col-md-2">
                <label className="form-label">Allowted</label>
                <input  className='in-field' />
              </div>

              <div className="col-md-2">
                 <label className="form-label">Process</label>
                 <input  className='in-field' />
              </div>

              <div className="col-md-3">
                 <label className="form-label">Status</label>
                 <input  className='in-field' />
              </div>

              <div className="col-md-3">
                 <label className="form-label">Machine</label>
                 <input  className='in-field' />
              </div>

              <div className="col-md-2">
                 <label className="form-label">Processed</label>
                 <input  className='in-field' />
              </div>

              <div className="col-md-2">
                 <label className="form-label">Dwgs</label>
                 <input  className='in-field' />
              </div>

              <div className="col-md-3">
                 <label className="form-label">Parts</label>
                 <input  className='in-field' />
              </div>

              <div className="col-md-2 mt-2" style={{padding:'0', marginLeft:'-9px'}}>
              <Button variant="secondary" onClick={handleOpen}>
               ChangeMachine
              </Button>
              </div>

              <div className="col-md-3 mt-3">
                 <label className="form-label">Process Time</label>
              </div>

              <div className="col-md-2">
                 <label className="form-label">Estimated</label>
                 <input  className='in-field' />
              </div>

              <div className="col-md-2 mb-2">
                 <label className="form-label">Machine</label>
                 <input  className='in-field' />
              </div>

            </div>
          </div>
        </div>
        </Modal.Body>
        <TableData/>
      </Modal>

{ 
  (
    <Popup 
    popup={popup}
     setPopup={setPopup}/>
  )
}
    </div>
  )
}

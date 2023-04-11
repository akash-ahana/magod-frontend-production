import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Prompt from './ConfirmForm';

function Popup({popup, setPopup}) {

const [open, setOpen] = React.useState(false);

const handleOpen=()=>{
setOpen(true)
setPopup(false)
}

const handleClose = ()=>{
  setPopup(false);
}

  return (
    <>
    <Modal show={popup} size='lg'>
    <div 
    className="modal show"
    style={{ display: 'block', position: 'initial'}}
  >
    
    <Modal.Header closeButton  onClick={handleClose}>
          <Modal.Title>Machine Selection Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg ">
            <div className="row">

              <div className="col-md-6">
                <label className="">Program No</label>
                <input  className='in-field' />
              </div>

              <div className="col-md-6">
                <label className="">Machine</label>
                <input  className='in-field' />
              </div>

              <div className="col-md-6 mt-1">
                <label className="">Material</label>
                <input  className='in-field' />
              </div>
          
              <div className="col-md-6 mb-3">
                 <label className="form-label">Change To</label>
                 <select className='ip-select'>
                    <option value={1}>select</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
              </div>
              
              <div className="col-md-6">
                <label className="">Process</label>
                <input  className='in-field' />
              </div>

             <div className="col-md-5 mt-3">
              <Button variant="secondary" onClick={handleOpen}>
              Change Machine
              </Button> 
            </div> 

              <div className="col-md-6 mb-3">
                <label className="">Status</label>
                <input  className='in-field' />
              </div>  
            </div>
          </div>
        </div>
        </Modal.Body>
  </div>
  </Modal>

{open &&
  (
    <Prompt
    open={open}
     setOpen={setOpen}/>
  )
}

  </>
  )
}

export default Popup

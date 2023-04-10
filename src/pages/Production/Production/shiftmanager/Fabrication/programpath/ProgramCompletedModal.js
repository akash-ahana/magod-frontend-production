import React,{useState, useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Table } from 'react-bootstrap'
import axios from "axios";

export default function ProgramCompletedModal({show, setShow,selectProgramCompleted,
  }) {
    const blockInvalidChar = e => ['e', 'E', '+', '-','.'].includes(e.key) && e.preventDefault();

    const[programCompleteData,setProgramCompleteData]=useState([]);
    const modalTable=()=>{
      axios.post('http://172.16.20.61:5000/shiftManagerProfile/shiftManagerncProgramTaskList',
      {...selectProgramCompleted})
     .then((response) => {
       console.log(response.data);
       setProgramCompleteData(response.data)
   })
    }

    useEffect(() => {
      modalTable();
    }, [selectProgramCompleted])
    const handleClose = () => setShow(false);

    //console.log(programCompleteData);


    // const clearAllonClick = () => { 
    //   console.log("Clear All Button is Clicked" , "PROGRAM COMPLETED MODAL IS  " , programCompleteData)
    //   const  constprogramCompleteData = programCompleteData;
    //   console.log("Const Program complete Data is " , constprogramCompleteData)
    
    //     for( let i = 0 ; i < constprogramCompleteData.length ; i++) {
    //       constprogramCompleteData[i].QtyCleared = constprogramCompleteData[i].QtyProduced
    //     }
    
    //     console.log("Updated constPartListData is " , constprogramCompleteData)
    //     setProgramCompleteData(constprogramCompleteData)
    //     //setPartlistdata(constpartListData)
    //     //setNewPartlistdata(constpartListData)
    //     //setPartlistdata([])
      
    //  }

    const clearAllButton = () => {
      console.log('Clear All button Clicked' , programCompleteData)
      const constProgramCompleteData = programCompleteData;
      console.log('Const Program Complete Data is ' , constProgramCompleteData)
      for(let i =0 ; i<constProgramCompleteData.length ; i++) {
        constProgramCompleteData[i].QtyCleared = constProgramCompleteData[i].QtyCut
      }
      console.log('Updated Const Program Complete Data is',constProgramCompleteData)
      // setProgramCompleteData(constProgramCompleteData)
      // setProgramCompleteData([])
      setProgramCompleteData(constProgramCompleteData)
    }

     const onChangeCleared = (e, item, key) => { 
      console.log("e is " , e.target.value, " item is " , item, " key is " , key)
      //item is not required , e.target.value contains the entered value in the input box, and key contains the index of the array 
      // console.log(' PART LIST IS ' , partlistdata)
      // const newConstPartList = partlistdata
      // if(e.target.value <= newConstPartList[key].QtyProduced) {
      //  newConstPartList[key].QtyCleared = e.target.value
      // }
     
      // console.log('NEW CONST PART LIST IS ' , newConstPartList)
      // setPartlistdata(newConstPartList)
    }
    // console.log(programCompleteData , 'After Updating')  
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
                <input  className='in-field'
                value={selectProgramCompleted.TaskNo}/>
              </div>
              <div className="col-md-2">
                <label className="form-label"> Quantity</label>
                <input  className='in-field'
                value={selectProgramCompleted.Qty} />
              </div>
              <div className="col-md-5">
                <label className="form-label"> Material</label>
                <input  className='in-field'
                value={selectProgramCompleted.Mtrl_Code} />
              </div>

              <div className="col-md-2 mt-3">
              <Button variant="primary" type='submit'
              // onClick = {clearAllonClick}
              onClick = {clearAllButton}
               >
               Clear Parts 
              </Button>
              </div>

              <div className="col-md-3">
                <label className="form-label"> Program no</label>
                <input  className='in-field'
                value={selectProgramCompleted.NCProgramNo} />
              </div>

              <div className="col-md-2">
                <label className="form-label">Alloted</label>
                <input  className='in-field'
                value={selectProgramCompleted.QtyAllotted} />
              </div>

              <div className="col-md-2">
                 <label className="form-label">Process</label>
                 <input  className='in-field'
                 value={selectProgramCompleted.MProcess} />
              </div>

              <div className="col-md-3">
                 <label className="form-label">Status</label>
                 <input  className='in-field'
                  value={selectProgramCompleted.PStatus} />
              </div>

              <div className="col-md-3">
                 <label className="form-label">Machine</label>
                 <input  className='in-field' 
                 value={selectProgramCompleted.Machine}/>
              </div>

              <div className="col-md-2">
                 <label className="form-label">Processed</label>
                 <input  className='in-field'
                 value={selectProgramCompleted.QtyCut} />
              </div>

              <div className="col-md-2">
                 <label className="form-label">Dwgs</label>
                 <input  className='in-field'
                 value={selectProgramCompleted.NoOfDwgs} />
              </div>

              <div className="col-md-3">
                 <label className="form-label">Parts</label>
                 <input  className='in-field' 
                 value={selectProgramCompleted.TotalParts
                 }/>
              </div>

              <div className="col-md-2 mt-2" style={{padding:'0'}}>
              <Button variant="secondary" onClick={handleClose}>
               CloseProgram
              </Button>
              </div>

              <div className="col-md-2">
                 <label className="form-label">Process Time</label>
                 <input  className='in-field'
                 value={selectProgramCompleted.ActualTime
                 } />
              </div>

              <div className="col-md-2">
                 <label className="form-label">Estimated</label>
                 <input  className='in-field'
                 value={selectProgramCompleted.EstimatedTime
                 } />
              </div>

              <div className="col-md-2 mb-2">
                 <label className="form-label">Machine</label>
                 <input  className='in-field' 
                 value={selectProgramCompleted.Machine}/>
              </div>

            </div>
          </div>
        </div>
        </Modal.Body>

        <div className='row mt-1'>
    <div className='col-md-12 col-sm-12' style={{paddingRight:'462px', paddingBottom:'23px'}}>
     <div style={{height:"150px",width:'760px',overflowY: "scroll", overflowX:'scroll'}}>
     <Table bordered style={{border:'1px solid grey'}}>
       <thead style={{textAlign:"center"}}>
         <tr>
           <th>DWG Name</th>
           <th>Total Qty Nested</th>
           <th>To Produce/Qty Nested</th>
           <th>Produced</th>
           <th>Rejected</th>
           <th>Cleared</th>
           <th>Remarks</th>
         </tr>
       </thead>

{programCompleteData.map((item,key)=>{
  return(
    <>
    <tbody className='tablebody'>
          <tr>
             <td>{item.DwgName}</td>
             <td>{item.TotQtyNested}</td>               
             <td>{item.QtyNested}</td>
             <td>{item.QtyCut}</td>
             <td>
             <input className='table-cell-editor '
                   name="cleared"
                   type='number'
                  //  onKeyDown={blockInvalidChar}
                   defaultValue={item.QtyRejected}
                  //  onChange={(e)=>onChangeInput(e,rank.Shift_instruction)}
                   placeholder="Type Cleared"
                  />
              </td>
             <td>
              <div key={item.QtyCleared}>
              <input className='table-cell-editor '
                   name="cleared"
                   //type='number'
                   //onKeyDown={blockInvalidChar}
                   defaultValue={item.QtyCleared}
                  //  onChange={(e)=>onChangeCleared(e,item,key)}
                   placeholder="Type Cleared" 
                  />
              </div>
              </td>

             <td>
                <input className='table-cell-editor '
                   name="cleared"
                   defaultValue={item.Remarks}
                  //  onChange={(e)=>onChangeInput(e,rank.Shift_instruction)}
                   placeholder="Type Cleared"
                  />
              </td>
         </tr>
    </tbody>
    </>
  )
})}
 </Table>
     </div>
 </div>
</div>
      </Modal>
    </div>
  )
}


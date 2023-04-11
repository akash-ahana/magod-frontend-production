import React,{useEffect,useState} from 'react';
import { Table } from 'react-bootstrap';
import { useGlobalContext } from '../../../../../Context/Context';

export default function AllotmentTables({rowSelectFun,rowselect,getprocessTabledata}) {

    const{schedulelistdata,getSchedulistdata}=useGlobalContext();

    useEffect(() => {
        getSchedulistdata();
     }, []);
  return (
    <>

<div className="col-md-2 mb-3 " >
                <div>
                  <label className="" style={{marginLeft:'3px'}} >Find Schedule</label>
                </div>
                <div>
                <input className="in-field" name='RegnNo' type='search'/>
                </div>
        </div>

    <div className='col-md-12 d-flex' >

    <div className='col-md-6' style={{overflowY:'scroll',overflowX:'scroll', height:'550px'}}>
     <Table bordered>
       <thead style={{textAlign:"center"}}>
         <tr>
           <th>Shedule no</th>
           <th>Delivery Date</th>
           <th>Customer</th>
           <th>Status</th>
           <th>Special_instruction</th>
          
         </tr>
       </thead>


    {schedulelistdata.map((item,key)=>{
      return(
        <>
        <tbody className='tablebody'>
         <tr onClick={()=>rowSelectFun(item,key)} className={key===rowselect?.index? 'selcted-row-clr':'' } >
          
           
           <td>{item.Delivery_Date}</td>
           <td>{item.Schedule_Status}</td>
           <td>{item.schTgtDate}</td>
           <td>{item.Delivery_Date}</td>
           <td>{item.Schedule_Status}</td>
         </tr>
   </tbody>
        </>
      )
    })}
 </Table>

     </div >

{/* Form */}

      <div className='col-md-6  ' style={{marginLeft:'20px'}} >

      
        <div className='' style={{marginTop:'-65px'}} >


<div className="row" style={{  }}>
  <div className="col-md-10">
    <div className="col-md-12 ">
      <label className="">Customer</label>
      <input className="in-field"
        name='RegnNo' />
    </div>

  </div>

</div>

<div className="row">
  <div className="col-md-6 ">
    <div className="col-md-10 ">
      <label className="">Task no</label>
      <input className="in-field"/>
    </div>
  </div>

  <div className="col-md-6">
    <div className="col-md-10 ">
      <label className="">Status</label>
      <input className="in-field"
        name='targetRate' />
    </div>
  </div>
</div>

<div className="row">
  <div className="col-md-10">
    <div className="col-md-12 ">
      <label className="">Material</label>
      <input className="in-field" type="text"
        name='installDate' />
    </div>
  </div>

</div>




<div className="row">
  <div className="col-md-6">
    <div className="col-md-8 ">
      <label className="">Process</label>
      <input className="in-field"
      />
    </div>
  </div>



  <div className="col-md-6 col-sm-12">
    <div className="ip-box form-bg mt-0 ">
      <div className='row'>
        <div className="col-md-8">
          <label className="form-label">Select Machine</label>
          <select className="ip-select">
            <option value="option 1"> Laser 6</option>
            <option value="option 1">Laser 25</option>
            <option value="option 1">Laser 21</option>
          </select>
        </div>

      </div>
    </div>
  </div>

</div>




<div className="row">
  <div className="col-md-6">
    <div className="col-md-10 ">
      <label className="">Priority</label>
      <input className="in-field"
      />
    </div>
  </div>



  <div className="col-md-3 col-sm-12">
    <div className="ip-box form-bg mt-2 "  style={{ width: "140px" }}>
      <div className='row'>

        <button className="button-style mt-2 group-button"
         >
          change machine
        </button>
      </div>
    </div>
  </div>

</div>






<div className="row">
  <div className="col-md-6">
    <div className="col-md-10 "  >
      <label className="">Machine</label>
      <input className="in-field"
      />
    </div>
  </div>


  <div className="col-md-3 col-sm-12">
    <div className="ip-box form-bg mt-2 "  >
      <div className=''  >

        <button className="button-style mt-2 group-button"
          style={{ width: "200px" }}>
          Releasing for program
        </button>
      </div>
    </div>
  </div>

</div>

{/* //TABLE3 */}

  <div className='' style={{height:"300px",overflowY: "scroll",overflowX: "scroll"}}>
     <Table bordered>
       <thead style={{textAlign:"center"}}>
         <tr>
           
           <th>Task no</th>
           <th>Machine</th>
           <th>Operation</th>
           <th>Mtrl_code</th>
           <th>Priority</th>
           <th>Estimated time</th>
          
          
         </tr>
       </thead>


    {schedulelistdata.map((item,key)=>{
      return(
        <>
        <tbody className='tablebody'>
         <tr onClick={()=>rowSelectFun(item,key)} className={key===rowselect?.index? 'selcted-row-clr':'' } >
          
           
           <td>{item.schTgtDate}</td>
           <td>{item.Delivery_Date}</td>
           <td>{item.Schedule_Status}</td>
           <td>{item.schTgtDate}</td>
           <td>{item.Delivery_Date}</td>
           <td>{item.Schedule_Status}</td>
         </tr>
   </tbody>
        </>
      )
    })}
 </Table>

     </div>
     

</div>
            
      
      
     
        
     </div>
</div>
</>
  );
}

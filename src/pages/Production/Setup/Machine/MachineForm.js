import React, {useMemo, useState ,useEffect} from 'react';
import AddMachine from './AddMachineModal/AddMachine';
import AddProcessmodal from './AddProcess/AddProcessmodal';
import axios from "axios";
import { formatDate } from './Dateconverter';
import {useGlobalContext} from '../../../../Context/Context'
import ProcessTable from './ProcessTable';
import DeleteProcess from './Delete Process/DeleteProcess';
import DeleteMachine from './DeleteMachine/DeleteMachine';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SaveMachine from './SaveMachine/SaveMachine';
import { baseURL } from "../../../../api/baseUrl";


export default function ({selectedRow}) {
  // console.log(selectedRow.isInstallDatePresent);

  const formSchema = Yup.object().shape({
    // RegnNo: Yup.string().required("This Field is required"),
    // location: Yup.string().required("This Field is requiredy"),
    // InstallDate: Yup.string().required("This Field is requiredy"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

    const {MachineTabledata} = useGlobalContext()
    const [finaldata,setFinaldata]=React.useState([])
    const [show, setShow] = React.useState(false);
    const [addprocess,setAddprocess]=React.useState(false)
    const [machineData,setMachineData]=useState({})
    
    let savemachineInitialState={refNmae:'',manufacturer:'',model:'',Working:0,TgtRate:'',
    reamrks:'',InstallDate:'',UnistallDate:'',location:'',RegnNo:''}
    
     // PROCESSLIST FOR SELECT INPUT
    const [machinetypes,setMachinetypes] = React.useState([]);
   const getSelectmachinetypes=()=>{
    axios.get(baseURL+ "/productionSetup/getMachineTypes").then((response) => {
          setMachinetypes(response.data);
        }); 
   }
   

   useEffect(() => {
    getSelectmachinetypes();
   }, []);
 
  
    
    //SELECT PROCESS TABLE DATA 
    const [mach_srl,setMarh_srl]=useState('')
    const [process,setProcess]=useState('')
    const [selectRow,setSelectRow]=useState({})

    const selectedRowFun=(item,index)=>{
      let list={...processdataList,index:index}
      // console.log("api call ",item.Mprocess)
      setMarh_srl(item.Machine_srl);
      setProcess(item.Mprocess);
      // api call
      setSelectRow(list);
    }
   
 //PROCESSLIST
 const [processdataList,setProcessdataList]=useState([]) 
  useEffect(()=>{
    getprocessdataList(selectedRow.Machine_srl)
  },[selectedRow])

  const getprocessdataList=(machine_srl)=>{
    axios.post(
       baseURL + "/productionSetup/getProcessForMachine",
      {
          Machine_srl:machine_srl
     }).then((response) => {
      //  console.log('data',response)
       setProcessdataList(response.data);
    });
 }

 useMemo(()=>{
  setSelectRow({...processdataList[0],index:0})
},[processdataList[0]])

    
//DELETE PROCESS
const [opendeleteprocess,setOpendeleteprocess]=useState('')
const openDeleteProcess=()=>{
setOpendeleteprocess(true);
}



 
    //DELETE MACHINE
    const[opendeletemachine,setOpendeletemachine]=useState('');
    const openDeletemachine=()=>{
      setOpendeletemachine(true);
    }

    let referencename=selectedRow.refName;
    // console.log("delete machine",referencename)
    const deleteMachine=()=>{
      axios.post(
       baseURL + "/productionSetup/deleteMachine",
        {
          refName:referencename
        }).then((response) => {
          // console.log("deleted",response)
        MachineTabledata();
      });
    }

    //GET MACHINE DETAILS
    const getmachineDetails=()=>{
      axios.post(
        baseURL + "/productionSetup/getMachine",
        {
          refName:referencename
        }).then((response) => {
        // console.log("Required data",response[0]);
        setFinaldata(response.data);
      });
    }

useMemo(()=>{
  setMachineData({...selectedRow})
},[selectedRow])


const handleMachineChange=(e)=>{
  let {name,value}=e.target
  if(name==="Working"){
  
    let status=''
if(e.target.checked){
  status=1
}
else{
  status=0
}
    setMachineData({...machineData,"Working":status})
    return
  }
  setMachineData({...machineData,[name]:value})
  // console.log("On change fn ",name,value)
}

  const openAddprocess=()=>{
     setAddprocess(true);
  }

  
  const addMachine=()=>{
    setShow(true);
    // console.log("hi")
  }
  
  //SAVE MACHINE
  const[opensavemachine,setOpensavemachine]=useState('')
  const openSavemachine=()=>{
    setOpensavemachine(true);
  }
  // console.log(opensavemachine)
  const saveMachine=()=>{
    // openSavemachine();
    console.log("called")

    axios.post(
      baseURL + "/productionSetup/saveMachine",
      {
      ...machineData
      }).then((response) => {
      console.log("sent", response);
      MachineTabledata();
      openSavemachine();
    });
}

  return (
    <div>
       { (
              <AddMachine
                show={show}
                setShow={setShow}
                machinetypes={machinetypes}
              />
            )}

{opendeletemachine && (
              <DeleteMachine
               opendeletemachine={opendeletemachine}
               setOpendeletemachine={setOpendeletemachine}
               selectedRow={selectedRow}
               deleteMachine={deleteMachine}
              />
            )}

{opendeleteprocess && (
              <DeleteProcess
               opendeleteprocess={opendeleteprocess}
                setOpendeleteprocess={setOpendeleteprocess}
                // deleteProcess={deleteProcess}
                processdataList={processdataList}
                getprocessdataList={getprocessdataList}
              />
            )}

            {(
              <AddProcessmodal
               addprocess={addprocess}
               setAddprocess={setAddprocess}
               selectedRow={selectedRow}
               getprocessdataList={getprocessdataList}
               />
            )}

           {opensavemachine && (
             <SaveMachine
             opensavemachine={opensavemachine}
             setOpensavemachine={setOpensavemachine}
             selectedRow={selectedRow}/>
           )}

      <form className="form" onSubmit={handleSubmit(saveMachine)} >
          <div className="row">
            <div className="row">
              <div className="col-md-12 ">
                <label className="">Reference Name</label>
                <input className="in-field" value={machineData.refName} 
                disabled={true}
                name='refName' onChange={(e)=>handleMachineChange(e)} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <label className="">Manufacturer</label>
                <input className="in-field"  name='manufacturer'
                 value={machineData.manufacturer} 
                disabled={true}  onChange={(e)=>handleMachineChange(e)}/>
              </div>
            </div>


            <div className="row">
              <div className="col-md-9">
              <div className="col-md-12 ">
                <label className="">Model</label>
                <input className="in-field" value={machineData.Model} 
                 disabled={true} name='model' onChange={(e)=>handleMachineChange(e)} />
              </div>

              </div>
              <div className="col-md-3">
              <div className="col-md-12 mt-4"
               style={{display:"flex",gap:"5px"}}>
                <label className="">Working</label>
                <input className="form-check-input mt-2"
                    type="checkbox"
                    checked={machineData.Working===1 ? true : false}
                    name='Working' onChange={(e)=>handleMachineChange(e)}
                    id="flexCheckDefault"/>
              </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
              <div className="col-md-12 ">
                <label className="">RegnNo</label>
                <input   value={machineData.RegnNo}
                 name='RegnNo' 
                 disabled={machineData.isRegnNumberPresent=== true ? true : false}
                  {...register("RegnNo")}
                className={`in-field ${
                  errors.RegnNo ? "is-invalid" : ""}`} required 
                  onChange={(e)=>handleMachineChange(e)} />
              </div>

              </div>
              <div className="col-md-6">
              <div className="col-md-12 ">
                <label className="">Location</label>
                <input 
                   name='location' value={machineData.location}
                   disabled={machineData.isLocationPresent===true ? true : false}
                   {...register("location")}
                   className={`in-field ${
                     errors.location ? "is-invalid" : ""}`} required 
                 onChange={(e)=>handleMachineChange(e)} />
              </div>
              </div>
            </div>

            <div className="row">
            <div className="col-md-6">
              <div className="col-md-12 ">
                <label className="">Machine_Type</label>
                <select  value={machineData.Machine_Type}
                    className="ip-select"
                    name='Machine_Type' onChange={(e)=>handleMachineChange(e)}>
                    {machinetypes.map((value,key)=>{
                      return(
                        <>
                          <option value={value}>{value}</option>
                        </>
                      )
                    })}
                  </select>
              </div>
              </div>
              
              <div className="col-md-6">
              <div className="col-md-12 ">
                <label className="">Target Rate</label>
                <input className="in-field" type='number' value={machineData.TgtRate}
                name='TgtRate' onChange={(e)=>handleMachineChange(e)} />
              </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
              <div className="col-md-12 ">
                <label className="">Install Date</label>
                <input 
              name='InstallDate' 
               value={formatDate(machineData.InstallDate)} type="date"
               disabled={machineData.isInstallDatePresent === true ? true : false}
               {...register("InstallDate")} 
                className={`in-field ${
                  errors.InstallDate ? "is-invalid" : ""}`} required 
                 onChange={(e)=>handleMachineChange(e)} />
              </div>
              
              </div>
              <div className="col-md-6">
              <div className="col-md-12 ">
                <label className="">Uninstall Date</label>
                <input className="in-field" name='UnistallDate'
                  value={formatDate(machineData.UnistallDate)}
                 type="date"
                 onChange={(e)=>handleMachineChange(e)} />
              </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-12 ">
                <label className="">Remarks</label>
                <input className="in-field" name='remarks'
                 value={machineData.remarks} 
                 onChange={(e)=>handleMachineChange(e)} />
              </div>
              
            </div>
          </div>

         
      <div className="row mt-3">
        <button className="button-style mt-2 group-button" type='button'
         style={{ width: "150px",marginLeft:"20px" }} onClick={()=>addMachine()}>
           Add Machine
        </button>

        <button className="button-style mt-2 group-button"
         style={{ width: "150px" ,marginLeft:"20px"}} type='submit'>
         Save Machine
        </button>

      <button className="button-style mt-2 group-button" type='button'
       style={{ width: "150px",marginLeft:"20px" }} 
       onClick={()=>{openDeletemachine()}}>
       Delete Machine
      </button>

      <button className="button-style mt-2 group-button" type='button'
       style={{ width: "150px",marginLeft:"20px"}} onClick={()=>openAddprocess()}>
        Add Process
      </button>


      <button className="button-style mt-2 group-button" type='button'
       style={{ width: "150px",marginLeft:"20px"}} onClick={()=>{openDeleteProcess()}}>
       Delete Process
      </button>
     </div>
    </form>
     <div className='mt-4'>
        <ProcessTable processdataList={processdataList}
        selectedRowFun={selectedRowFun} 
        // selectedRow={selectedRow}
        selectRow={selectRow}
        getprocessdataList={getprocessdataList}/>
     </div>
      </div>
      
  )
}

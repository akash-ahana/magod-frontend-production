import axios from "axios";
import React,{useState , useEffect} from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { baseURL } from '../../../api/baseUrl'
import NabTab from "./Components/NavTab";
import DailyReportPrintModal from "./PrintDailyReports/DailyReportPrintModal";

export default function Reports() {

  const [machineProcessData, setMachineProcessData] = useState([])
  useEffect(() => {
      axios.get(baseURL+'/shiftManagerProfile/profileListMachines')
          .then((response) => {
              setMachineProcessData(response.data)
          })
  }, [])

  const dataSource = [
    {
        type: "Machines",
        collapsed: false,
        serverData: machineProcessData,
    },
];

//ONCLICK PRINTDAILY REPORT
const[opendailyReport,setOpendailyReport]=useState('')
const openPrintdailyPdf=()=>{
  setOpendailyReport(true);
}

//Select Date
const[dateSelect,SetDateSelect]=useState('')
const handleChangeSelectDate=(e)=>{
  SetDateSelect(e.target.value);
}

let date=dateSelect.split('-')
let finalDate=date[2]+'-'+date[1]+'-'+date[0];
console.log(finalDate);


  return (
    <div>
      <DailyReportPrintModal
      opendailyReport={opendailyReport}
      setOpendailyReport={setOpendailyReport}/>
      
      <div className='col-md-12'>
        <div className='row'><h4 className='title'>Daily Production Report</h4></div>
      </div>

      <div className='col-md-12'>
        <div className='row'>
           <div className='col-md-2 mt-3'>
                <input  name='InstallDate' onChange={handleChangeSelectDate}
               type="date"
                required />
           </div>

            <button className="button-style mt-3 group-button" type='button'
              style={{ width: "150px",marginLeft:"20px" }}>
               Prepare Report
            </button>

            <button className="button-style mt-3  group-button" type='button'
              style={{ width: "150px",marginLeft:"20px" }} onClick={openPrintdailyPdf}>
               Print Daily Report
            </button>

           {/* <div className='col-md-3'>
           <label  
           className="">Prepared By</label>
                <input style={{marginTop:"-6px"}} className="in-field" required />
           </div> */}
           <div className='col-md-3 mt-2' style={{display:"flex",gap:"20px"}}>
           <label 
           className="mt-1 form-label" style={{whiteSpace:"nowrap"}}>Prepared By</label>
                <input  className="in-field" required />
           </div> 
        </div>
      </div>

      <div className='col-md-12'>
        <div className='row mt-4'>
           <div className='col-md-3' style={{overflowY:"scroll"}}>
           {dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node">{type}</span>;
                    return (
                        <TreeView
                            key={type + "|" + i}
                           nodeLabel={label}
                            defaultCollapsed={true} >

                            {node.serverData.map((data) => {
                                const label2 = <span className="node">{data.MachineName}</span>;
                                
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={data.name }
                                        defaultCollapsed={true}
                                    >
                                        
                                        {data.process.map((value) => {
                                            return (
                                                <>
                                              
                                                <div>
                                             <span className="node">{value.RefProcess}</span>
                                                </div>
                                               
                                                </>
                                            )
                                        })}  
                                     
                                    </TreeView>);
                            })}
                        </TreeView>
                    );
                })}
           </div>
           <div className="col-md-9">
              <NabTab/>
           </div>
        </div>
      </div>
      
    </div>
  )
}

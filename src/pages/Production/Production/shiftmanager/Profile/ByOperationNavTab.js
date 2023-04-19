import React, {useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProgramCompletedData from './components/ProgramCompletedData';
// import ByMachineBox from './components/ByMachineBox';
import TabData from './components/TabData';
import MachineLogTable from './programpath/MachineLogTable';
import ProductionTaskListTable from './programpath/ProductionTaskListTable';
import OperationsProgramCompleteTable from './components/OperationsProgramCompleteTable';
import OperationProgramProcessing from './components/OperationProgramProcessing';
// import ByOperations from './components/ByOperations';
// import ByCustomer from './components/ByCustomer';

export default  function ByOperationNavTab({programProcessing,proramCompleted,onClickMachine,onClickProgram,onClickOperation}) {
    const [key, setKey] = useState("tabdata");

  return (
    <>
    <div className="d-flex">
    {/* <div className="box01 mt-1">
      {isToggled && <ByMachineBox/>}
      {isClick && <ByOperations/>}
      {isCustomer && <ByCustomer/>}
    </div> */}
    <div style={{marginLeft: '40px'}}>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="tabdata" title="Programs Completed">
      <OperationsProgramCompleteTable 
       proramCompleted={proramCompleted}
       onClickOperation={onClickOperation}
       onClickProgram={onClickProgram}
       onClickMachine={onClickMachine}
      />
      </Tab>

      <Tab eventKey="Programs Processing" title="Programs Processing">
      <OperationProgramProcessing programProcessing={programProcessing}/>
      </Tab>

      <Tab eventKey="Machine Log" title="Machine Log">
        <MachineLogTable/>
      </Tab>

      <Tab eventKey="Production Task List" title="Production Task List">
      <ProductionTaskListTable/>
      </Tab>

      <Tab eventKey="Shift Report" title="Shift Report">
      </Tab>
    </Tabs>
    </div>
    </div>
    </>
  )
}


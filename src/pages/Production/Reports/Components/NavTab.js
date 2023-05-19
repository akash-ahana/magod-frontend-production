import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MachineLog from "./MachineLog";
import MachineUtilisationSummary from "./MachineUtilisationSummary";
import ProductionTaskSummary from "./ProductionTaskSummary";

function NabTab() {
  const [key, setKey] = useState("machineLog");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="machineLog" title="Machine Log">
        <MachineLog/>
      </Tab>

      <Tab eventKey="machineutilisationsummary" title="Machine Utilisation Summary">
        <MachineUtilisationSummary/>
      </Tab>

      <Tab eventKey="productiontasksummary" title="Production Task Summary">
        <ProductionTaskSummary/>
      </Tab>
    </Tabs>
  );
}

export default NabTab;

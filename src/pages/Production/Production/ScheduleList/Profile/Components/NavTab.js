import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PartsList from "./PartsList";
import ProgramList from "./ProgramList";

function NabTab({taskno}) {
  const [key, setKey] = useState("partlist");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="partlist" title="Parts List">
        <PartsList taskno={taskno}/>
      </Tab>

      <Tab eventKey="programlist" title="Program List">
        <ProgramList taskno={taskno}/>
      </Tab>
    </Tabs>
  );
}

export default NabTab;

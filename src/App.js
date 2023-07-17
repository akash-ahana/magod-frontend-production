import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WithNav from "./Layout/WithNav";
import Parentroute from "./Layout/Parentroute";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Production from "./pages/Production/Production/Production";
import Fabrication from "./pages/Production/Fabrications/Fabrication";
import Profile from "./pages/Production/Profile/Profile";
import Reports from "./pages/Production/Reports/Reports";
import Services from "./pages/Production/Services/Services";
import Setup from "./pages/Production/Setup/Setup";
import ShiftPlanner from "./pages/Production/Shift Planner/ShiftPlanner";
import Server from "./pages/Production/Setup/Server/Server";
import Machine from "./pages/Production/Setup/Machine/Machine";
import Process from "./pages/Production/Setup/Process";
import EditShiftIC from "./pages/Production/Setup/EditShiftIC";
import StoppagesList from "./pages/Production/Setup/StoppagesList";
import ScheduleList from "./pages/Production/Production/ScheduleList/Profile/ScheduleList";
import ShiftEditor from "./pages/Production/Shift Planner/ShiftEditor";
import ScheduleListService from "./pages/Production/Production/ScheduleList/Service/ScheduleListService";
import ScheduleListFabrication from "./pages/Production/Production/ScheduleList/Fabrication/ScheduleListFabrication";
import PrintWeeklyplan from "./pages/Production/Shift Planner/PdfPrinter/WeeklyshiftTable/PrintWeeklyplan";
import PrintDailyShift from "./pages/Production/Shift Planner/PdfPrinter/DailyshiftTable/PrintDailyShift";
// import PrintShowStatus from "./pages/Production/Production/ScheduleList/Profile/PrintPdF/ShowStatus/PrintShowStatus";
// import ShowPartsPdf from "./pages/Production/Production/ScheduleList/Profile/PrintPdF/ShowParts/ShowPartsPdf";
// import PrintShowStatusFabrication from "./pages/Production/Production/ScheduleList/Fabrication/PrintPdF/ShowStatus/PrintShowStatusFabrication";
// import ShowPartsPdfFabrication from "./pages/Production/Production/ScheduleList/Fabrication/PrintPdF/ShowParts/ShowPartsPdfFabrication";
// import PrintShowStatusService from "./pages/Production/Production/ScheduleList/Service/PrintPdF/ShowStatus/PrintShowStatusService";
// import ShowPartsPdfService from "./pages/Production/Production/ScheduleList/Service/PrintPdF/ShowParts/ShowPartsPdfService";
import ShiftManager from "./pages/Production/Production/shiftmanager/Profile/ShiftManager"
import MachieAlltmntCall from "./pages/Production/Production/Machine Allotment/Profile/MachieAlltmntCall";
import MachieAlltmntCallService from "./pages/Production/Production/Machine Allotment/Service/MachieAlltmntCallService";
import ShiftManagerFabrication from "./pages/Production/Production/shiftmanager/Fabrication/ShiftManagerFabrication";
import ShiftManagerService from "./pages/Production/Production/shiftmanager/Service/ShiftManagerService"
import ScheduleLisMain from "./pages/Production/Production/ScheduleList/ScheduleListMain";
import ShiftManager1 from "./pages/Production/Production/shiftmanager/ShiftManager";
import MachineAllotment from "./pages/Production/Production/Machine Allotment/MachineAllotment";
import ReportMian from "./pages/Production/Reports/ReportMian";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route path="/home" element={<Home/>} />

        <Route element={<WithNav />}>
          <Route path="/production" element={<Parentroute />}>

     {/* Production  */}
           <Route path="production">
                <Route index={true} element={<Production/>}/>
                  
                  {/* ScheduleList */}
                <Route path="schedulelist">
                    <Route index={true} element={<ScheduleLisMain/>}/>
                    <Route path='Profile' element={<ScheduleList/>} />
                    <Route path='Fabrication' element={<ScheduleListFabrication/>}/>
                    <Route path='Service' element={<ScheduleListService/>} />
                </Route>
                
                  {/* Shift Manager */}
                  <Route path="ShiftManager">
                    <Route index={true} element={<ShiftManager1/>}/>
                    <Route path='Profile' element={<ShiftManager/>} />
                    <Route path='Fabrication' element={<ShiftManagerFabrication/>}/>
                    <Route path='Service' element={<ShiftManagerService/>} />
                </Route>

               
                    
                  {/* Machine Allotment */}
                  <Route path="MachineAllotment">
                    <Route index={true} element={<MachineAllotment/>}/>
                    <Route path='Profile' element={<MachieAlltmntCall/>} />
                    <Route path='Service' element={<MachieAlltmntCallService/>}/>
                </Route>

            </Route>

            {/* reports */}
            <Route path="fabrication" element={<Fabrication/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="reports" element={<Reports/>} />
            <Route path="services" element={<Services/>} />

            {/* REPORTS */}
            <Route path="reports">
                <Route index={true} element={<ReportMian/>}/>
                <Route path="dailyreports" element={<Reports/>} />
            </Route>

             {/* Setup*/}
            <Route path="setup">
                <Route index={true} element={<Setup/>}/>
                <Route path="server" element={<Server/>} />
                <Route path="machine" element={<Machine/>} />
                <Route path="process" element={<Process/>} />
                <Route path="editshiftIC" element={<EditShiftIC/>} />
                <Route path="stoppagelist" element={<StoppagesList/>} />
            </Route>

            {/* Shift Planner */}
            <Route path="shiftplanner">
                <Route index={true} element={<ShiftPlanner/>}/>
                {/* Shift Editor */}
                  <Route path="shifteditor">
                    <Route   index ={true} element={<ShiftEditor/>} />
                    <Route path="PrintWeeklyplan" element={<PrintWeeklyplan/>} />
                    <Route path="PrintDailyplan" element={<PrintDailyShift/>}/>
                </Route>
            </Route>
          </Route>
        </Route>

        {/* <Route path="/Header" element={<Header/>}></Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

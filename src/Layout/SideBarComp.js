import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import SubMenuComp from "./SubNavComp";
import { IconContext } from "react-icons/lib";
import { customerSidebar, adminSidebar } from "../components/SidebarData";
import { FaAngleRight, FaAngleLeft, FaAngleDown } from "react-icons/fa";

const NavIcon = styled.div`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarWrap = styled.div`
  width: 100%;
  background-color: #263159;
`;

const SidebarComp = () => {
  const location = useLocation();

  // console.log(
  //   "LOCAL STORAGE DATA",
  //   JSON.parse(localStorage.getItem("LazerUser"))
  // );

  const [newSideBarData, setNewSideBarData] = useState(customerSidebar);
  // const [newSideBarDataScheduleListProfile,setNewSideBarDataScheduleListProfile,] = useState(customerSidebar);
  // const [newSideBarDataScheduleListService,setNewSideBarDataScheduleListService,] = useState(customerSidebar);
  const [accessSideBarData, setAccessSideBarData] = useState([]);

  // console.log(customerSidebar)

  let [lazerUser, setLazerUser] = useState(
    JSON.parse(localStorage.getItem("LazerUser"))
  );

  const [sidebar, setSidebar] = useState(true);

  const newAccessSideBarData = [];

  function showSidebar() {
    setSidebar(!sidebar);
  }


  //access information is present in laser user
  //modify the array in newSideBarData based on laserUserdata
  useEffect(() => {
    const tempArray = [...accessSideBarData]; //creating a copy of the accessSideBar
    // console.log(newSideBarData, "NEW SIDE BAR DATA");

    // console.log(newSideBarData[0].subNav[0].path , 'first pATH')

    //remove /production from the access array
    // console.log(newSideBarData[0],newSideBarData[3]);
    // for (let i = 0; i < lazerUser.data.access.length; i++) {
    //   if (lazerUser.data.access[i] === "/Production") {
    //     lazerUser.data.access.splice(i, 1);

    //     //Setup Machine
    //     for (let j = 0; j < lazerUser.data.access.length; j++) {
    //       if (
    //         newSideBarData[0].subNav[0].path.includes(lazerUser.data.access[j])
    //       ) {
    //         tempArray.push(newSideBarData[0]);
    //       }

    //       //Shift Planner - Shift Editor
    //       if (
    //         newSideBarData[2].subNav[0].path.includes(lazerUser.data.access[j])
    //       ) {
    //         tempArray.push(newSideBarData[2]);
    //       }

    //       //Reports - Daily Reports
    //       if (
    //         newSideBarData[3].subNav[0].path.includes(lazerUser.data.access[j])
    //       ) {
    //         tempArray.push(newSideBarData[3]);
    //       }
    //     }
    //   }
    // }

    // for (let b = 0; b < lazerUser.data.access.length; b++) {
    //   if (lazerUser.data.access[b].includes("/Production/Production/")) {
    //     console.log("PRODUCTION MODULE IS PRESENT");
    //     const productionMenuObject = { ...newSideBarData[1] };
    //     const scheduleListMainObject = { ...newSideBarData[1].subNav[0] };
    //     const machineAllotmentMainObject = { ...newSideBarData[1].subNav[0] };
    //     const shiftManagerMainObject = { ...newSideBarData[1].subNav[2] };

    //     delete productionMenuObject.subNav;
    //     const subNavMain = [];

    //     //For Schedule List
    //     for (let a = 0; a < lazerUser.data.access.length; a++) {
    //       if (lazerUser.data.access[a].includes("Schedulelist")) {
    //         console.log(
    //           "SCHEDULE LIST IS PRESENT",
    //           newSideBarData[1].subNav[0]
    //         );
    //         const scheduleListObject = { ...newSideBarData[1].subNav[0] };
    //         const scheduleListProfileObject = {
    //           ...newSideBarData[1].subNav[0].subNav[0],
    //         };
    //         const scheduleListServiceObject = {
    //           ...newSideBarData[1].subNav[0].subNav[2],
    //         };
    //         const scheduleListFabricationObject = {
    //           ...newSideBarData[1].subNav[0].subNav[1],
    //         };
    //         console.log("scheduleListProfileObject", scheduleListProfileObject);

    //         console.log("scheduleListObject", scheduleListObject);
    //         delete scheduleListObject.subNav;
    //         const subNav = [];

    //         console.log("SCHEDULE LIST IS PRESENT new", scheduleListObject);

    //         //tempArray.push(newSideBarData[1].subNav[0])
    //         for (let b = 0; b < lazerUser.data.access.length; b++) {
    //           if (lazerUser.data.access[b].includes("Schedulelist/Profile")) {
    //             console.log("Schedule List Profile is present");
    //             subNav.push(scheduleListProfileObject);
    //           }
    //           if (lazerUser.data.access[b].includes("Schedulelist/Service")) {
    //             console.log("Schedule List Service is present");
    //             subNav.push(scheduleListServiceObject);
    //           }
    //           if (
    //             lazerUser.data.access[b].includes("Schedulelist/Fabrication")
    //           ) {
    //             console.log("Schedule List Fabriation is present");
    //             subNav.push(scheduleListFabricationObject);
    //           }
    //         }
    //         console.log("subnav", subNav);
    //         scheduleListObject.subNav = subNav;
    //         console.log("final schedule list object ", scheduleListObject);
    //         //tempArray.push(scheduleListObject)
    //         subNavMain.push(scheduleListObject);
    //         break;
    //       }
    //     }

    //     //For Machine Allotment
    //     for (let a = 0; a < lazerUser.data.access.length; a++) {
    //       if (lazerUser.data.access[a].includes("Machineallotment")) {
    //         console.log(
    //           "MACHINE ALLOTMENT IS PRESENT",
    //           newSideBarData[1].subNav[1]
    //         );
    //         const machineAllotmentObject = { ...newSideBarData[1].subNav[1] };
    //         const machineAllotmentProfileObject = {
    //           ...newSideBarData[1].subNav[1].subNav[0],
    //         };
    //         const machineAllotmentServiceObject = {
    //           ...newSideBarData[1].subNav[1].subNav[1],
    //         };

    //         console.log(
    //           "machineAllotmentProfileObject",
    //           machineAllotmentProfileObject
    //         );

    //         console.log("machineAllotmentObject", machineAllotmentObject);
    //         delete machineAllotmentObject.subNav;
    //         const subNav = [];

    //         console.log(
    //           "machineAllotment IS PRESENT new",
    //           machineAllotmentObject
    //         );

    //         //tempArray.push(newSideBarData[1].subNav[0])
    //         for (let b = 0; b < lazerUser.data.access.length; b++) {
    //           if (
    //             lazerUser.data.access[b].includes("Machineallotment/Profile")
    //           ) {
    //             console.log("machineAllotment Profile is present");
    //             subNav.push(machineAllotmentProfileObject);
    //           }
    //           if (
    //             lazerUser.data.access[b].includes("Machineallotment/Service")
    //           ) {
    //             console.log("machineAllotment Service is present");
    //             subNav.push(machineAllotmentServiceObject);
    //           }
    //         }
    //         console.log("subNav", subNav);
    //         machineAllotmentObject.subNav = subNav;
    //         console.log(
    //           "final machineAllotment object ",
    //           machineAllotmentObject
    //         );
    //         //tempArray.push(machineAllotmentObject)
    //         subNavMain.push(machineAllotmentObject);
    //         break;
    //       }
    //     }

    //     //For Shift Manager
    //     for (let a = 0; a < lazerUser.data.access.length; a++) {
    //       if (lazerUser.data.access[a].includes("Shiftmanager")) {
    //         console.log(
    //           "SHIFT MANAGER IS PRESENT",
    //           newSideBarData[1].subNav[2]
    //         );
    //         const shiftManagerObject = { ...newSideBarData[1].subNav[2] };
    //         const shiftManagerProfileObject = {
    //           ...newSideBarData[1].subNav[2].subNav[0],
    //         };
    //         const shiftManagerServiceObject = {
    //           ...newSideBarData[1].subNav[2].subNav[2],
    //         };
    //         const shiftManagerFabricationObject = {
    //           ...newSideBarData[1].subNav[2].subNav[1],
    //         };
    //         console.log("shiftManagerProfileObject", shiftManagerProfileObject);

    //         console.log("shiftManagerObject", shiftManagerObject);
    //         delete shiftManagerObject.subNav;
    //         const subNav = [];

    //         console.log("shiftManager IS PRESENT new", shiftManagerObject);

    //         //tempArray.push(newSideBarData[1].subNav[0])
    //         for (let b = 0; b < lazerUser.data.access.length; b++) {
    //           if (lazerUser.data.access[b].includes("Shiftmanager/Profile")) {
    //             console.log("shiftManager Profile is present");
    //             subNav.push(shiftManagerProfileObject);
    //           }
    //           if (lazerUser.data.access[b].includes("Shiftmanager/Service")) {
    //             console.log("shiftManager Service is present");
    //             subNav.push(shiftManagerServiceObject);
    //           }
    //           if (
    //             lazerUser.data.access[b].includes("Shiftmanager/Fabrication")
    //           ) {
    //             console.log("shiftManager Fabriation is present");
    //             subNav.push(shiftManagerFabricationObject);
    //           }
    //         }
    //         console.log("subNav", subNav);
    //         shiftManagerObject.subNav = subNav;
    //         console.log("final shiftManager object ", shiftManagerObject);
    //         //tempArray.push(shiftManagerObject)
    //         subNavMain.push(shiftManagerObject);
    //         break;
    //       }
    //     }

    //     console.log("SUBNAV MAIN", subNavMain);
    //     productionMenuObject.subNav = subNavMain;
    //     console.log("final production object ", productionMenuObject);
    //     tempArray.push(productionMenuObject);
    //     break;
    //   }
    // }

    // let access = ['/quotation/Quotation/QuoteList/Sent','/quotation/Quotation/QuoteList/ToSend', '/quotation/Quotation/CreateNewQuotation', '/materialmanagement/receipt/customerjobwork/sheetsandothers/closedrvlist', '/materialmanagement/receipt/purchase/parts/new', '/Production/Production/Schedulelist/Fabrication', '/Production/Production/Machineallotment/Profile', '/customer/custorders', ' /Production/Setup/Machine','/Production/Production/Schedulelist/Profile','/Production/Production/Schedulelist/Service','/production/Setup/Machine','/Production/Shiftplanner/Shifteditor','/Production/Reports/Dailyreports']

    //console.log(access, 'access')
    function filterSidebarData(data, accessPaths) {
      const result1 = [];
  
  //  console.log(data)
  
      data.forEach((element) => {
        // console.log(element)
        if (element.subNav) {
          // console.log(element.subNav)
          const subNavFiltered = filterSidebarData(element.subNav, accessPaths);
  
          element.subNav = subNavFiltered;
          // console.log(subNavFiltered)
          if (subNavFiltered.length > 0 || accessPaths.includes(element.path)) {
            // console.log(element, 'existtttttttttttttttttttttttttttttttttt')
            result1.push(element);
  
          }
  
        } else {
  
          if (accessPaths.includes(element.path)) {
  
            result1.push(element);
  
          }
  
        }
  
      });
  
   
  
      return result1;
  
    }
  
   
  
    const result1 = filterSidebarData(newSideBarData,lazerUser.data.access);
  
    // console.log(result1);
  
      ///////////////////////////////////////////////////////////////////////////////////////////////////////
  
      setAccessSideBarData(result1)

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    // setAccessSideBarData(tempArray);
  }, []);
  // console.log(accessSideBarData, "Access Side Bar Data");
  //console.log(newAccessSideBarData, 'newAccessSideBarData')
  return (
    <>
      <nav className={sidebar ? "side-nav" : '"side-nav '}>
        <SidebarWrap>
          <div className="admin-title ">
            {/* {sidebar && 'M A G O D'} */}
            <img className="logo" src={require("../ML-LOGO1.png")} />
            {sidebar ? (
              <FaAngleRight
                className="toggle-icon"
                onClick={() => showSidebar()}
              />
            ) : (
              <FaAngleLeft
                className="toggle-icon"
                onClick={() => showSidebar()}
              />
            )}
          </div>

          {(location.pathname.startsWith("/admin")
            ? adminSidebar
            :location.pathname.startsWith("/Production")
            ? accessSideBarData
            :null
          ).map((item, index) => {
            return <SubMenuComp item={item} key={index} sidebar={sidebar} />;
          })}
        </SidebarWrap>
      </nav>
    </>
  );
};

export default SidebarComp;

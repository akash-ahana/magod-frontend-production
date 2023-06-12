import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
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

  console.log('LOCAL STORAGE DATA' , JSON.parse(localStorage.getItem("LazerUser")))

  const [newSideBarData, setNewSideBarData] = useState(customerSidebar)
  const [accessSideBarData, setAccessSideBarData] = useState([])



  let [lazerUser, setLazerUser] = useState(
    JSON.parse(localStorage.getItem("LazerUser"))
  );



  const [sidebar, setSidebar] = useState(true);

  const newAccessSideBarData = []

  function showSidebar() {
    setSidebar(!sidebar);
  }
  //access information is present in laser user 
  //modify the array in newSideBarData based on laserUserdata
  useEffect(() => {
    //console.log(lazerUser.data.access , 'lazer user access state')
    console.log(newSideBarData, 'NEW SIDE BAR DATA')

    console.log(newSideBarData[0].subNav[0].path , 'first pATH')


    
    //remove /production from the access array
    for(let i = 0; i<lazerUser.data.access.length;i++) {
      if(lazerUser.data.access[i] === "/Production") {
        lazerUser.data.access.splice(i, 1);

        for(let i =0; i<lazerUser.data.access.length;i++) {
          if(newSideBarData[0].subNav[0].path.includes(lazerUser.data.access[i])) {
            console.log(newSideBarData[0] , 'Setup is present in the Access')
            setAccessSideBarData([newSideBarData[0]])
        } else {
            console.log('Setup is not present in the access')
        }

        if(newSideBarData[2].subNav[0].path.includes(lazerUser.data.access[i])) {
          console.log(newSideBarData[2].subNav[0].path , 'shift editor array')
          console.log(newSideBarData[2] , 'Shift Planner is present in the Access')
          setAccessSideBarData([newSideBarData[2]])
        } else {
          console.log('Shift Planner is not present in the access')
        }

        //add multiple if conditions for each route specifically and check if that route is present in the access mapping 
        }
        }
    }


    
    
  }, []);
  console.log(accessSideBarData , 'Access Side Bar Data')
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
            : accessSideBarData
          ).map((item, index) => {
            return <SubMenuComp item={item} key={index} sidebar={sidebar} />;
          })}
        </SidebarWrap>
      </nav>
    </>
  );
};

export default SidebarComp;

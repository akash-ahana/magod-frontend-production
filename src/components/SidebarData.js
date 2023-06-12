import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FaIcon from "react-icons/fa";
import * as MdIcon from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { BiFoodMenu } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { BsPersonFill,BsFillGearFill,BsScrewdriver } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { DiOpenshift } from "react-icons/di";
import {MdReport} from "react-icons/md";
import {MdHomeRepairService} from "react-icons/md"
import {BsListCheck} from "react-icons/bs";
import {BiGitMerge} from "react-icons/bi";
import {SiGoogletagmanager} from "react-icons/si";
import {BsServer} from "react-icons/bs";
import {FiCpu} from "react-icons/fi"
import {VscServerProcess} from "react-icons/vsc"
import {FiGitPullRequest} from "react-icons/fi"
import {AiOutlineOrderedList} from "react-icons/ai"
import {FiEdit} from "react-icons/fi"
import {FaDropbox} from "react-icons/fa";
import {GoReport} from "react-icons/go"
import {AiOutlineSchedule} from "react-icons/ai"
import {GiLaserPrecision} from "react-icons/gi"
import {HiCubeTransparent} from "react-icons/hi"
import {AiFillSchedule} from "react-icons/ai"

console.log(JSON.parse(localStorage.getItem("LazerUser")))

export const customerSidebar = [
  {
    title: "Setup",
    // path: " /production/setup/server",
    icon: <BsFillGearFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Machine",
        path: "/Production/Setup/Machine",
        icon: <FiCpu/>,
      },
    ],
  },

  {
    title: "Production",
    // path: "/production/production",
    icon: <AiFillCreditCard/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Schedule List",
        // path: "/production/production/schedulelist",
        icon: <BsListCheck />,
        subNav: [
          {
            title: "Profile",
            path: "/Production/Production/Schedulelist/Profile",
            icon: <AiIcons.AiOutlineArrowRight />            
          },{
            title: "Fabrication",
            path: "/Production/Production/Schedulelist/Fabrication",
            icon: <AiIcons.AiOutlineArrowRight />            
          },{
            title: "Services",
            path: "/Production/Production/Schedulelist/Service",
            icon: <AiIcons.AiOutlineArrowRight />            
          }]
      },
      {
        title: "Machine Allotment",
        // path: "/production/production/machineallotementprofile",
        icon: <BiGitMerge/>,
        subNav: [
          {
            title: "Profile",
            path: "/Production/Production/MachineAllotment/Profile",
            icon: <AiIcons.AiOutlineArrowRight />            
          },
          {
            title: "Service",
            path: "/Production/Production/MachineAllotment/Service",
            icon: <AiIcons.AiOutlineArrowRight />            
          }
        ]


      },
      {
        title: "Shift Manager",
        // path:  "production/production/shiftmanagerProfile",
        icon: <SiGoogletagmanager/>,
        subNav: [
          {
            title: "Profile",
            path: "/Production/Production/ShiftManager/Profile",
            icon: <AiIcons.AiOutlineArrowRight />            
          },{
            title: "Fabrication",
            path: "/Production/Production/ShiftManager/Fabrication",
            icon: <AiIcons.AiOutlineArrowRight />            
          },{
            title: "Services",
            path: "/Production/Production/ShiftManager/Service",
            icon: <AiIcons.AiOutlineArrowRight />            
          }]
      },
    ]
  },

  {
    title: "Shift Planner",
    icon: <DiOpenshift />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Shift Editor",
        path: "/Production/Shiftplanner/Shifteditor",
        icon: <FiEdit />,
      },
    ]
  },
  {
    title: "Reports",
    path: "/Production/Reports",
    icon: <MdReport />,
    icon:<GoReport/>
  },
];

export const adminSidebar = [
  {
    title: "Access",
    icon: <MdIcon.MdOutlineSecurity />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Menu Roles",
        path: "/admin/menuRoles",
        icon: <AiIcons.AiOutlineMenuFold />,
      },
    ],
  },
  {
    title: "Users",
    icon: <FaIcon.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Roles",
        path: "/admin/roles",
        icon: <VscTypeHierarchySub />,
      },
      {
        title: "Menus",
        path: "/admin/menus",
        icon: <BiFoodMenu />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <HiUsers />,
      },
    ],
  },
];

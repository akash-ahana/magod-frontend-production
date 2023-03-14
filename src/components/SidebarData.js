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

export const customerSidebar = [
  {
    title: "Setup",
    // path: " /production/setup/server",
    icon: <BsFillGearFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Server",
        path: "/production/setup/server",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Machine",
        path: "/production/setup/machine",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Process",
        path: "/production/setup/process",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Edit Shift IC",
        path: "/production/setup/editshiftIC",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Stoppages List",
        path: "/production/setup/stoppagelist",
        // icon: <IoIcons.IoIosPaper />,
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
        // icon: <IoIcons.IoIosPaper />,
        subNav: [
          {
            title: "Profile",
            path: "/production/production/schedulelistprofile",
            // icon: <IoIcons.IoIosPaper />,
            
          },{
            title: "Fabrication",
            path: "/production/production/schedulelistfabrication",
            // icon: <IoIcons.IoIosPaper />,
            
          },{
            title: "Services",
            path: "/production/production/schedulelistservice",
            // icon: <IoIcons.IoIosPaper />,
            
          }]
        
      },
      {
        title: "Machine Allotment",
        path: "/customer/outstandings",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Shift Manager",
        path: "/customer/outstandings",
        // icon: <IoIcons.IoIosPaper />,
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
        path: "/production/shiftplanner/shifteditor",
        // icon: <IoIcons.IoIosPaper />,
        subNav:
         [ 
          {
           title: "New",
           path: "/production/shiftplanner/shifteditor",
           icon: <AiIcons.AiOutlineForward />
          }
          ]
      },
      {
        title: "Weekly Shift Planner",
        path: "/production/shiftplanner/weeklyShifteditor ",
        // icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: "Reports",
    path: "/production/reports",
    icon: <MdReport />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Fabrication",
    path: "/production/fabrication",
    icon: <BsScrewdriver />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "3D Schedules",
        path: "/customer/custinvandpayments",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Laser Welding",
        path: "/customer/outstandings",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Fabrication",
        path: "/customer/outstandings",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Scheduler",
        path: "/customer/outstandings",
        // icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: "Profile",
    path: "/production/profile",
    icon: <BsPersonFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Schedules List",
        path: "/customer/custinvandpayments",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Shift Manager",
        path: "/customer/outstandings",
        // icon: <IoIcons.IoIosPaper />,
      },
    ]
  },
  {
    title: "Service",
    path: "/production/services",
    icon: <MdHomeRepairService/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Schedules List",
        path: "/customer/custinvandpayments",
        // icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Shift Manager",
        path: "/customer/outstandings",
        // icon: <IoIcons.IoIosPaper />,
      },
    ]
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

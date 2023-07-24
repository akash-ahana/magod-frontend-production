import React from 'react'
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import DailyReportTableRow from './DailyReportTableRow';

const styles = StyleSheet.create({
    page: {
      fontSize: 11,
      flexDirection: "column",
    },
     tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    tableTitle : {
        textDecoration : "underline",
        marginLeft:"200px",
        marginTop:"20px",
    },
    title2 :{
         marginTop:"5px",
        textDecoration : "underline",
        marginLeft:"205px"
    },
    details:{
        marginLeft:"60px",
        borderBottom:"1px",
        borderTop:"1px",
        width:"500px",
        marginTop:"10px",
        paddingTop:"10px",
        paddingBottom:"10px",
        display:"flex"
    },
    program:{
      marginLeft:"180px",
        marginTop:"-10px"
    },
    tableview:
    {
      marginLeft:"60px",
      width:"430px",
    },
    tablemainheaderName:{
        textDecoration:"underline",
        marginRight:"200px",
    },
    tablemainheader1:{
      // textDecoration:"underline",
      marginLeft:"100px",
      marginTop:"14px"
  },
  tablemainheader:{
    textDecoration:"underline",
    marginLeft:"100px",
    marginTop:"10px"
},
    Headingrow: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px",
      marginTop:"5px",
      marginLeft:"60px",
      width:"500px",
    },
    production:{
      marginLeft:"350px",
      marginTop:"-10px"
    },
    production1:{
      marginLeft:"350px",
      marginTop:"10px"
    },
    production2:{
      marginLeft:"350px",
      marginTop:"10px"
    },
    name:{
      marginRight:"100px",
      marginLeft:"100px",
      marginTop:"50px"
    },
    desig:{
      marginRight:"100px",
      marginLeft:"400px",
      marginTop:"-10px"
    },
    power:{
      marginLeft:"60px",
      marginTop:"20px",
      borderTop:"1px",
      width:"500px",
      paddingTop:"10px"
    },
    power1:{
      marginLeft:"60px",
      marginTop:"5px"
    },
    task:{
      textDecoration:"underline"
    },
    Nodata:{
      marginTop:"100px"
    },
    desc:{
      marginLeft:"80px",
      marginTop:"5px",
    },
    desc2:{
      paddingLeft:"220px",
      paddingTop : "-12px",
      marginTop:"-12px",
      marginBottom : "15px"
    },
    desc3 : {
      marginLeft:"124px",
      marginTop:"5px",
    }
  });
  

const DailyReportTable = ({Date,pdfData}) => (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd:Jigani</Text>
      <Text style={styles.title2}>Production Summary :{Date}</Text>


      {pdfData && pdfData.length > 0 ? (
  pdfData.map((machine) => (
    <React.Fragment key={machine.MachineName}>
      <View style={styles.details}>
        <Text style={styles.tablemainheaderName}>{machine.MachineName}</Text>
        <Text style={styles.program}>Laser ON Reading {machine.LaserOn}</Text>
        <Text style={styles.production}>Production ON : {machine.ProdON}</Text>
        <Text style={styles.production1}>Non-Production ON : {machine.NonProdOn}</Text>
        <Text style={styles.production2}>Total Off : {machine.TotalOff}</Text>
      </View>

      {machine.tasks.map((task) => (
        <View style={styles.tablemainheader1} key={task.task}>
        <Text style={styles.task} >{task.task}</Text>
        {task.operations.map((operation) => (
          <Text key={operation.Operation} style={styles.desc}>{operation.Operation}</Text> 
          ))}
           {task.operations.map((operation) => (
            <Text key={operation.Operation} style={styles.desc2}>{operation.time}</Text>
            ))}      
      </View>
      ))}
    </React.Fragment>
  ))
) : (
  <Text style={styles.Nodata}>No data available</Text>
)}
    <View >
          <Text style={styles.power}>Power Meter Reading</Text>
          <Text style={styles.power1}>Power Units Consume</Text>
        </View>

        
    <View>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.desig}>Designation</Text>
        </View>
  </View>
    </Page>
  </Document>

);


export default DailyReportTable;

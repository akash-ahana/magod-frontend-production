import React from 'react'
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import PrintPriorityTableRow from './PrintPriorityTableRow';

const styles = StyleSheet.create({
    page: {
      fontSize: 10,
      flexDirection: "column",
    },
     tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    description: {
      width: "60%",
    },
    tableTitle : {
        textDecoration : "underline",
        marginLeft:"180px",
        marginTop:"10px",
    },
    title2 :{
        textDecoration : "underline",
        marginLeft:"170px"
    },
    shiftperiod:{
        marginLeft:"250px",
        marginTop:"3px"
    },
    machineName:{
       marginTop:"50px",
       marginRight:"200px",
       marginLeft:"50px"
    },
    tableview:
    {
      marginLeft:"60px",
      width:"480px",
    },
    Headingrow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottom:"1px",
        marginTop:"20px",
        marginLeft:"60px",
        width:"500px",
      },
      srl: {
        width: "30px",
      },
      Program: {
        width: "50px",
      },
      operation:{
          width:"130px"
      },
      customer:{
          width:"250px"
      },
      newLoad:{
        marginLeft:"290px",
        marginTop:"7px",
      },
      processed:{
        width:"40px"
      },
      load:{
        width:"40px"
      },
      production:{
        marginTop:"30px",
       marginLeft:"50px"
      },
      Signature:{
        marginTop:"15px",
        marginLeft:"50px"
      },
      Time:{
        marginLeft:"50px"
      }
  });
  

const PrintPriorityTable = ({sortedPriorityTable}) => (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd:Production Department</Text>
        <Text style={styles.shiftperiod}>Production Plan:Jigani </Text>

        {sortedPriorityTable.map((item)=>{
          return(
            <>
            <View>
           <Text style={styles.machineName}>{item.Machine}</Text>
         </View>
            <View style={styles.Headingrow}>
           <Text style={styles.srl}>Srl</Text>
           <Text style={styles.Program}>Program</Text>
           <Text style={styles.operation}>Operation</Text>
           <Text style={styles.customer}>Customer</Text>
           <Text style={styles.processed}>Load</Text>
           <Text style={styles.load}>Processed</Text>
        </View>
 
       <View style={styles.tableview}>
          <PrintPriorityTableRow sortedPriorityTable={item.priorityList} 
          />
       </View>
       <View>
        <Text style={styles.newLoad}>Load For {item.Machine} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.newLoad}</Text>
       </View>
           </>
          )
        })}   
        <View >
          <Text style={styles.production}>Production In Charge</Text>
          <Text style={styles.Signature}>Signature</Text>
          <Text style={styles.Time}>Date and Time</Text>
        </View>

        {/* <View>
          <Text style={styles.Signature}></Text>
          <Text ></Text>
        </View> */}
  </View>
    </Page>
  </Document>

);


export default PrintPriorityTable;

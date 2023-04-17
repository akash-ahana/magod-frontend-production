import React from 'react'
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import PrintPriorityTableRow from './PrintPriorityTableRow';

const styles = StyleSheet.create({
    page: {
      fontSize: 11,
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
        marginLeft:"200px",
        marginTop:"20px",
    },
    title2 :{
        textDecoration : "underline",
        marginLeft:"220px"
    },
    shiftperiod:{
        marginLeft:"260px",
        marginTop:"10px"
    },
    machineName:{
       marginTop:"50px",
       marginRight:"200px",
       marginLeft:"50px"
    },
    tableview:
    {
      marginLeft:"60px",
      width:"430px",
    },
    Headingrow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottom:"1px",
        marginTop:"20px",
        marginLeft:"60px",
        width:"430px",
      },
      srl: {
        width: "10%",
      },
      Program: {
        width: "20%",
      },
      operation:{
          width:"20%"
      },
      customer:{
          width:"20%"
      }
  });
  

const PrintPriorityTable = ({priorityTable}) => (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd:Production Department</Text>
        <Text style={styles.shiftperiod}>Production Plan:Jigani </Text>

        <View>
          <Text style={styles.machineName}>Machine Name</Text>
        </View>
       
       <View style={styles.Headingrow}>
          <Text style={styles.srl}>Srl</Text>
          <Text style={styles.Program}>Program</Text>
          <Text style={styles.operation}>Operation</Text>
          <Text style={styles.customer}>Customer</Text>
          <Text style={styles.operation}>Load</Text>
          <Text style={styles.operation}>Processed</Text>
       </View>

      <View style={styles.tableview}>
         <PrintPriorityTableRow priorityTable={priorityTable} />
      </View>
            
  </View>
    </Page>
  </Document>

);


export default PrintPriorityTable;

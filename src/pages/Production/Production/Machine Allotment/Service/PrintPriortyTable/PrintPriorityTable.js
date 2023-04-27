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
        marginLeft:"150px",
        marginTop:"20px",
    },
    title2 :{
        textDecoration : "underline",
        marginLeft:"170px"
    },
    shiftperiod:{
        marginLeft:"230px",
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
      width:"450px",
    },
    Headingrow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottom:"1px",
        marginTop:"20px",
        marginLeft:"60px",
        width:"450px",
      },
      srl: {
        width: "10%",
      },
      Program: {
        width: "20%",
      },
      operation:{
          width:"30%"
      },
      customer:{
          width:"50%"
      },
      newLoad:{
        marginLeft:"250px",
        marginTop:"10px",
      },
      processed:{
        width:"10%"
      },
      load:{
        width:"10%"
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
        <Text style={styles.newLoad}>Load For {item.Machine} &nbsp;-&nbsp;{item.newLoad}</Text>
       </View>
           </>

          )
          
        })}
       
      
            
  </View>
    </Page>
  </Document>

);


export default PrintPriorityTable;

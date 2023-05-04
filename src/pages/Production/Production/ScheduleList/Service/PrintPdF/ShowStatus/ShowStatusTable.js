import React from 'react'
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import ShowStatusTableRow from './ShowStatusTableRow';

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
        textDecoration : "underline",
        marginLeft:"220px"
    },
    location:{
        marginRight:"250px",
        marginLeft:"250px",
        marginTop:"10px",
        textDecoration:"underline"
    },
    datedisplay:{
        marginRight:"200px",
        marginLeft:"225px",
        marginTop:"2px"
    },
    tableview:
    {
      marginLeft:"60px",
      width:"430px",
    },
    tablemainheader:{
        textDecoration:"underline",
        marginTop:"20px",
        marginRight:"200px",
        marginLeft:"50px"
    },
    Headingrow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottom:"1px",
        marginTop:"5px",
        marginLeft:"60px",
        width:"460px",
      },
      Scheduleno: {
        width: "20%",
      },
      Customer: {
        width: "30%",
      },
      Date:{
          width:"20%"
      },
      Instruction:{
        width:"40%"
      }
  });
  

const ShowStatusTable = ({Date}) => (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd</Text>
        <Text style={styles.title2}>Production Status Report</Text>
        <Text style={styles.location}>Unit:Jigani</Text>
        <Text style={styles.datedisplay}>{Date}</Text>

        <Text style={styles.tablemainheader} >Programmed</Text>
        <View style={styles.Headingrow}>
          <Text style={styles.Scheduleno}>Schedule No</Text>
          <Text style={styles.Customer}>Customer</Text>
          <Text style={styles.Date}>Tg Date</Text>
          <Text style={styles.Date}>Del Date</Text>
          <Text style={styles.Instruction}>Instructions</Text>
       </View>
        
    <View style={styles.tableview}>
      <ShowStatusTableRow/>
    </View>
         
  </View>
    </Page>
  </Document>

);


export default ShowStatusTable;

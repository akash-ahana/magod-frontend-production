import React from 'react'
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import ShowPartsTableRow from './ShowPartsTableRow';

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
        marginLeft:"60px",
        marginTop:"20px",
        borderBottom:"1px",
        width:"500px"
    },
    details: {
      marginRight: "250px",
      marginLeft: "60px",
      borderBottom: "1px",
      width: "500px",
      // marginTop: "50px",
    },
    details1: {
      marginRight: "250px",
      marginLeft: "60px",
      borderBottom: "1px",
      width: "500px",
      fontFamily: "Helvetica-Bold"
    },
    details2: {
      marginRight: "50px",
      borderBottom: "1px",
      fontFamily: "Helvetica-Bold"

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
      width:"500px",
    },
    Scheduled: {
      width: "20%",
    },
    dwgname: {
      width: "40%",
    },
    Nested:{
        width:"10%"
    },
    lot:{
      width:"10%"
    },
    detailss: {
      marginRight: "250px",
      marginLeft: "60px",
      borderBottom: "1px",
      width: "500px",
      marginTop: "50px",
    },
  });
  

const ShowPartsTable = ({processrowselect,rowselect,partlistdata}) => (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        {/* <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd</Text>
        <Text style={styles.title2}>Production Status Report</Text>
        <Text style={styles.location}>Magod Laser:Jigani</Text> */}

        <View>
        <Text style={styles.detailss}>Magod Laser:Jigani</Text>
          <Text style={styles.details}>
            Parts Sheet Schedule No : {rowselect.OrdSchNo}
          </Text>
          <Text style={styles.details1}>
            Task No: {processrowselect.TaskNo} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text style={styles.details2}>Inspected and Cleared</Text>
          </Text>
        </View>

        <View style={styles.Headingrow}>
          <Text style={styles.dwgname}>Drawing  Name</Text>
          <Text style={styles.Scheduled}>Scheduled</Text>
          <Text style={styles.Nested}>Nested</Text>
          <Text style={styles.lot}>Lot1</Text>
          <Text style={styles.lot}>Lot2</Text>
          <Text style={styles.lot}>Lot3</Text>
          <Text style={styles.lot}>Lot4</Text>
        </View>
        
    <View style={styles.tableview}>
      <ShowPartsTableRow processrowselect={processrowselect}
      rowselect={rowselect}
      partlistdata={partlistdata}/>
    </View>
         
  </View>
    </Page>
  </Document>

);


export default ShowPartsTable;

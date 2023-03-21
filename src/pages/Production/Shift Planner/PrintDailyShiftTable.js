import React from 'react'
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import PrintDailyShiftTableRows from './PrintDailyShiftTableRow';

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
    xyz: {
      width: "40%",
    },
    tableTitle : {
        textDecoration : "underline",
        marginLeft:"200px",
        marginTop:"20px",
    },
    title2 :{
        textDecoration : "underline",
        marginLeft:"160px",
        marginTop:"10px"
    },
    shiftperiod:{
        marginLeft:"140px",
        marginTop:"20px"
    },
    boxdata:{
        border:"1px",
        padding:"10px",
        marginTop:"40px",
        width:"600px",
        marginLeft:"50px",
        marginRight:"100px"
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
      machineHeading: {
        width: "30%",
      },
      operatorHeading: {
        width: "30%",
      },
      remarksHeading:{
          width:"40%"
      }
  });
  

const PrintDailyShiftTable = ({data,rowselect}) => (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd</Text>
        <Text style={styles.title2}>Production Department : Shift List - {rowselect}</Text>

        <View style={styles.boxdata}>
           <Text>Shift      &nbsp;&nbsp;&nbsp;First </Text>
           <Text>Shift IC   &nbsp;Kumar now</Text>
           <Text>From       &nbsp;{rowselect}</Text>
           <Text>To         &nbsp;&nbsp;&nbsp;{rowselect}</Text>
        </View>

       <View style={styles.Headingrow}>
          <Text style={styles.machineHeading}>Machine</Text>
          <Text style={styles.operatorHeading}>Operator</Text>
          <Text style={styles.remarksHeading}>ShiftRemarks</Text>
       </View>

    {/*<TableHeader />*/}
    <View style={styles.tableview}>
      <PrintDailyShiftTableRows  items={data.items} />
    </View>

    <View style={styles.boxdata}>
           <Text>Shift      &nbsp;&nbsp;&nbsp;Second </Text>
           <Text>Shift IC   &nbsp;Kumar now</Text>
           <Text>From       &nbsp;{rowselect}</Text>
           <Text>To         &nbsp;&nbsp;&nbsp;{rowselect}</Text>
        </View>

       <View style={styles.Headingrow}>
          <Text style={styles.machineHeading}>Machine</Text>
          <Text style={styles.operatorHeading}>Operator</Text>
          <Text style={styles.remarksHeading}>ShiftRemarks</Text>
       </View>

    {/*<TableHeader />*/}
    <View style={styles.tableview}>
      <PrintDailyShiftTableRows  items={data.items} />
    </View>

    <View style={styles.boxdata}>
           <Text>Shift      &nbsp;&nbsp;&nbsp;Third</Text>
           <Text>Shift IC   &nbsp;Kumar now</Text>
           <Text>From       &nbsp;{rowselect}</Text>
           <Text>To         &nbsp;&nbsp;&nbsp;{rowselect}</Text>
        </View>

       <View style={styles.Headingrow}>
          <Text style={styles.machineHeading}>Machine</Text>
          <Text style={styles.operatorHeading}>Operator</Text>
          <Text style={styles.remarksHeading}>ShiftRemarks</Text>
       </View>

    {/*<TableHeader />*/}
    <View style={styles.tableview}>
      <PrintDailyShiftTableRows  items={data.items} />
    </View>

    <View style={styles.boxdata}>
           <Text>Shift      &nbsp;&nbsp;&nbsp;General</Text>
           <Text>Shift IC   &nbsp;Kumar now</Text>
           <Text>From       &nbsp;{rowselect}</Text>
           <Text>To         &nbsp;&nbsp;&nbsp;{rowselect}</Text>
        </View>

       <View style={styles.Headingrow}>
          <Text style={styles.machineHeading}>Machine</Text>
          <Text style={styles.operatorHeading}>Operator</Text>
          <Text style={styles.remarksHeading}>ShiftRemarks</Text>
       </View>

    {/*<TableHeader />*/}
    <View style={styles.tableview}>
      <PrintDailyShiftTableRows  items={data.items} />
    </View>

    {/*<TableFooter items={data.items} />*/}
  </View>
    </Page>
  </Document>

);


export default PrintDailyShiftTable;

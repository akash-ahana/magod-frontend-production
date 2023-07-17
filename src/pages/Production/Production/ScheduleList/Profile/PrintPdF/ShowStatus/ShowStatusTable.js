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
        marginLeft:"360px",
        fontFamily: "Helvetica-Bold"        
    },
    title2 :{
        textDecoration :"underline",
        marginLeft:"-136px",
        marginTop:"20px",
        fontFamily: "Helvetica-Bold"
    },
    location:{
        marginRight:"280px",
        marginLeft : "415px",
        // marginLeft:"350px",
        marginTop:"22px",
        textDecoration:"underline",
        fontFamily: "Helvetica-Bold"
    },
    datedisplay:{
        //marginRight:"200px",
        marginLeft:"-351px",
        marginTop:"5.5px",
        fontFamily: "Helvetica-Bold"
    },
    tableview:
    {
      marginLeft:"60px",
      width:"430px",
    },
    tablemainheader:{
        textDecoration:"underline",   
        paddingTop : "20px",
        paddingLeft : "30px",
        marginLeft : "-460px",
        marginTop : "51px"
    },
     Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom:"1px",
    marginTop:"10px",
    marginLeft:"60px",
    marginBottom : "10px",
    width:"700px",
    // fontSize:"10px"
  },
  Scheduleno: {
    width: "100px",
    // whiteSpace:"nowrap"
  },
  Customer: {
    width: "250px",
    // whiteSpace:"nowrap"
  },
  Date:{
      width:"100px",
      // whiteSpace:"nowrap"
  },
  Instruction:{
    width:"150px",
    // whiteSpace:"nowrap"
  }
  });
  

const ShowStatusTable = ({Date,showStatusData}) => (
    <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd</Text>
        <Text style={styles.title2}>Production Status Report</Text>
        <Text style={styles.location}>Unit:Jigani</Text>
        <Text style={styles.datedisplay}>{Date}</Text>

{showStatusData.map((item,key)=>{
  return(
    <>
    <Text style={styles.tablemainheader}>{item.status}</Text>
        <View style={styles.Headingrow}>
          <Text style={styles.Scheduleno}>Schedule No</Text>
          <Text style={styles.Customer}>Customer</Text>
          <Text style={styles.Date}>Tgt Date</Text>
          <Text style={styles.Date}>Del Date</Text>
          <Text style={styles.Instruction}>Instructions</Text>
       </View>
        
    <View style={styles.tableview}>
      <ShowStatusTableRow showStatusData={item.data} />
    </View>

    </>
  )
})}
        
  </View>
    </Page>
  </Document>

);


export default ShowStatusTable;

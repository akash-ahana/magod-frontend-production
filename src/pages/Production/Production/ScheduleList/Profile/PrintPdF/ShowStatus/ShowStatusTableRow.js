import React, { Fragment, useState } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";
// import axios from "axios";


const styles = StyleSheet.create({
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom:"1px",
    marginTop:"10px",
    // marginLeft:"60px",
    width:"700px",
    // fontSize:"10px"
  },
  Scheduleno: {
    width: "100px",
    whiteSpace:"nowrap"
  },
  Customer: {
    width: "250px",
    whiteSpace:"nowrap"
  },
  Date:{
      width:"100px",
      whiteSpace:"nowrap"
  },
  Instruction:{
    width:"150px",
    whiteSpace:"nowrap"
  }
  });
  
  const ShowStatusTableRow = ({showStatusData}) => {

    // console.log(typeof(firstmachineoperator));
    //console.log(newitems , 'New Items from print daily Shift Table Row')
    const rows =showStatusData.map((value) => (
      <View style={styles.Headingrow}>
          <Text style={styles.Scheduleno}>{value.OrdSchNo}</Text>
          <Text style={styles.Customer}>{value.Cust_name}</Text>
          <Text style={styles.Date}>{value.schTgtDate}</Text>
          <Text style={styles.Date}>{value.Delivery_Date}</Text>
          <Text style={styles.Instruction}></Text>
       </View>
    ));



    return <Fragment>{rows}</Fragment>;
  };
  
  export default ShowStatusTableRow;
  
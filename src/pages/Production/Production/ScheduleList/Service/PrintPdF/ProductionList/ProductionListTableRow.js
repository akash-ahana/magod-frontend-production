import React, { Fragment, useState } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";
// import axios from "axios";


const styles = StyleSheet.create({
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px",
    marginTop: "5px",
    width: "800px",
    marginLeft:"-40px"
  },
  schd: {
    width: "80px",
  },
  status: {
    width: "80px",
  },
  customer: {
    width: "350px",

  },
  deldate: {
    width: "80px",
    marginLeft:"-50px"

  },
  remaining: {
    width: "50px",
  },
  });
  
  const ProductionListTableRow = ({selectedRows}) => {

    // console.log(typeof(firstmachineoperator));
    //console.log(newitems , 'New Items from print daily Shift Table Row')
    const rows = selectedRows.map((item) => (
      <View style={styles.Headingrow}>
          <Text style={styles.schd}>{item.OrdSchNo}</Text>
          <Text style={styles.status}>{item.Schedule_Status}</Text>
          <Text style={styles.customer}>{item.Cust_name}</Text>
          <Text style={styles.deldate}>{item.Delivery_Date}</Text>
          <Text style={styles.remaining}></Text>
          <Text style={styles.remaining}></Text>
          <Text style={styles.remaining}></Text>
          <Text style={styles.remaining}></Text>
          <Text style={styles.remaining}></Text>
          <Text style={styles.remaining}></Text>
          <Text style={styles.remaining}></Text>
          <Text style={styles.remaining}></Text>
          <Text style={styles.remarks}></Text>
      </View>
    ));



    return <Fragment>{rows}</Fragment>;
  };
  
  export default ProductionListTableRow;
  
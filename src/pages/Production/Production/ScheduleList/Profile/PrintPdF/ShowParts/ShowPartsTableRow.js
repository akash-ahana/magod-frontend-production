import React, { Fragment, useState } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";
// import axios from "axios";


const styles = StyleSheet.create({
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom:"1px",
    marginTop:"5px",
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
      width:"10%",
    }
  });
  
  const ShowPartsTableRow = ({partlistdata}) => {
    // console.log(typeof(firstmachineoperator));
    //console.log(newitems , 'New Items from print daily Shift Table Row')
    const rows = partlistdata.map((item) => (
      <View style={styles.Headingrow}>
          <Text style={styles.dwgname}>{item.DwgName}</Text>
          <Text style={styles.Scheduled}>{item.QtyToNest}</Text>
          <Text style={styles.Nested}>{item.QtyNested}</Text>
          <Text style={styles.lot}></Text>
          <Text style={styles.lot}></Text>
          <Text style={styles.lot}></Text>
          <Text style={styles.lot}></Text>
      </View>
    ));



    return <Fragment>{rows}</Fragment>;
  };
  
  export default ShowPartsTableRow;
  
import React, { Fragment } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px"
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
  
  const PrintPriorityTableRow = ({sortedPriorityTable}) => {
    const rows = sortedPriorityTable.map((item,key) => (
      <View style={styles.row}>
        <Text></Text>
        <Text style={styles.srl}>{key+1}</Text>
          <Text style={styles.Program}>{item.NCProgramNo}</Text>
          <Text style={styles.operation}>{item.Operation}</Text>
          <Text style={styles.customer}>{item.Cust_name}</Text>
          <Text style={styles.operation}>{item.EstimatedTime}</Text>
          <Text style={styles.operation}>{item.QtyCut}</Text>
      </View>
    ));
    return <Fragment>{rows}</Fragment>;
  };
  
  export default PrintPriorityTableRow;
  
import React, { Fragment } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px",
      paddingBottom:"1px"
    },
    srl: {
      width: "30px",
    },
    Program: {
      width: "50px",
    },
    operation:{
        width:"110px"
    },
    customer:{
        width:"210px"
    },
    newLoad:{
      marginLeft:"250px",
      marginTop:"10px",
    },
    processed:{
      width:"40px"
    },
    load:{
      width:"40px"
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
          <Text style={styles.processed}>{item.EstimatedTime}</Text>
          <Text style={styles.load}>{item.QtyCut}</Text>
      </View>
    ));
    return <Fragment>{rows}</Fragment>;
  };
  
  export default PrintPriorityTableRow;
  
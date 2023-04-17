import React, { Fragment } from "react"; 
import { Text, View, StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      borderBottom:"1px"
    },
    machine: {
      width: "30%",
    },
    operator: {
      width: "30%",
    },
    remarks:{
        width:"40%"
    }
  });
  
  const PrintPriorityTableRow = ({priorityTable}) => {
    // const rows = priorityTable.map((item) => (
    //   <View style={styles.row}>
    //     {/* <Text style={styles.machine}>{item.Machine}</Text>
    //     <Text style={styles.operator}>{item.Operator}</Text>
    //     <Text style={styles.remarks}>{item.shiftRemarks}</Text> */}
    //   </View>
    // ));
    return <Fragment></Fragment>;
  };
  
  export default PrintPriorityTableRow;
  
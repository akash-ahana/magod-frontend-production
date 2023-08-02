import React from "react";
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import WeeklyShiftTableRow from "./WeeklyShiftTableRow";
import { fontFamily } from "@mui/system";

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
  tableTitle: {
    textDecoration: "underline",
    marginLeft: "200px",
    marginTop: "20px",
    fontFamily: "Helvetica-Bold",
  },
  title2: {
    textDecoration: "underline",
    marginLeft: "220px",
    fontFamily: "Helvetica-Bold",
  },
  shiftperiod: {
    marginLeft: "140px",
    marginTop: "20px",
  },
  boxdata: {
    border: "1px",
    padding: "10px",
    marginTop: "40px",
    width: "550px",
    marginLeft: "50px",
    marginRight: "100px",
  },
  tableview: {
    marginLeft: "60px",
    width: "430px",
  },
  Headingrow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px",
    marginTop: "20px",
    marginLeft: "60px",
    width: "430px",
  },
  machineHeading: {
    width: "30%",
  },
  operatorHeading: {
    width: "30%",
  },
  remarksHeading: {
    width: "40%",
  },
  Manager:{
    marginTop:"40px",
    marginRight:"160px",
    marginLeft:"40px",
    textDecoration:"underline",
    fontFamily: "Helvetica-Bold",
  }
});

const WeeklyShifttable = ({ selectedWeek, newData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Magod Laser Machining Pvt Ltd</Text>
        <Text style={styles.title2}>Production Department</Text>
        <Text style={styles.shiftperiod}>
          Shift Plan for Period From : {selectedWeek[0]} To {selectedWeek[6]}
        </Text>

        {newData.map((mapItem) => {
          return (
            <>
              {mapItem.map((innerMapItem) => {
                return (
                  <>
                    <View style={styles.boxdata}>
                      <Text>Shift &nbsp;&nbsp;&nbsp;{innerMapItem.Shift} </Text>
                      <Text>Shift IC &nbsp;{innerMapItem.ShiftIc}</Text>
                      <Text>Date &nbsp;{innerMapItem.day}</Text>
                    </View>

                    <View style={styles.Headingrow}>
                      <Text style={styles.machineHeading}>Machine</Text>
                      <Text style={styles.operatorHeading}>Operator</Text>
                      <Text style={styles.remarksHeading}>ShiftRemarks</Text>
                    </View>

                    <View style={styles.tableview}>
                      <WeeklyShiftTableRow
                        items={innerMapItem.machineOperators}
                      />
                    </View>
                  </>
                );
              })}
            </>
          );
        })}
        <View>
          <Text style={styles.Manager}>Production Manager</Text>
        </View>

        {/*<TableFooter items={data.items} />*/}
      </View>
    </Page>
  </Document>
);

export default WeeklyShifttable;

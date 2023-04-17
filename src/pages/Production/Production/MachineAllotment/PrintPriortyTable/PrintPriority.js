import React, {Fragment, useEffect, useState} from 'react'; 
import axios from "axios";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import PrintPriorityTable from './PrintPriorityTable';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

//   const MyDoc = () => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text>Section #1</Text>
//         </View>
//         <View style={styles.section}>
//           <Text>Section #2</Text>
//         </View>
//       </Page>
//     </Document>
//   );
  


export default function PrintPriority({priorityTable}) {
  console.log(priorityTable)
    
      //API 
  // const[newData,setNewdata]=useState([]);
  //   const getWeeklyshiftPrint=()=>{
  //     axios.post('http://172.16.20.61:5000/shiftEditor/getFullWeekDetailPlan', 
  //     {
  //       ShiftDate:selectedWeek,
  //     }).then((response) => {
  //         console.log(response.data);
  //         setNewdata(response.data)
  //     })
  //   }
    

    // useEffect(() => {
    //   getWeeklyshiftPrint();
    // }, []);

      return (
        // <div className="App">
        //   <PDFDownloadLink document={<PDFdocument />} fileName="somename.pdf">
        //   {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        // </PDFDownloadLink>
        // </div>
    
        <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintPriorityTable priorityTable={priorityTable}/>
            </PDFViewer>
          </Fragment>
      );
    
}

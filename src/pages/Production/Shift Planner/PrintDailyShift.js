import React, {Fragment} from 'react'; 

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
//import PDFdocument from './PDFdocument';
import { useLocation } from 'react-router-dom';
import PrintDailyShiftTable from './PrintDailyShiftTable';

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
  


export default function PrintDailyShift() {
    const location = useLocation();

    let rowselect=location.state.rowselect.item;
    console.log("to pass",rowselect);

    const data = {
        id: "5df3180a09ea16dc4b95f910",
        items: [
          {
            Machine:"Laser 1",
            Operator: "Suresh A",
            ShiftRemarks : "",
          },
          {
            Machine:"Laser 6",
            Operator: "Deepak",
            ShiftRemarks : ""
          },
          {
            Machine:"Laser 8",
            Operator: "Shreyas K",
            ShiftRemarks : ""
          }
        ],
      };
    
      return (
        // <div className="App">
        //   <PDFDownloadLink document={<PDFdocument />} fileName="somename.pdf">
        //   {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        // </PDFDownloadLink>
        // </div>
    
        <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintDailyShiftTable data={data}
              rowselect={rowselect} 
              />
            </PDFViewer>
          </Fragment>
      );
    
}

import React, {Fragment, useEffect, useState} from 'react'; 

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
//import PDFdocument from './PDFdocument';
import { useLocation } from 'react-router-dom';
import PrintDailyShiftTable from './PrintDailyShiftTable';
import axios from "axios";
import { baseURL } from '../../../../../api/baseUrl';


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
  


export default function PrintDailyShift({rowselect}) {
  // const location = useLocation();
  // let rowselect=location.state.rowselect.item;
    let date=rowselect.item;


  let dateSplit = date.split("/")
  let year = dateSplit[2]
  let month = dateSplit[1]
  let day = dateSplit[0]
  let finalday = day + "-" + month + "-" + year

  // console.log(finalday);


  //First Shift
  const[newData,setNewdata]=useState([]);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month} ${hours}:${minutes}`;
  };
  
  const getDailyMachineoperatorData = () => {
    axios.post(baseURL+'/shiftEditor/getSingleDayDetailShiftInformation', 
    {
      ShiftDate: finalday,
    }).then((response) => {
      const formattedData = response.data.map((item) => ({
        ...item,
        from: formatDate(item.from),
        To: formatDate(item.To),
      }));
      
      console.log(formattedData);
      setNewdata(formattedData);
    });
  }
  
  
    
// //Second Shift
// const[secondmachineoperator,setSecondmachineoperator]=useState([]);
//     const getSecondShiftMachineoperatorData=()=>{
//       axios.post('http://172.16.20.61:5000/shiftEditor/getMachineOperatorsShift', 
//       {
//         ShiftDate:finalday,
//         Shift:"Second",
//         ShiftId : null
//       }).then((response) => {
//           // console.log(response.data);
//           setSecondmachineoperator(response.data)
//       })
//     }
//     console.log('Print Daily Shift Component' , secondmachineoperator);
    
      useEffect(() => {
        getDailyMachineoperatorData();
      }, []);

      const newData1 = [
        { 
          ShiftIc : "Kumar N",
          Shift : "First",
          machineOperators : [
            {
              Machine : "Laser 1",
              Operator : "Operator 1"
            } , 
            {
              Machine : "Laser 2",
              Operator : "Operator 2"
            } , 
            {
              Machine : "Laser 3",
              Operator : "Operator 3"
            } , 
           
          ]
       } , 
       { 
        ShiftIc : "Shashidhara",
        Shift : "Second",
        machineOperators : [
          {
            Machine : "Laser 4",
            Operator : "Operator 4"
          } , 
          {
            Machine : "Laser 5",
            Operator : "Operator 5"
          } , 
          {
            Machine : "Laser 6",
            Operator : "Operator 6"
          } , 
         
        ]
     } , 
     { 
      ShiftIc : "Mahesh Bogan",
      Shift : "Third",
      machineOperators : [
        {
          Machine : "Laser 7",
          Operator : "Operator 7"
        } , 
        {
          Machine : "Laser 8",
          Operator : "Operator 8"
        } , 
        {
          Machine : "Laser 9",
          Operator : "Operator 9"
        } , 
       
      ]
   }  
      ]
    
      // console.log(typeof(data));
      // console.log(typeof(firstmachineoperator))
      return (
        // <div className="App">
        //   <PDFDownloadLink document={<PDFdocument />} fileName="somename.pdf">
        //   {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        // </PDFDownloadLink>
        // </div>
    
        <Fragment>
            <PDFViewer width="1200" height="600" filename="somename.pdf">
              <PrintDailyShiftTable 
                newdata = {newData}
                rowselect={date} 
              />
            </PDFViewer>
          </Fragment>
      ); 
}

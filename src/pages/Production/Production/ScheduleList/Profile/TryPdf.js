// import React from 'react';
// import ReactTOPdf from "react-to-pdf";
// import Modal from 'react-bootstrap/Modal';

// // import './trypdf.html'

// const ref = React.createRef();
// export default function TryPdf(show,setShow) {
//   const handleClose=()=>{
//     setShow(false);
//   }

//   return (
//     <>
//     <Modal show={show} onHide={handleClose} >
//         <Modal.Header closeButton>
//           <Modal.Title>Generate pdf</Modal.Title>
//         </Modal.Header>

//         <Modal.Body> <div className="background_color" >
//         <div ref={ref} > 
//         Hi Im pdf
//         </div>
//         <ReactTOPdf targetRef={ref} >
//           {({ toPdf }) => 
//             <button onClick={toPdf} className="get_started">
//               Download
//             </button>
//           }
//         </ReactTOPdf>
//       </div>
//       </Modal.Body>
//       </Modal>
//     </>
//   )
// }

import { Page, Text, Image, Document, Stylesheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
// body:
//  {
// paddingTop: 35,
// paddingBottom: 65,
// paddingHorizontal: 35,
// },

// title: 
// {
// fontSize: 24,
// textAlign: "center",
// },

// text: 
// {
// margin: 12,
// fontSize: 14,
// textAlign: "justify",
// fontFamily: "Times-Roman"
// },

// header:
//  {
// fontSize: 12,
// marginBottom: 20,
// textAlign: "center",
// color:"grey"
// },
// pageNumber:
//  {
//   position: "absolute",
//   fontSize: 12,
//   bottom: 30,
//   left: 0,
//   right: 0,
//   textAlign: "center",
//   color: "grey",
//   },
//   });

  const TryPdf = () => {
    <Document>
    <Page>
    <Text fixed>PDF</Text>
    <Text >Hi I can Generate Pdf</Text>
    {/* <Text 
     render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}` }
    /> */}
    </Page>
    </Document>;
    };

    export default TryPdf;
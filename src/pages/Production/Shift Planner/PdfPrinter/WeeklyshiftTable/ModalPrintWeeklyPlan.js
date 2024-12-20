import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import PrintWeeklyplan from "./PrintWeeklyplan";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";
import { toast } from "react-toastify";
import { PDFViewer, pdf } from "@react-pdf/renderer";

export default function ModalPrintWeeklyPlan({
  openPrintModal,
  setOpenPrintModal,
  selectedWeek,
  newTry
}) {

  console.log("selectedWeek in Modal is",selectedWeek)

  const [fullscreen, setFullscreen] = useState(true);
  const [pdfShifts, setPdfShifts] = useState([]);
  const [pdfMOData, setPdfMoData] = useState([]);

  // const getWeeklyshiftPrint1 = () => {
  //   axios
  //     .post(baseURL + "/shiftEditor/getFullWeekDetailPlan", {
  //       ShiftDate: selectedWeek,
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setPdfShifts(response.data);
  //     });
  // };

  // const getMachineOperatorTableData = () => {
  //   axios
  //     .post(baseURL + "/shiftEditor/getPdfMachineOperator", {
  //       ShiftDate: selectedWeek,
  //     })
  //     .then((response) => {
  //       // console.log(response.data);
  //       setPdfMoData(response.data);
  //     });
  // };

  //TryPDF

  const savePdfToServer = async () => {
    console.log("Helloo PDF");

    try {
      const adjustment = "ProductionWeeklyPlan"; // Replace with the actual name you want to send

      // Step 1: Call the API to set the adjustment name
      await axios.post(baseURL + `/PDF/set-adjustment-name`, { adjustment });
      const blob = await pdf(
        <PrintWeeklyplan selectedWeek={selectedWeek} pdfShifts={newTry} />
      ).toBlob();

      const file = new File([blob], "GeneratedPDF.pdf", {
        type: "application/pdf",
      });

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(baseURL + `/PDF/save-pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("PDF saved successfully!");
      }
    } catch (error) {
      console.error("Error saving PDF to server:", error);
    }
  };
  

  return (
    <>
      <Modal
        show={openPrintModal}
        fullscreen={fullscreen}
        onHide={() => setOpenPrintModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Print Weekly Plan</Modal.Title>
          <button
            style={{ marginLeft: "72%" }}
            className="button-style group-button"
            onClick={savePdfToServer}
          >
            Save to server
          </button>
        </Modal.Header>
        <Modal.Body>  
          <PrintWeeklyplan selectedWeek={selectedWeek} pdfShifts={newTry} />
        </Modal.Body>
      </Modal>
    </>
  );
}

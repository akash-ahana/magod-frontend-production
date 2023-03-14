import React from 'react';
//import ReactTOPdf from "react-to-pdf";
// import './trypdf.html'

const ref = React.createRef();
const TryPdf = (props) => {
  return (
    <>
      <div className="background_color" >
        <div ref={ref}> 
        </div>
        {/* <ReactTOPdf targetRef={ref} >
          {({ toPdf }) => 
            <button onClick={toPdf} className="get_started">
              Download
            </button>
          }
        </ReactTOPdf> */}
      </div>
    </>
  )
}

export default TryPdf ;
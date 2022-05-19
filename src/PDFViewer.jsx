import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@material-ui/core";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  var [show, setShow] = useState("flex");

  useEffect(() => {
    setPageNumber(1);
    setShow("none");
  }, [file]);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setTimeout(() => {
      setShow("flex");
    }, 50);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  return (
    <div className="pdfHolder" style={{ display: show }}>
      <div>
        {file && (
          <Document id="pdf" file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        )}
        {file && (
          <div>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <Button
              disabled={pageNumber <= 1}
              id={pageNumber <= 1 ? "disabled" : "button"}
              onClick={() => changePage(-1)}
              variant="contained"
              // style={{ display: show }}
            >
              Previous
            </Button>
            <Button
              disabled={pageNumber >= numPages}
              id={pageNumber >= numPages ? "disabled" : "button"}
              onClick={() => changePage(1)}
              variant="contained"
              // style={{ display: show }}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

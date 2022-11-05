import React from "react";
import Barcode from "react-barcode";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";

export default function BarcodeScreen() {
  const { id } = useParams();
  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div ref={printRef}>
        <Barcode value={id} />
      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px",
          background: "#5174bb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        type="button"
        onClick={handleDownloadImage}
      >
        Download as Image
      </button>
    </div>
  );
}

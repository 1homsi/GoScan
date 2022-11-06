import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useNavigate, useParams } from "react-router-dom";

export default function Scan() {
  const { id } = useParams();
  const [data, setData] = React.useState("Not Found");
  const navigation = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <BarcodeScannerComponent
        facingMode="environment"
        width={500}
        height={300}
        onUpdate={(err, result) => {
          if (result) {
            navigation(`/scanned/${id}/${result}`);
          } else setData("Not Found");
        }}
      />
      <p>{data}</p>
    </div>
  );
}

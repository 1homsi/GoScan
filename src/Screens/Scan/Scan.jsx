import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function Scan() {
  const [data, setData] = React.useState("Not Found");

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
        width={100}
        height={100}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>{data}</p>
    </div>
  );
}

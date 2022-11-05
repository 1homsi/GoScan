import React from "react";

export default function IntroPage() {
  return (
    <div
      style={{
        height: "93.5vh",
        backgroundColor: "#414d4e",
        marginTop: "6.5vh",
      }}
    >
      <h2
        style={{
          paddingTop: "10%",
          color: "#fff",
        }}
      >
        <center>Welcome to GoScan</center>
      </h2>
      <p
        style={{
          fontSize: "1rem",
          textAlign: "center",
          color: "#fff",
          paddingTop: "10%",
        }}
      >
        Scan Qr Code to access your specific shop
      </p>
      <p
        style={{
          fontSize: "0.7rem",
          textAlign: "center",
          color: "#fff",
        }}
      >
        Use your phone camera to scan the QR code
      </p>
    </div>
  );
}

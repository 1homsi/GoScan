import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Scanner from "../../Components/Scanner";
import "./scan.css"



var torchon = false;

function Scan() {
  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState(null);

  const onDetected = (result) => {
    setResult(result);
  };

  useEffect(() => {
    setCamera(!camera);
  }, []);

  const setTorch = () => {
    const stream = document.querySelector("video").srcObject;
    const track = stream.getVideoTracks()[0];
    torchon = !torchon;
    track
      .applyConstraints({
        advanced: [{ torch: torchon }]
      })
      .catch((e) => alert(e));
  };

  return (
    <div className="App">
      <div className="container">
        {camera && <Scanner onDetected={onDetected} />}
      </div>
      <button
        className="torch btn btn-warning"
        type="button"
        onClick={setTorch}
      >
        Torch
      </button>
      <div className="ScannedCode"></div>
    </div>
  );
}

export default Scan;

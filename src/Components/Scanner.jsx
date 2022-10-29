import React, { useEffect } from "react";
import config from "./config.json";
import Quagga from "quagga";

const ScannedCode = new Set();

const Scanner = (props) => {
  const { onDetected } = props;

  useEffect(() => {
    Quagga.init(config, (err) => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop();
      };
    });

    //detecting boxes on stream
    Quagga.onProcessed((result) => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      drawingCtx.clearRect(
        0,
        0,
        Number(drawingCanvas.getAttribute("width")),
        Number(drawingCanvas.getAttribute("height"))
      );
      if (result) {
        if (result.boxes) {
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }
        if (result.codeResult && result.codeResult.code) {
          var firstDigit = result.codeResult.code.charAt(0);
          if (
            firstDigit >= "0" &&
            firstDigit <= "9" &&
            !ScannedCode.has(result.codeResult.code)
          ) {
            Quagga.ImageDebug.drawPath(
              result.line,
              { x: "x", y: "y" },
              drawingCtx,
              { color: "red", lineWidth: 3 }
            );
          }
        }
      }
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = (result) => {
    var firstDigit = result.codeResult.code.charAt(0);
    if (
      firstDigit >= "0" &&
      firstDigit <= "9" &&
      !ScannedCode.has(result.codeResult.code)
    ) {
      onDetected(result.codeResult.code);
      alert(`Scanned:${result.codeResult.code}`);
      ScannedCode.add(result.codeResult.code);
    }
  };

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;

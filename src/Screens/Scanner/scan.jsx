import React, { Component } from 'react'
import "./scan.css"
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import ScanbotSDK from 'scanbot-web-sdk/webpack'




class Scan extends Component {
    barcodes = [];

  constructor(props) {
    super(props);

    this.state = {
      lastBarcode: null,
    }
  }

  async componentDidMount() {
    this.sdk = await ScanbotSDK.initialize({
      licenseKey: '',
      engine: "/",
    });

    const config = {
      onBarcodesDetected: this.onBarcodesDetected.bind(this),
      containerId: 'barcode-scanner-view',
      style: {
        window: {
          aspectRatio: 2,
          paddingPropLeft: 0.7,
        },
      },
      barcodeFormat: [
        "AZTEC",
        "CODABAR",
        "CODE_39",
        "CODE_93",
        "CODE_128",
        "DATA_MATRIX",
        "EAN_8",
        "EAN_13",
        "ITF",
        "MAXICODE",
        "PDF_417",
        "QR_CODE",
        "RSS_14",
        "RSS_EXPANDED",
        "UPC_A",
        "UPC_E",
        "UPC_EAN_EXTENSION",
        "MSI_PLESSEY"
      ]
    };

    this.barcodeScanner = await this.sdk.createBarcodeScanner(config);

  }

  componentWillUnmount() {
    this.barcodeScanner.disposebBarcodeScanner();
  }


  render() {
    let barcodeText;
    if (!this.state.lastBarcode) {
      barcodeText = '';
    } else {
      const barcodes = this.state.lastBarcode.barcodes;
      barcodeText = JSON.stringify(
        barcodes.map((barcodes) => barcodes.text + " (" + barcodes.format + ") "));
    }

    return (
      <div
      style={{
        backgroundColor: "pink",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      >
        <div
          id='barcode-scanner-view'
          style={{ height: "70%", width: "100%", justifySelf: "center" }}
            className='Scanner'
            >
        </div>
        the thing is: {barcodeText}
      </div>
    );
  }

  async onBarcodesDetected(result) {
    this.barcodes.push(result);
    this.setState({
      lastBarcode: result
    });
  }
}

export default Scan;
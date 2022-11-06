import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';

function QR() {
const [back, setBack] = useState('#FFFFFF');
const [fore, setFore] = useState('#000000');
const [size, setSize] = useState(256);
const { id } = useParams();
const [value, setValue] = useState('https://goscan.netlify.app/scan/' + id)


return (
	<div className="QR"

    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
    }}
    >
         <button
        onClick={
            () => {
                window.print();
            }
        }
        style={{
            backgroundColor: "#339476",
            color: "white",
            fontWeight: "bold",
            padding: 10,
            borderRadius: 10,
            border: "none",
            outline: "none",
            cursor: "pointer",
            marginBottom: "5%"
        }}
        >
            download
        </button>
	<center>
		{/* <br />
		<br />
		<input
		type="text"
		onChange={(e) => setValue(e.target.value)}
		placeholder="Value of Qr-code"
		/>
		<br />
		<br />
		<input
		type="text"
		onChange={(e) => setBack(e.target.value)}
		placeholder="Background color"
		/>
		<br />
		<br />
		<input
		type="text"
		onChange={(e) => setFore(e.target.value)}
		placeholder="Foreground color"
		/>
		<br />
		<br />
		<input
		type="number"
		onChange={(e) => setSize(parseInt(e.target.value ===
						'' ? 0 : e.target.value, 10))}
		placeholder="Size of Qr-code"
		/>
		<br />
		<br />
		<br /> */}
		{value && (
		<QRCode
			title="Your Qr"
			value={value}
			bgColor={back}
			fgColor={fore}
			size={size === '' ? 0 : size}
		/>
		)}
       
	</center>
	</div>
);
}

export default QR;

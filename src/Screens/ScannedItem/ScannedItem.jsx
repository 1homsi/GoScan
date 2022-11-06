import React from "react";
import "./Item.css";
import { auth, db } from "../../firebase";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function ScannedItem() {
  const { shop, id } = useParams(); 
  const [item, setItem] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchItem();
  });

  const fetchItem = async () => {
    await db
      .collection("Shops")
      .doc(shop)
      .collection("Items")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setItem(doc.data());
          setLoading(false);
        } else {
          setError(true);
        }
      });
  };
  

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


      <button
      style={{
        backgroundColor: "#fff",
        color: "#000",
        padding: 10,
        borderRadius: 10,
        border: "none",
        outline: "none",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(-1);
      }}

      >
        Scan Again
      </button>

      <div className="item">
        <div className="card">
          <img src={item.image} alt={item.title} className="imageItem" />
          <h1>{item.name}</h1>
          <p className="price">{item.price}$</p>
          <p className="price">{item.priceInLBP}lbp</p>
          <p>{item.description}</p>
        </div>
      </div>

    </div>
  );
}

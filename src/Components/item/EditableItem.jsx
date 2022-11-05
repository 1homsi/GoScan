import { Button } from "@mui/material";
import React from "react";
import "./Item.css";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";

export default function EditItem({ item }) {
  let navigate = useNavigate();

  return (
    <div
      className="itemEdit"
      style={{
        margin: 10,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
      }}
    >
      <div>
        <img src={item.image} alt={item.title} className="imageItem" />
        <h1>{item.name}</h1>
        <p className="price">{item.price}$</p>
        <p className="price">{item.priceInLBP}lbp</p>
        <p>{item.description}</p>
      </div>

      <Button
        onClick={() => {
          navigate(`/edit/${item.id}`);
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          navigate(`/barcode/${item.id}`);
        }}
      >
        Generate Barcode
      </Button>
      <Button
        color="error"
        onClick={() => {
          db.collection("Shops")
            .doc(auth.currentUser.uid)
            .collection("Items")
            .doc(item.id)
            .delete()
            .then(() => {
              window.location.reload();
            });
        }}
      >
        Delete
      </Button>
    </div>
  );
}

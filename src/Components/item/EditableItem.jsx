import { Button } from "@mui/material";
import React from "react";
import "./Item.css";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";

export default function EditItem({ item }) {
  let navigate = useNavigate();

  return (
    <div className="item">
      <div>
        <img src={item.image} alt={item.title} width={100} height={100} />
        <div>
          <p>Title: {item.name}</p>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Description: {item.description}</p>
          <p>Category: {item.category}</p>
        </div>
      </div>

      <Button
        onClick={() => {
          navigate(`/edit/${item.id}`);
        }}
      >
        Edit
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

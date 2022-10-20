import React, { useState } from "react";
import { useParams } from "react-router";
import { db, auth } from "../../firebase";
import { TextField, Button } from "@mui/material";
import "../Add/Add.css";

export default function Edit({ navigate }) {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();

  React.useEffect(() => {
    db.collection("Shops")
      .doc(auth.currentUser.uid)
      .collection("Items")
      .doc(id)
      .get()
      .then((doc) => {
        setName(doc.data().name);
        setPrice(doc.data().price);
        setDescription(doc.data().description);
        setQuantity(doc.data().quantity);
      });
  });

  const handleUpdate = () => {
    db.collection("Shops")
      .doc(auth.currentUser.uid)
      .collection("Items")
      .doc(id)
      .update({
        name: name,
        price: price,
        description: description,
        quantity: quantity,
      });
    navigate("/");
  };

  return (
    <div className="AddContainer">
      <h1>Edit</h1>
      <form className="Form">
        <div
          className="Name"
          style={{
            marginTop: "10px",
          }}
        >
          <TextField
            fullWidth
            label="Product Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div
          className="Price"
          style={{
            marginTop: "10px",
          }}
        >
          <TextField
            fullWidth
            label="Price"
            type={"number"}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div
          className="Quantity"
          style={{
            marginTop: "10px",
          }}
        >
          <TextField
            fullWidth
            label="Quantity"
            type={"number"}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>
        <div
          className="Description"
          style={{
            marginTop: "10px",
          }}
        >
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <Button variant="contained" onClick={() => handleUpdate()}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

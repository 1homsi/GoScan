import React from "react";
import "./Item.css";

export default function Item({ item }) {
  return (
    <div className="item">
      <div className="card">
        <img src={item.image} alt={item.title} className="imageItem" />
        <h1>{item.name}</h1>
        <p className="price">{item.price}$</p>
        <p className="price">{item.priceInLBP}lbp</p>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

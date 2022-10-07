import React from "react";
import "./Item.css";
import { Button } from "@mui/material";

export default function Item({ item }) {


  return (
    <div className="item">
      <div>
        <div>
          <p>Name: {item.name}</p>
          <p>Locations: {item.location.join(', ').replace(/, ([^,]*)$/, ' and $1')}</p>
          <p>Message: {item.Message}</p>
          <Button variant="contained" color="primary" onClick={() => alert(" Phone Number is: "+ item.PhoneNumber)}>
            Show Phone Number
          </Button>
        </div>
      </div>
    </div>
  );
}

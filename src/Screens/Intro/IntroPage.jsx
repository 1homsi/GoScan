import React from "react";
import { Button } from "@mui/material";
import { auth } from "../../firebase";

export default class Intro extends React.Component {
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigate("/");
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Inventory System</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.navigate("/register")}
        >
          Register
        </Button>
      </div>
    );
  }
}

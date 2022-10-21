import React from "react";
import { auth, db } from "../../firebase";
import { TextField, Button } from "@mui/material";
import "./Register.css";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigate("/");
      }
    });
  }

  handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((e) => {
        e.user.updateProfile({
          displayName: this.state.name,
        });
        db.collection("Shops").doc(e.user.uid).set({
          name: this.state.name,
          email: this.state.email,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
    this.props.navigate("/");
  };

  render() {
    return (
      <div className="RegisterContainer">
        <h1>Register</h1>
        <form className="Form">
          <div className="Name" style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }} >
            <TextField
              fullWidth
              style={{
                width: window.innerWidth > 600 ? "50%" : "80%",
                justifySelf: "center",
              }}
              label="Full Name"
              value={this.state.name}
              onChange={(event) =>
                this.setState({
                  name: event.target.value,
                })
              }
            />
          </div>
          <div className="Email" style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }} >
            <TextField
              type={"email"}
              fullWidth
              style={{
                width: window.innerWidth > 600 ? "50%" : "80%",
                justifySelf: "center",
              }}
              label="Email"
              value={this.state.email}
              onChange={(event) =>
                this.setState({
                  email: event.target.value,
                })
              }
            />
          </div>
          <div className="Password" 
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          >
            <TextField
              type={"password"}
              fullWidth
              style={{
                width: window.innerWidth > 600 ? "50%" : "80%",
                justifySelf: "center",
              }}
              label="Password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({
                  password: event.target.value,
                })
              }
            />
          </div>
          <div className="ButtonWidth" style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }} >
            <Button
              fullWidth
              style={{
                width: window.innerWidth > 600 ? "30%" : "40%",
                justifySelf: "center",
                backgroundColor: "#f50057",
              }}
              
              variant="contained"
              onClick={() => this.handleRegister()}
            >
              Register
            </Button>
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#2E3B55",
              }}
              onClick={() => this.props.navigate("/")}
            >
              back
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

import React from "react";
import { auth, firebase } from "../../firebase";
import { TextField, Button } from "@mui/material";
import "./Login.css";


export default class Login extends React.Component {
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

  handleLogin = () => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return auth.signInWithEmailAndPassword(
          this.state.email.trim(),
          this.state.password.trim()
        );
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    this.props.navigate("/");
  };

  render() {
    return (
      <div className="Logincontainer">
        <h1>Login</h1>
        <form className="Form">

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
          <div className="Password" style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

          }} >
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
          <div className="ButtonWidth"  style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }} >
            <Button
              fullWidth
              style={{
                width: window.innerWidth > 600 ? "20%" : "40%",
                justifySelf: "center",
                backgroundColor: "#f50057",
              }}
              variant="contained"
              onClick={() => this.handleLogin()}
            >
              Login
            </Button>
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => this.props.navigate("/")}
              style={{
                backgroundColor: "#2E3B55",
              }}
            >
              back
            </Button>
          </div>
          </form>

      </div>
    );
  }
}

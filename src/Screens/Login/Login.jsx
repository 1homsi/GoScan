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
          <div className="Email">
            <TextField
              type={"email"}
              fullWidth
              label="Email"
              value={this.state.email}
              onChange={(event) =>
                this.setState({
                  email: event.target.value,
                })
              }
            />
          </div>
          <div className="Password">
            <TextField
              type={"password"}
              fullWidth
              label="Password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({
                  password: event.target.value,
                })
              }
            />
          </div>
          <div className="ButtonWidth">
            <Button
              fullWidth
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
            >
              back
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

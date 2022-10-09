import React from "react";
import { auth } from "../../firebase";
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
          <div className="Name">
            <TextField
              fullWidth
              label="Full Name"
              value={this.state.name}
              onChange={(event) =>
                this.setState({
                  name: event.target.value,
                })
              }
            />
          </div>
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

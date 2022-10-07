import React from "react";
import { auth, firebase, db } from "../../firebase";
import { TextField, Button } from "@mui/material";
import "./Login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      loading: false,
    };
  }

  handleLogin = () => {
    this.setState({
      loading: true,
    });
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const user = await auth.signInWithEmailAndPassword(
          this.state.email.trim(),
          this.state.password.trim()
        );
        db.collection("Students")
          .doc(user.user.uid)
          .get()
          .then((doc) => {
            if (doc.data().isAdmin) {
              this.props.navigate("/admin");
            } else {
              this.props.navigate("/carowner");
            }
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="main">
          <h2
            style={{
              marginTop: "20%",
            }}
          >
            <center>Loading...</center>
          </h2>
        </div>
      );
    } else {
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
                style={{
                  backgroundColor: "#6e2479",
                  color: "white",
                }}
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
                style={{
                  backgroundColor: "#6e2479",
                  color: "white",
                }}
                s
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
}

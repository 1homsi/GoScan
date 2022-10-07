import React from "react";
import { auth, db } from "../../firebase";
import { TextField, Button, FormControl, NativeSelect } from "@mui/material";
import "./Register.css";
import Locations from "../../Data/Data";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      id: "",
      Message: "",
      error: "",
      region: "",
      location: [],
      PhoneNumber: "",
      loading: false,
      isAdmin: false,
      hold: "",
    };
  }

  holdLocations = [];

  checkIfChecked(option) {
    if (this.holdLocations.includes(option)) {
      this.holdLocations.splice(Locations.indexOf(option), 1);
    } else {
      this.holdLocations.push(option);
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigate("/");
      }
    });
  }

  handleRegister = () => {
    this.setState({
      location: this.holdLocations,
    });
    if (
      this.state.name.trim() === "" ||
      this.state.email.trim() === "" ||
      this.state.password.trim() === "" ||
      this.state.id.trim() === ""
    ) {
      this.setState({
        error: "Please fill all the fields",
      });
    } else {
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((e) => {
          e.user
            .updateProfile({
              displayName: this.state.name,
            })
            .then(() => {
              db.collection("Students")
                .doc(e.user.uid)
                .set(
                  {
                    name: this.state.name,
                    email: this.state.email,
                    RhuId: this.state.id,
                    Message: this.state.Message,
                    region: this.state.region,
                    location: this.state.location,
                    PhoneNumber: this.state.PhoneNumber,
                    isVerified: false,
                    isActive: true,
                    isAdmin: this.state.isAdmin,
                  },
                  { merge: true }
                )
                .then(() => {
                  this.props.navigate("/carowner");
                });
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  returnLocations(option) {
    return (
      <label
        key={option}
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "black",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <input
          type="checkbox"
          name="location"
          value={option}
          style={{
            marginRight: "2px",

            alignSelf: "flex-start",
          }}
          onChange={(event) => {
            this.checkIfChecked(event.target.value);
            console.log(this.Locations);
          }}
        />
        {option} - Mechref
      </label>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
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
        <div className="RegisterContainer">
          <h1>I own a car</h1>
          <FormControl className="Form" fullWidth>
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
            <div className="id">
              <TextField
                fullWidth
                label="Rhu ID"
                value={this.state.id}
                onChange={(event) =>
                  this.setState({
                    id: event.target.value,
                  })
                }
              />
            </div>
            <div className="Message">
              <TextField
                fullWidth
                label="Comment (Optional)"
                value={this.state.Message}
                onChange={(event) =>
                  this.setState({
                    Message: event.target.value,
                  })
                }
              />
            </div>
            <div className="Message">
              <TextField
                fullWidth
                label="Phone Number"
                value={this.state.PhoneNumber}
                onChange={(event) =>
                  this.setState({
                    PhoneNumber: event.target.value,
                  })
                }
              />
            </div>
            <div className="Location">
              <NativeSelect
                label="region"
                onChange={(event) => {
                  this.setState({ region: event.target.value });

                  console.log(event.target.value);
                }}
                style={{ width: "30%", color: "black" }}
              >
                <option value="">Select Region</option>
                <option value="beirut">Beirut</option>
                <option value="saida">Saida</option>
                <option value="chouf">Chouf</option>
                <option value="iqlim">iqlim</option>
                <option value="Aley">Aley</option>
              </NativeSelect>

              <div
                style={{
                  display: "grid",
                  gridGap: "10px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gridAutoRows: "minmax(100px, auto)",
                  marginTop: "10px",
                }}
              >
                {this.state.region === "beirut"
                  ? Locations[0].map((option) => this.returnLocations(option))
                  : this.state.region === "chouf"
                  ? Locations[1].map((option) => this.returnLocations(option))
                  : this.state.region === "saida"
                  ? Locations[2].map((option) => this.returnLocations(option))
                  : this.state.region === "iqlim"
                  ? Locations[3].map((option) => this.returnLocations(option))
                  : this.state.region === "Aley"
                  ? Locations[4].map((option) => this.returnLocations(option))
                  : null}
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <h4>{this.state.error}</h4>
            </div>

            <div className="ButtonWidth">
              <Button
                fullWidth
                style={{
                  backgroundColor: "#6e2479",
                  color: "white",
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
                style={{
                  backgroundColor: "#6e2479",
                  color: "white",
                }}
                variant="contained"
                onClick={() => this.props.navigate("/login")}
              >
                Already have an account?
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
                variant="contained"
                onClick={() => this.props.navigate("/")}
              >
                back
              </Button>
            </div>
          </FormControl>
        </div>
      );
    }
  }
}

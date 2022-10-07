import React from "react";
import { auth, db } from "../../firebase";
import "../../Components/item/Item.css";
import { Button, Input, NativeSelect, Checkbox } from "@mui/material";
import Locations from "../../Data/Data";

export default class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true,
      isActive: false,
      newName: "",
      newLocation: [],
      newPhoneNumber: "",
      newMessage: "",
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    (async () => {
      await db
        .collection("Students")
        .doc(auth.currentUser?.uid)
        .get()
        .then((user) => {
          if (user.exists) {
            if (user.data()?.isAdmin === true) {
              this.props.navigate("/admin");
            } else {
              this.setState({
                user: user.data(),
                isActive: user.data()?.isActive ? true : false,
                newName: user.data()?.name,
                newPhoneNumber: user.data()?.PhoneNumber,
                newMessage: user.data()?.Message,
                newLocation: user.data()?.location,
                loading: false,
              });
              this.holdLocations = user.data()?.location;
              console.log("====================================");
              console.log(this.holdLocations);
              console.log("====================================");
            }
          } else {
            this.props.navigate("/");
          }
        });
    })();
  }

  componentWillUnmount() {
    this.setState({
      loading: true,
      user: {},
    });
  }

  handleDeleteAccount = async () => {
    await db
      .collection("Students")
      .doc(auth.currentUser?.uid)
      .delete()
      .then(() => {
        this.props.navigate("/");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    await auth.currentUser?.delete();
    auth.deleteUser(auth.currentUser?.uid);
  };

  handleEdit = async () => {
    await db
      .collection("Students")
      .doc(auth.currentUser?.uid)
      .update({
        name: this.state.newName,
        location: this.holdLocations,
        PhoneNumber: this.state.newPhoneNumber,
        Message: this.state.newMessage,
      })
      .then(() => {
        this.setState({
          newName: "",
          newLocation: [],
          newPhoneNumber: "",
          newMessage: "",
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    this.props.navigate("/home");
  };

  checkIfChecked(option) {
    if (this.holdLocations.includes(option)) {
      this.holdLocations = this.holdLocations.filter((item) => item !== option);
    } else {
      this.holdLocations.push(option);
    }
    console.log(this.holdLocations);
  }

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
        <Checkbox
          name="location"
          value={option}
          defaultChecked={this.state.newLocation.includes(option)}
          style={{
            marginRight: "2px",
            alignSelf: "flex-start",
          }}
          onChange={(event) => {
            this.checkIfChecked(event.target.value);
          }}
        />
        {option} - Mechref
      </label>
    );
  }

  render() {
    if (this.state.loading) {
      <div
        style={{
          marginTop: "20%",
        }}
      >
        <center>
          <h1>Loading...</h1>
        </center>
      </div>;
    } else {
      return (
        <div
          style={{
            marginTop: "20%",
          }}
        >
          <center>
            <div className="item">
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "80%",
                    margin: "auto",
                  }}
                >
                  <Input
                    type="text"
                    placeholder={this.state.user?.name}
                    onChange={(e) => {
                      this.setState({
                        newName: e.target.value,
                      });
                    }}
                  />

                  <Input
                    type="number"
                    placeholder={this.state.user?.PhoneNumber}
                    onChange={(e) => {
                      this.setState({
                        newPhoneNumber: e.target.value,
                      });
                      console.log(this.state.newPhoneNumber);
                    }}
                  />

                  <Input
                    type="text"
                    placeholder={this.state.user?.Message}
                    onChange={(e) => {
                      this.setState({
                        newMessage: e.target.value,
                      });
                    }}
                  />

                  <p>
                    Locations:{" "}
                    {this.state.user?.location
                      .join(", ")
                      .replace(/, ([^,]*)$/, " and $1")}
                  </p>

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
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(100px, 1fr))",
                      gridAutoRows: "minmax(100px, auto)",
                      marginTop: "10px",
                    }}
                  >
                    {this.state.region === "beirut"
                      ? Locations[0].map((option) =>
                          this.returnLocations(option)
                        )
                      : this.state.region === "chouf"
                      ? Locations[1].map((option) =>
                          this.returnLocations(option)
                        )
                      : this.state.region === "saida"
                      ? Locations[2].map((option) =>
                          this.returnLocations(option)
                        )
                      : this.state.region === "iqlim"
                      ? Locations[3].map((option) =>
                          this.returnLocations(option)
                        )
                      : this.state.region === "Aley"
                      ? Locations[4].map((option) =>
                          this.returnLocations(option)
                        )
                      : null}
                  </div>

                  <Input
                    type="button"
                    value="Update"
                    onClick={this.handleEdit}
                    placeholder="Save Changes"
                  />
                </div>
              </div>
            </div>
            <div>
              {this.state.user?.isVerified ? (
                <Button
                  style={{
                    backgroundColor: "#6e2479",
                    color: "white",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    db.collection("Students")
                      .doc(auth.currentUser?.uid)
                      .update({
                        isActive: !this.state.isActive,
                      });
                    this.setState({
                      isActive: !this.state.isActive,
                    });
                  }}
                >
                  Active: {this.state.isActive ? "online" : "offline"}
                </Button>
              ) : (
                <div>
                  <h3
                    style={{
                      color: "red",
                    }}
                  >
                    Not verified yet please wait
                  </h3>
                </div>
              )}
              <Button
                style={{
                  backgroundColor: "#6e2479",
                  color: "white",
                  marginLeft: "10px",
                }}
                variant="contained"
                color="primary"
                onClick={() => {
                  this.handleDeleteAccount();
                }}
              >
                Delete account
              </Button>
            </div>
          </center>
        </div>
      );
    }
  }
}

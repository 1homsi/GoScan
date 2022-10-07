import { Button } from "@mui/material";
import React from "react";
import { auth, db } from "../../firebase";
import "./Admin.css";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true,
      Items: [],
      number: 0,
    };
  }

  handleDeleteAccount = (id) => {
    db.collection("Students")
      .doc(id)
      .delete()
      .then(() => {
        const newItems = this.state.Items.filter((item) => {
          return item.id !== id;
        });
        this.setState({
          Items: newItems,
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  componentDidMount() {
    db.collection("Students")
      .doc(auth.currentUser?.uid)
      .get()
      .then((doc) => {
        if (doc.data()?.isAdmin === true) {
          this.setState({
            user: doc.data(),
          });
          db.collection("Students")
            .where("isVerified", "==", false)
            .get()
            .then((snap) => {
              this.setState({
                number: snap.size,
              });
              const Items = [];
              snap.forEach((doc) => {
                if (doc.data().isAdmin === false) {
                  const item = Object.assign({ id: doc.id }, doc.data());
                  Items.push(item);
                }
              });
              this.setState({
                Items,
                loading: false,
              });
            });
        } else {
          this.props.navigate("/");
        }
      });
  }

  handleVerify = (id) => {
    db.collection("Students")
      .doc(id)
      .set(
        {
          isVerified: true,
        },
        { merge: true }
      )
      .then(() => {
        const newItems = this.state.Items.filter((item) => {
          return item.id !== id;
        });
        this.setState({
          Items: newItems,
        });
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            marginTop: "10%",
          }}
        >
          <center>
            <h1>Loading...</h1>
          </center>
        </div>
      );
    } else {
      return (
        <div
          style={{
            marginTop: "8%",
          }}
        >
          <center>
            <h5>Number of Students: {this.state.number}</h5>
          </center>
          <div
            style={{
              width: "80vw",
              marginLeft: "10%",
            }}
          >
            {this.state.Items.map((item, index) => {
              return (
                <div className="UserInfo" key={index}>
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>
                    Locations:{" "}
                    {item.location.join(", ").replace(/, ([^,]*)$/, " and $1")}
                  </p>
                  {item.Message && <p>{item.Message}</p>}
                  <p>phone Number: {item.PhoneNumber}</p>
                  <p>ID: {item.RhuId}</p>

                  <Button
                    variant="primary"
                    onClick={() => {
                      this.handleVerify(item.id);
                    }}
                    style={{
                      margin: "10px",
                      background: "#6e2479",
                      color: "white",
                    }}
                  >
                    Approve User
                  </Button>

                  <Button
                    onClick={() => {
                      this.handleDeleteAccount(item.id);
                    }}
                    style={{
                      margin: "10px",
                      background: "red",
                      color: "white",
                    }}
                  >
                    Ban
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

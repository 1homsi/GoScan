
import React from "react";
import "./intro.css";
import { auth, db } from "../../firebase";


export default class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
       auth.onAuthStateChanged(async (user) => {
      if (user) {
        await db
          .collection("Students")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.data().isAdmin) {
              this.props.navigate("/admin");
            } else if (doc.data().isVerified) {
              this.props.navigate("/carowner");
            } else {
              this.props.navigate("/home");
            }
          });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

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
        <div className="container">
          <button
            className="btn"
            onClick={() => {
              this.props.navigate("/register");
            }}
          >
            Register as a car owner
          </button>
          <button
            className="btn"
            onClick={() => {
              this.props.navigate("/home");
            }}
          >
            Looking for a ride
          </button>
        </div>
      );
    }
  }
}

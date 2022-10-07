import { NativeSelect } from "@mui/material";
import React from "react";
import Item from "../../Components/item/Item";
import { db, auth } from "../../firebase";
import "./Home.css";
import { query, collection, where, getDocs } from "firebase/firestore";
import Locations from "../../Data/Data";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: false,
      loading: true,
      items: [],
      filteredItems: [],
      region: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("Students")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.data().isAdmin) {
              this.props.navigate("/admin");
            } else {
              this.props.navigate("/carowner");
            }
          });
      }
    });
    this.fetchData();
  }

  componentWillUnmount() {
    this.setState({
      loading: true,
      items: [],
    });
  }

  fetchData = async () => {
    this.setState({ items: [] });
    const q = query(
      collection(db, "Students"),
      where("isActive", "==", true),
      where("isVerified", "==", true),
      where("isAdmin", "==", false)
    );
    const docSnap = await getDocs(q);
    if (docSnap.empty) {
      this.setState({
        empty: true,
        loading: false,
      });
    } else {
      const Items = [];
      docSnap.forEach((doc) => {
        const item = Object.assign({ id: doc.id }, doc.data());
        Items.push(item);
      });
      this.setState({
        items: Items,
        filteredItems: Items,
        loading: false,
      });
    }
  };

  setFilteredItems = (location) => {
    const filteredItems = this.state.items?.filter((item) =>
      item.location.toString().toLowerCase().includes(location.toLowerCase())
    );
    this.setState({ filteredItems });
  };

  setFilteredItemsRegion = (region) => {
    console.log(region);
    const filteredItems = this.state.items?.filter(
      (item) => item.region === region
    );
    console.log(filteredItems);
    this.setState({ filteredItems });
  };

  allCheckPoints = (region) => {
    let checkPoints = [];
    if (region === "beirut") {
      checkPoints = Locations[0];
    } else if (region === "chouf") {
      checkPoints = Locations[1];
    } else if (region === "saida") {
      checkPoints = Locations[2];
    } else if (region === "iqlim") {
      checkPoints = Locations[3];
    } else if (region === "Aley") {
      checkPoints = Locations[4];
    } else {
      window.location.reload();
    }

    this.setFilteredItems(checkPoints);
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
      if (this.state.empty) {
        return (
          <div className="main">
            <center>
              <h1>No Cars</h1>
            </center>
          </div>
        );
      } else {
        return (
          <div className="main">
            <center>
              <div className="SearchBar">
                <NativeSelect
                  label="region"
                  onChange={(event) => {
                    this.setFilteredItemsRegion(event.target.value);
                    this.setState({ region: event.target.value });
                    this.allCheckPoints(event.target.value);
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

                <NativeSelect
                  label="city"
                  onChange={(event) => {
                    this.setFilteredItems(event.target.value);
                    console.log(event.target.value);
                  }}
                  style={{ width: "40%", marginLeft: "10%" }}
                >
                  <option value="">Select Check Points</option>
                  {this.state.region === "beirut"
                    ? Locations[0].map((option) => (
                        <option key={option} value={option}>
                          {option} - Mechref
                        </option>
                      ))
                    : this.state.region === "chouf"
                    ? Locations[1].map((option) => (
                        <option key={option} value={option}>
                          {option} - Mechref
                        </option>
                      ))
                    : this.state.region === "saida"
                    ? Locations[2].map((option) => (
                        <option key={option} value={option}>
                          {option} - Mechref
                        </option>
                      ))
                    : this.state.region === "iqlim"
                    ? Locations[3].map((option) => (
                        <option key={option} value={option}>
                          {option} - Mechref
                        </option>
                      ))
                    : this.state.region === "Aley"
                    ? Locations[4].map((option) => (
                        <option key={option} value={option}>
                          {option} - Mechref
                        </option>
                      ))
                    : null}
                </NativeSelect>
              </div>
              {this.state.filteredItems.map((item, index) => {
                return (
                  <div key={index}>
                    <Item item={item} />
                  </div>
                );
              })}
            </center>
          </div>
        );
      }
    }
  }
}

import React from "react";
import Item from "../../Components/item/Item";
import { db, auth } from "../../firebase";
import "./Home.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: false,
      loading: true,
      items: [],
      filteredItems: [],
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigate("/");
        this.fetchData();
      } else {
        this.setState({ items: [], loading: true });
      }
    });
  }

  componentWillUnmount() {
    this.setState({
      loading: true,
      items: [],
    });
  }

  fetchData = () => {
    this.setState({ items: [] });
    db.collection("Items")
      .where("user", "==", auth.currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          let item = [];
          this.setState({ empty: false });
          snapshot.forEach((doc) => {
            let data = Object.assign({ id: doc.id }, doc.data());
            item.push(data);
          });
          this.setState({
            items: item,
            filteredItems: item,
          });
        } else {
          this.setState({ empty: true });
        }
        this.setState({ loading: false });
      });
  };

  setFilteredItems = (category) => {
    let filteredItems = this.state.items.filter((item) => {
      return item.category === category;
    });
    this.setState({ filteredItems });
  };

  render() {
    if (auth.currentUser) {
      if (this.state.loading) {
        return (
          <div className="main">
            <h2
              style={{
                marginTop: "10%",
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
                <h1>No Items</h1>
              </center>
            </div>
          );
        } else {
          return (
            <div className="main">
              <center>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                  <button
                    className="button btn btn-outline-dark me-2"
                    onClick={() =>
                      this.setState({
                        filteredItems: this.state.items,
                      })
                    }
                  >
                    All
                  </button>
                  <button
                    className="button btn btn-outline-dark me-2"
                    onClick={() => {
                      this.setFilteredItems("electronics");
                    }}
                  >
                    electronics
                  </button>
                  <button
                    className="button btn btn-outline-dark me-2"
                    onClick={() => {
                      this.setFilteredItems("jewelery");
                    }}
                  >
                    jewelery
                  </button>
                  <button
                    className="button btn btn-outline-dark me-2"
                    onClick={() => {
                      this.setFilteredItems("clothing");
                    }}
                  >
                    clothing
                  </button>
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
}

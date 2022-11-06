import React from "react";
import { db, auth, storage } from "../../firebase";
import { Button, TextField } from "@mui/material";
import "./Add.css";

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      priceInLBP: 0,
      PriceInUSD: 0,
      quantity: 0,
      description: "",
      image: {},
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const { name, priceInLBP, PriceInUSD, quantity, description } = this.state;
    const uploadTask = storage
      .ref(`/images/${this.state.image.name}`)
      .put(this.state.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.warn(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log(downloadURL);
          db.collection("Shops")
            .doc(auth.currentUser.uid)
            .collection("Items")
            .doc()
            .set({
              name: name,
              priceInLBP: priceInLBP,
              price: PriceInUSD,
              quantity: quantity,
              description: description,
              image: downloadURL,
              user: auth.currentUser.uid,
            })
            .then(() => {
              window.location.href = "/";
            });
        });
      }
    );
  }
  render() {
    return (
      <div className="AddContainer">
        <h1>Add Product</h1>
        <form className="Form">
          <div
            className="Name"
            style={{
              marginTop: "10px",
            }}
          >
            <TextField
              required
              fullWidth
              label="Product Name"
              value={this.state.name}
              onChange={(event) =>
                this.setState({
                  name: event.target.value,
                })
              }
            />
          </div>
          <div
            className="Price"
            style={{
              marginTop: "10px",
            }}
          >
            <TextField
              required
              fullWidth
              label="Price in LBP"
              type="number"
              defaultValue={0}
              value={this.state.priceInLBP}
              onChange={(event) => {
                this.setState({
                  priceInLBP: event.target.value,
                });
              }}
            />
          </div>
          <div
            className="Price"
            style={{
              marginTop: "10px",
            }}
          >
            <TextField
              
              fullWidth
              label="Price in USD"
              type="number"
              defaultValue={0}
              value={this.state.PriceInUSD}
              onChange={(event) =>
                this.setState({
                  PriceInUSD: event.target.value,
                })
              }
            />
          </div>

          <div
            className="Quantity"
            style={{
              marginTop: "10px",
            }}
          >
            <TextField
              required
              fullWidth
              label="Quantity"
              type="number"
              value={this.state.quantity}
              onChange={(event) =>
                this.setState({
                  quantity: event.target.value,
                })
              }
            />
          </div>
          <div
            className="Description"
            style={{
              marginTop: "10px",
            }}
          >
            <TextField
              fullWidth
              label="Description"
              value={this.state.description}
              onChange={(event) =>
                this.setState({
                  description: event.target.value,
                })
              }
            />
          </div>
          <div
            className="Category"
            style={{
              marginTop: "10px",
            }}
          >
            {/* <select
              name="category"
              value={this.state.category}
              onChange={(event) => {
                this.setState({
                  category: event.target.value,
                });
              }}
            >
              <option value="">Select Category</option>
              <option value="electronics">electronics</option>
              <option value="jewelery">jewelery</option>
              <option value="clothing">clothing</option>
            </select> */}
          </div>
          <div
            className="Category"
            style={{
              marginTop: "10px",
            }}
          >
            <input
              required
              style={{
                marginTop: "20px",
                padding: "10px",
                background: "#5174bb",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              type={"file"}
              onChange={(event) => {
                this.setState({
                  image: event.target.files[0],
                });
              }}
            />
          </div>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <Button variant="contained" onClick={() => this.handleAdd()}>
              Add
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

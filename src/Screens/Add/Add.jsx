import React from "react";
import { db, auth, storage } from "../../firebase";
import { Button, TextField } from "@mui/material";
import "./Add.css";

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      quantity: 0,
      description: "",
      category: "",
      image: {},
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const { name, price, quantity, description, category } = this.state;
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
          db.collection("Items")
            .doc()
            .set({
              name: name,
              price: price,
              quantity: quantity,
              description: description,
              category: category,
              image: downloadURL,
              user: auth.currentUser.uid,
            })
            .then(() => {
              this.props.navigate("/");
            });
        });
      }
    );
  }
  render() {
    return (
      <div className="AddContainer">
        <h1>Add</h1>
        <form className="Form">
          <div
            className="Name"
            style={{
              marginTop: "10px",
            }}
          >
            <TextField
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
              fullWidth
              label="Price"
              type="number"
              defaultValue={0}
              value={this.state.price}
              onChange={(event) =>
                this.setState({
                  price: event.target.value,
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
            <select
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
            </select>
          </div>
          <div
            className="Category"
            style={{
              marginTop: "10px",
            }}
          >
            <input
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

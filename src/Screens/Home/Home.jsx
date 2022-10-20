import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "../../Components/item/Item";
import { db, auth } from "../../firebase";
import "./Home.css";

export default function Home() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [items, setItems] = React.useState([]);
  const [empty, setEmpty] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [filteredItems, setFilteredItems] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  });

  const fetchData = () => {
    setItems([]);
    db.collection("Shops")
      .doc(id)
      .collection("Items")
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          let item = [];
          setEmpty(false);
          snapshot.forEach((doc) => {
            let data = Object.assign({ id: doc.id }, doc.data());
            item.push(data);
          });
          setItems(item);
          setFilteredItems(item);
        } else {
          setEmpty(true);
        }
        setLoading(false);
      });
  };

  // const EditFilteredItems = (category) => {
  //   let filteredItems = items.filter((item) => {
  //     return item.category === category;
  //   });
  //   setFilteredItems(filteredItems);
  // };

  return (
    // <div className="main">
    //   <center>
    //     <h1>No Items</h1>
    //   </center>
    // </div>

    <div className="main">
      <center>
        {/* <div className="buttons d-flex justify-content-center mb-5 pb-5">
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
        </div> */}
        {filteredItems.map((item, index) => {
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

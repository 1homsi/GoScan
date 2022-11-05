import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "../../Components/item/Item";
import { db } from "../../firebase";
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

  const fetchData = async () => {
    setItems([]);
    await db
      .collection("Shops")
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

  return (
    <div className="main">
      <center>
        <button
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#5174bb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigation(`/scan/${id}`);
          }}
        >
          Scan Barcode
        </button>
        <div>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              let value = e.target.value.toLowerCase();
              let result = [];
              result = items.filter((data) => {
                return data.name.toLowerCase().search(value) !== -1;
              });
              setFilteredItems(result);
            }}
          />
        </div>
        <div className="items">
          {filteredItems.map((item, index) => {
            return (
              <div key={index}>
                <Item item={item} />
              </div>
            );
          })}
        </div>
      </center>
    </div>
  );
}

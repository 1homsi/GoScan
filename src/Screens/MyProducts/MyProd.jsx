import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import "./MyProd.css";
import EditItem from "../../Components/item/EditableItem";

export default function MyProd() {
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
        <div>
          <h1>My Products</h1>

          <input
            style={{
              width: "80%",
              height: 40,
              borderRadius: 10,
              border: "none",
              outline: "none",
              padding: 10,
              fontSize: 20,
              marginBottom: 20,
            }}
            type="text"
            placeholder="Search..."
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
        <br />
        <button
        onClick={
          () => {
            navigation(`/qr/${id}`); 
          }
        }
        >
          My QR code
        </button>
        <br />
        <div className="items">
          {filteredItems.map((item, index) => {
            return (
              <div key={index}>
                <EditItem item={item} />
              </div>
            );
          })}
        </div>
      </center>
    </div>
  );
}

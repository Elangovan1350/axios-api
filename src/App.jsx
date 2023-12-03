import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortPrice, setSortPrice] = useState(false);
  const [fillterList, setFillterList] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setFillterList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("error", err);
        setLoading(false);
      });
  }, []);
  console.log("a");

  const handleSort = () => {
    const sortProduct = [...(fillterList.length ? fillterList : products)].sort(
      (a, b) => {
        if (sortPrice) {
          return a.price - b.price;
        }
        return b.price - a.price;
      }
    );
    setFillterList(sortProduct);
    setSortPrice(!sortPrice);
  };
  const handleInput = (e) => {
    const searchText = e.target.value.toLowerCase();

    setFillterList(
      products.filter((e) => e.title.toLowerCase().includes(searchText))
    );
  };

  return (
    <div className="pl-1 text-lg">
      <label htmlFor="">
        {" "}
        Search
        <input
          type="text"
          className="outline outline-2 my-2 ml-2 p-1"
          onChange={handleInput}
        />
      </label>
      <p>
        Found product <span className="text-xl">{fillterList.length}</span>{" "}
      </p>
      <button
        onClick={handleSort}
        className="border-4 px-3 py-1  border-gray-700"
      >
        sorting the price {sortPrice ? "high👆" : "low👇"}
      </button>
      {loading ? (
        <div>loading...</div>
      ) : (
        fillterList.map((product) => {
          return (
            <div key={product.id}>
              <h1>{product.title}</h1>
              <img src={product.image} alt="" className="h-40" />
              <p>${product.price}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

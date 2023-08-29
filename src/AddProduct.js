import React, { useState, useEffect } from "react";
import Header from "./header";

const AddProduct = ({ onAddProduct }) => {
  const [stockProducts, setStockProducts] = useState([]);

  // Fetch stock product data from your backend API
  useEffect(() => {
    // fetch("http://localhost/api/products")
    fetch("https://testing-am67.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setStockProducts(data))
      .catch((error) => console.error("Error fetching stock products:", error));
  }, []);

  return (
    <body>
      <Header />
      {/* Display stock products */}
      <div className="stock-product-list">
        {stockProducts.map((stockProduct) => (
          <div key={stockProduct._id} className="stock-product">
            <p>{stockProduct.name}</p>
            <button onClick={() => onAddProduct(stockProduct)}>Add</button>
          </div>
        ))}
      </div>
    </body>
  );
};

export default AddProduct;

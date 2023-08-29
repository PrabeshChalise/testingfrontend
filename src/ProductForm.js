import React, { useState } from "react";
import Header from "./header";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    quantity: "",
    pricePerPieceCP: "",
    image: null,
    totalCP: "",
    totalSP: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "pricePerPieceCP") {
      const cpValue = parseFloat(value);
      const spValue = cpValue + cpValue * 0.05;
      setProductData((prevData) => ({
        ...prevData,
        pricePerPieceCP: value,
        pricePerPieceSP: spValue.toFixed(2),
        totalCP: (cpValue * parseInt(prevData.quantity)).toFixed(2),
        totalSP: (spValue * parseInt(prevData.quantity)).toFixed(2),
      }));
    } else {
      const spValue =
        parseFloat(productData.pricePerPieceCP) +
        parseFloat(productData.pricePerPieceCP) * 0.05;
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
        pricePerPieceSP: spValue.toFixed(2),
        totalCP: (
          parseFloat(prevData.pricePerPieceCP) * parseInt(value)
        ).toFixed(2),
        totalSP: (spValue * parseInt(value)).toFixed(2),
      }));
    }
  };

  const handleImageChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const generateQuantityOptions = () => {
    const options = [];
    for (let i = 1; i <= 100; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", productData.image);
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("quantity", productData.quantity);
    formData.append("pricePerPieceCP", productData.pricePerPieceCP);
    formData.append("pricePerPieceSP", productData.pricePerPieceSP);
    formData.append("totalCP", productData.totalCP);
    formData.append("totalSP", productData.totalSP);

    try {
      const response = await fetch(
        "https://testing-am67.onrender.com/api/products",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Product posted successfully");
        setProductData({
          name: "",
          category: "",
          quantity: "",
          pricePerPieceCP: "",
          pricePerPieceSP: "",
          image: null,
          totalCP: "",
          totalSP: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Product post error:", errorData.message);
      }
    } catch (error) {
      console.error("Error posting product:", error);
    }
  };

  return (
    <body>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <Header />

      <form onSubmit={handleSubmit} className="form">
        <div className="name-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Enter name of product"
          />
        </div>
        <div className="category-form">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
        </div>
        <div className="quantity-form">
          <label htmlFor="quantity">Quantity</label>
          <select
            id="quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
          >
            {generateQuantityOptions()}
          </select>
        </div>
        <div className="price-form">
          <label htmlFor="pricePerPieceCP">Cost Price per piece</label>
          <input
            type="text"
            id="pricePerPieceCP"
            name="pricePerPieceCP"
            value={productData.pricePerPieceCP}
            onChange={handleInputChange}
            placeholder="Enter cost price per piece CP"
          />
        </div>
        <div className="price-form">
          <label htmlFor="pricePerPieceSP">Selling Price per piece</label>
          <input
            type="text"
            id="pricePerPieceSP"
            name="pricePerPieceSP"
            value={productData.pricePerPieceSP}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="total-form">
          <label htmlFor="totalCP">Total Cost Price (total CP)</label>
          <input
            type="text"
            id="totalCP"
            name="totalCP"
            value={productData.totalCP}
            disabled
          />
        </div>
        <div className="total-form">
          <label htmlFor="totalSP">Total Selling Price (total SP)</label>
          <input
            type="text"
            id="totalSP"
            name="totalSP"
            value={productData.totalSP}
            disabled
          />
        </div>
        <div className="upload-form">
          <label htmlFor="imageUpload">Upload Image:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </body>
  );
};

export default ProductForm;

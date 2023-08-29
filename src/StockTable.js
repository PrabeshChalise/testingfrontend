import React, { useState, useEffect } from "react";
import Header from "./header";
import Modal from "react-modal";

const StockTable = () => {
  const [products, setProducts] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    category: "",
    pricePerPieceCP: 0,
    pricePerPieceSP: 0,
    quantity: 0,
    totalCP: 0,
    totalSP: 0,
  });
  const [updatedName, setUpdatedName] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState(0);

  useEffect(() => {
    // Fetch product data from your backend API
    fetch("https://testing-am67.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the updatedProduct state object based on the input name
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Recalculate the updated price per piece SP, total CP, and total SP
    if (name === "pricePerPieceCP" || name === "quantity") {
      const newPricePerPieceCP = parseFloat(value);
      const newPricePerPieceSP = newPricePerPieceCP + newPricePerPieceCP * 0.05;
      const newTotalCP = (newPricePerPieceCP * updatedQuantity).toFixed(2);
      const newTotalSP = (newPricePerPieceSP * updatedQuantity).toFixed(2);

      setUpdatedProduct((prevState) => ({
        ...prevState,
        pricePerPieceSP: newPricePerPieceSP,
        totalCP: newTotalCP,
        totalSP: newTotalSP,
      }));
    }
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(
  //       `http://localhost/api/products/${selectedProduct._id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: updatedName,
  //           category: updatedCategory,
  //           pricePerPieceCP: parseFloat(updatedProduct.pricePerPieceCP),
  //           pricePerPieceSP: parseFloat(updatedProduct.pricePerPieceSP),
  //           quantity: parseInt(updatedQuantity), // Make sure to parse as integer
  //           image: updatedImage,
  //           totalPriceCP: parseFloat(updatedProduct.totalCP), // Use 'totalPriceCP' here
  //           totalPriceSP: parseFloat(updatedProduct.totalSP), // Use 'totalPriceSP' here
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       // Update the local products list with the updated product
  //       setProducts((prevProducts) =>
  //         prevProducts.map((product) =>
  //           product._id === selectedProduct._id
  //             ? {
  //                 ...product,
  //                 name: updatedName,
  //                 category: updatedCategory,
  //                 pricePerPieceCP: parseFloat(updatedProduct.pricePerPieceCP),
  //                 pricePerPieceSP: parseFloat(updatedProduct.pricePerPieceSP),
  //                 quantity: parseInt(updatedQuantity),
  //                 image: updatedImage,
  //                 totalPriceCP: parseFloat(updatedProduct.totalCP),
  //                 totalPriceSP: parseFloat(updatedProduct.totalSP),
  //               }
  //             : product
  //         )
  //       );
  //       console.log("Product updated successfully");
  //     } else {
  //       console.error("Error updating product");
  //     }
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   } finally {
  //     closeUpdateModal();
  //   }
  // };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updatedName);
    formData.append("category", updatedCategory);
    formData.append("quantity", updatedQuantity);
    formData.append("pricePerPieceCP", updatedProduct.pricePerPieceCP);
    formData.append("pricePerPieceSP", updatedProduct.pricePerPieceSP);
    formData.append("totalCP", updatedProduct.totalCP);
    formData.append("totalSP", updatedProduct.totalSP);

    try {
      const response = await fetch(
        `http://localhost/api/products/${selectedProduct._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        // Update the local products list with the updated product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedProduct._id
              ? {
                  ...product,
                  name: updatedName,
                  category: updatedCategory,
                  pricePerPieceCP: parseFloat(updatedProduct.pricePerPieceCP),
                  pricePerPieceSP: parseFloat(updatedProduct.pricePerPieceSP),
                  quantity: parseInt(updatedQuantity),

                  totalCP: parseFloat(updatedProduct.totalCP),
                  totalSP: parseFloat(updatedProduct.totalSP),
                }
              : product
          )
        );
        console.log("Product updated successfully");
      } else {
        console.error("Error updating product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      closeUpdateModal();
    }
  };

  const totalQuantity = products.reduce(
    (total, product) => total + parseInt(product.quantity, 10),
    0
  );

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({
      name: product.name,
      category: product.category,
      pricePerPieceCP: product.pricePerPieceCP,
      pricePerPieceSP:
        parseFloat(product.pricePerPieceCP) +
        parseFloat(product.pricePerPieceCP) * 0.05,
      quantity: product.quantity,
      image: product.image,
      totalCP: (
        parseFloat(product.pricePerPieceCP) * parseInt(product.quantity)
      ).toFixed(2),
      totalSP: (
        (parseFloat(product.pricePerPieceCP) +
          parseFloat(product.pricePerPieceCP) * 0.05) *
        parseInt(product.quantity)
      ).toFixed(2),
    });
    setUpdatedName(product.name);
    setUpdatedCategory(product.category);
    setUpdatedQuantity(product.quantity);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
    setIsUpdateModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost/api/products/${selectedProduct._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setProducts(
          products.filter((product) => product._id !== selectedProduct._id)
        );
      } else {
        console.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <body>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <Header />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details"
      >
        {selectedProduct && (
          <div>
            <h2>Product Details</h2>
            <p>Name: {selectedProduct.name}</p>
            <p>Category: {selectedProduct.category}</p>
            <p>Quantity: {selectedProduct.quantity}</p>
            <p>Price per piece CP: ${selectedProduct.pricePerPieceCP}</p>
            <p>Price per piece SP: ${selectedProduct.pricePerPieceSP}</p>
            <p>Total price CP: ${selectedProduct.totalPriceCP}</p>
            <p>Total price SP: ${selectedProduct.totalPriceSP}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isModalOpen || isDeleteModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        {selectedProduct && (
          <div>
            {isDeleteModalOpen ? (
              <div>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete {selectedProduct.name}?</p>
                <button onClick={confirmDelete}>Delete</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>Product Details</h2>
                <p>Name: {selectedProduct.name}</p>
                <p>Category: {selectedProduct.category}</p>
                <p>Quantity: {selectedProduct.quantity}</p>
                <p>Price per piece CP: ${selectedProduct.pricePerPieceCP}</p>
                <p>Total price CP: ${selectedProduct.totalPriceCP}</p>
                <p>Price per piece SP: ${selectedProduct.pricePerPieceSP}</p>
                <p>Total price SP: ${selectedProduct.totalPriceSP}</p>
                <button onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeUpdateModal}
        contentLabel="Update Product"
      >
        {selectedProduct && (
          <div>
            <h2>Update Product</h2>
            <form onSubmit={handleUpdate}>
              <label>Name:</label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <label>Category:</label>
              <input
                type="text"
                value={updatedCategory}
                onChange={(e) => setUpdatedCategory(e.target.value)}
              />
              <label>Quantity:</label>
              <input
                type="number"
                value={updatedQuantity}
                onChange={(e) => setUpdatedQuantity(e.target.value)}
              />

              <label>Price per piece CP:</label>
              <input
                type="number"
                value={updatedProduct.pricePerPieceCP}
                onChange={handleInputChange}
                name="pricePerPieceCP"
              />
              <label>Price per piece SP:</label>
              <input
                type="number"
                value={updatedProduct.pricePerPieceSP}
                onChange={handleInputChange}
                name="pricePerPieceSP"
                step="0.01"
              />

              <label>Total price CP:</label>
              <input type="number" value={updatedProduct.totalCP} disabled />
              <label>Total price SP:</label>
              <input
                type="number"
                value={(
                  parseFloat(updatedProduct.pricePerPieceSP) *
                  parseInt(updatedQuantity)
                ).toFixed(2)}
                disabled
              />
              <button type="submit">Update</button>
              <button onClick={closeUpdateModal}>Cancel</button>
            </form>
          </div>
        )}
      </Modal>

      <div className="user-header">
        <h1>Total products in stock: {totalQuantity}</h1>
      </div>
      <div className="user-hero-section">
        <div className="buttonss">
          <a href="viewSales.html">
            <button className="button-next">
              View sales
              <i className="fa-solid fa-shop" style={{ color: "#aaa" }}></i>
            </button>
          </a>
          <a href="/add-stock">
            <button className="button-next">
              Add product{" "}
              <i className="fa-solid fa-plus" style={{ color: "#aaa" }}></i>
            </button>
          </a>
          <button className="button-next1">
            View profit
            <i className="fa-solid fa-money-bill" style={{ color: "#aaa" }}></i>
          </button>
          <button className="button-next1">
            View pending products
            <i className="fa-solid fa-list-check" style={{ color: "#aaa" }}></i>
          </button>
          <button className="button-next1">
            View delivered products
            <i
              className="fa-solid fa-van-shuttle"
              style={{ color: "#aaa" }}
            ></i>
          </button>
        </div>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price per piece CP</th>
              <th>Total price CP</th>
              <th>Price per piece SP</th>
              <th>Total price SP</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`http://localhost/uploads/${product.image}`}
                    alt={product.name}
                    style={{ maxWidth: "100px" }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>${product.pricePerPieceCP}</td>
                <td>${product.totalPriceCP}</td>
                <td>${product.pricePerPieceSP}</td>
                <td>${product.totalPriceSP}</td>
                <td className="operations">
                  <button onClick={() => openModal(product)}>
                    View{" "}
                    <i
                      className="fa-regular fa-eye"
                      style={{ color: "#aaa" }}
                    ></i>
                  </button>
                  <button onClick={() => openDeleteModal(product)}>
                    Delete{" "}
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#aaa" }}
                    ></i>
                  </button>
                  <button onClick={() => openUpdateModal(product)}>
                    Update{" "}
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ color: "#aaa" }}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </body>
  );
};

export default StockTable;

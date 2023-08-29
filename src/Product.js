import React from "react";
import Header from "./header";

const Product = () => {
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
      <div className="product-cont">
        <div className="container-product">
          <i className="fa-solid fa-shop fa-3x" style={{ color: "#aaa" }}></i>
          <p>Total Products: 6</p>
        </div>
        <div className="container-product">
          <i className="fa-solid fa-shop fa-3x" style={{ color: "#aaa" }}></i>
          <p>Total Products in stock: 6</p>
        </div>
      </div>
      <div className="user-hero-section">
        <div className="buttonss">
          <a href="viewSales.html">
            <button className="button-next">
              View sales
              <i className="fa-solid fa-shop" style={{ color: "#aaa" }}></i>
            </button>
          </a>
          <button className="button-next1">
            Add product{" "}
            <i className="fa-solid fa-plus" style={{ color: "#aaa" }}></i>
          </button>
          <a href="/view-stock">
            <button className="button-next1">
              View products in stock
              <i className="fa-regular fa-eye" style={{ color: "#aaa" }}></i>
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
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price per piece</th>
            <th>Total price</th>
            <th>Operation</th>
          </tr>
          <tr>
            <td>Image goes here</td>
            <td>Iphone 13</td>
            <td>Mobile</td>
            <td>2</td>
            <td>$200</td>
            <td>$400</td>
            <td>
              <button>
                View{" "}
                <i className="fa-regular fa-eye" style={{ color: "#aaa" }}></i>
              </button>
              <button>
                Delete{" "}
                <i className="fa-solid fa-trash" style={{ color: "#aaa" }}></i>
              </button>
              <button>
                Update
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ color: "#aaa" }}
                ></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>image goes here</td>
            <td>Iphone 13</td>
            <td>Mobile</td>
            <td>2</td>
            <td>$200</td>
            <td>$400</td>
            <td>
              <button>
                View{" "}
                <i className="fa-regular fa-eye" style={{ color: "#aaa" }}></i>
              </button>
              <button>
                Delete{" "}
                <i className="fa-solid fa-trash" style={{ color: "#aaa" }}></i>
              </button>
              <button>
                Update
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ color: "#aaa" }}
                ></i>
              </button>
            </td>
          </tr>
          <tr>
            <td>image goes here</td>
            <td>Iphone 13</td>
            <td>Mobile</td>
            <td>2</td>
            <td>$200</td>
            <td>$400</td>
            <td>
              <button>
                View{" "}
                <i className="fa-regular fa-eye" style={{ color: "#aaa" }}></i>
              </button>
              <button>
                Delete{" "}
                <i className="fa-solid fa-trash" style={{ color: "#aaa" }}></i>
              </button>
              <button>
                Update
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ color: "#aaa" }}
                ></i>
              </button>
            </td>
          </tr>
        </table>
      </div>
    </body>
  );
};

export default Product;

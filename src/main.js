import React from "react";
import Header from "./header";
import "./App.css";
const Main = () => {
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
      <div className="hero-section-main-js">
        {" "}
        {/* Use className instead of class */}
        <div className="container first">
          {" "}
          {/* Use className instead of class */}
          <i className="fa-solid fa-user fa-3x" style={{ color: "#aaa" }}></i>
          <p>Total Users: 20</p>
        </div>
        <div className="container">
          {" "}
          {/* Use className instead of class */}
          <i className="fa-solid fa-shop fa-3x" style={{ color: "#aaa" }}></i>
          <p>Total products: 100</p>
        </div>
        <div className="container">
          {" "}
          {/* Use className instead of class */}
          <i
            className="fa-solid fa-money-bill fa-3x"
            style={{ color: "#aaa" }}
          ></i>
          <p>Total income: 900</p>
        </div>
        <div className="container">
          {" "}
          {/* Use className instead of class */}
          <i
            className="fa-solid fa-cart-shopping fa-3x"
            style={{ color: "#aaa" }}
          ></i>
          <p>Total sales: 5</p>
        </div>
        <div className="container">
          {" "}
          {/* Use className instead of class */}
          <i className="fa-solid fa-person fa-3x" style={{ color: "#aaa" }}></i>
          <p>Total workers: 3</p>
        </div>
      </div>
    </body>
  );
};

export default Main;

import React from "react";
import Header from "./header";

const Setting = () => {
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
      <div className="hero-section-setting">
        <button>
          Add new admin{" "}
          <i className="fa-solid fa-plus" style={{ color: "#aaa" }}></i>
        </button>
        <button>
          Delete account{" "}
          <i className="fa-solid fa-trash" style={{ color: "#aaa" }}></i>
        </button>
        <button>
          Update account
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "#aaa" }}
          ></i>
        </button>
      </div>
    </body>
  );
};

export default Setting;

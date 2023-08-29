import React from "react";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar1">
          {" "}
          {/* Use "className" instead of "class" for CSS classes */}
          <h1 className="logo1">SeroFero</h1>{" "}
          {/* Use "className" instead of "class" for CSS classes */}
          <div className="ahref">
            <a href="https://serofero.netlify.app/">Home</a>
            <a href="https://serofero.netlify.app/user">Users</a>
            <a href="https://serofero.netlify.app/product">Products</a>
            <a href="https://serofero.netlify.app/worker">Workers</a>
            <a href="https://serofero.netlify.app/setting">Settings</a>
          </div>
          <input
            type="text"
            name="search"
            id="search1"
            placeholder="search here"
          />
          <button>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#121212" }}
            ></i>{" "}
            {/* Use "className" and double curly braces for inline styles */}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
